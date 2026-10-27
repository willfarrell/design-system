import assert from "node:assert/strict";
import { test } from "node:test";
import { load, open } from "../browser.testutil.js";

const setup = async (attributes = "", selected = "") => {
	const page = await open(`
		<form>
			<label for="country">Country</label>
			<p id="country-hint">Where you live</p>
			<select is="ds-select-typeahead" id="country" name="country" ${attributes}>
				<option value=""></option>
				<option value="ca" ${selected === "ca" ? "selected" : ""}>Canada</option>
				<option value="de" data-alt="Deutschland">Germany</option>
				<option value="fr">France</option>
			</select>
		</form>`);
	await load(page, "components/ds-select-typeahead.js");
	return page;
};

const input = (page) => page.getByRole("combobox", { name: "Country" });

test("the labelled text input replaces the select for assistive tech", async () => {
	const page = await setup();
	assert.equal(await input(page).count(), 1);
	assert.equal(
		await page.$eval("select", (el) =>
			[el.id, el.getAttribute("aria-hidden"), el.tabIndex].join(),
		),
		"country-select,true,-1",
	);
});

test("typing filters by label and alternative name, choosing sets the select", async () => {
	const page = await setup();
	await input(page).fill("deutsch");
	assert.deepEqual(await page.getByRole("option").allTextContents(), [
		"Germany",
	]);
	await page.keyboard.press("ArrowDown");
	await page.keyboard.press("Enter");
	assert.equal(await page.$eval("select", (el) => el.value), "de");
	assert.equal(await input(page).inputValue(), "Germany");
});

test("a preselected option shows its label", async () => {
	const page = await setup("", "ca");
	assert.equal(await input(page).inputValue(), "Canada");
});

test("escape restores the selected label", async () => {
	const page = await setup("", "ca");
	await input(page).fill("fr");
	await page.keyboard.press("Escape");
	assert.equal(await input(page).inputValue(), "Canada");
	assert.equal(await page.$eval("select", (el) => el.value), "ca");
});

test("no matches shows the no results message", async () => {
	const page = await setup('data-i18n-no-results="Nothing"');
	await input(page).fill("zzz");
	assert.deepEqual(await page.getByRole("option").allTextContents(), [
		"Nothing",
	]);
});

test("field semantics move from the hidden select to the input", async () => {
	const page = await setup(
		'aria-describedby="country-hint" aria-invalid="true" required autocomplete="country"',
	);
	const field = input(page);
	assert.equal(await field.getAttribute("aria-describedby"), "country-hint");
	assert.equal(await field.getAttribute("aria-invalid"), "true");
	assert.equal(await field.getAttribute("required"), "");
	assert.equal(await field.getAttribute("autocomplete"), "country");
	const select = await page.$eval("select", (el) =>
		["aria-describedby", "aria-invalid", "required", "autocomplete"].map(
			(name) => el.getAttribute(name),
		),
	);
	assert.deepEqual(select, [null, null, null, null]);
});

test("a disabled select disables the input", async () => {
	const page = await setup("disabled");
	assert.equal(await input(page).isDisabled(), true);
});

test("an exact label typed or autofilled is kept when leaving the field", async () => {
	const page = await setup('autocomplete="country"');
	await input(page).fill("france");
	await page.keyboard.press("Tab");
	assert.equal(await page.$eval("select", (el) => el.value), "fr");
	assert.equal(await input(page).inputValue(), "France");
});

const submittable = async (attributes, text) => {
	const page = await setup(attributes);
	await page.$eval("form", (form) => {
		form.action = "/next";
	});
	await input(page).fill(text);
	const validity = await input(page).evaluate((el) => ({
		valid: el.checkValidity(),
		message: el.validationMessage,
	}));
	await input(page).press("Enter");
	await page.waitForTimeout(200);
	return { url: new URL(page.url()), validity };
};

test("text matching no option blocks a required typeahead from submitting", async () => {
	const { url, validity } = await submittable("required", "zzz");
	assert.equal(url.pathname, "/");
	assert.deepEqual(validity, {
		valid: false,
		message: "Choose an option from the list.",
	});
});

test("the invalid message is translatable", async () => {
	const { validity } = await submittable(
		'required data-i18n-invalid="Choisissez une option"',
		"zzz",
	);
	assert.equal(validity.message, "Choisissez une option");
});

test("an exact label submits its option", async () => {
	const { url, validity } = await submittable("required", "france");
	assert.equal(url.pathname, "/next");
	assert.equal(url.searchParams.get("country"), "fr");
	assert.equal(validity.valid, true);
});

test("an empty optional typeahead is valid", async () => {
	const page = await setup();
	await input(page).fill("zzz");
	await input(page).fill("");
	assert.equal(await input(page).evaluate((el) => el.checkValidity()), true);
});

const setupGroups = async () => {
	const page = await open(`
		<label for="city">City</label>
		<select is="ds-select-typeahead" id="city" name="city">
			<option value=""></option>
			<option value="any">Anywhere</option>
			<optgroup label="Canada">
				<option value="yyc">Calgary</option>
				<option value="yvr">Vancouver</option>
			</optgroup>
			<optgroup label="France">
				<option value="cdg">Paris</option>
			</optgroup>
		</select>`);
	await load(page, "components/ds-select-typeahead.js");
	return page;
};

const city = (page) => page.getByRole("combobox", { name: "City" });

const groupOptions = (page, name) =>
	page.getByRole("group", { name }).getByRole("option").allTextContents();

test("optgroups render as labelled groups of options", async () => {
	const page = await setupGroups();
	await city(page).click();
	assert.deepEqual(await page.getByRole("option").allTextContents(), [
		"Anywhere",
		"Calgary",
		"Vancouver",
		"Paris",
	]);
	assert.deepEqual(await groupOptions(page, "Canada"), [
		"Calgary",
		"Vancouver",
	]);
	assert.deepEqual(await groupOptions(page, "France"), ["Paris"]);
});

test("filtering hides groups without matching options", async () => {
	const page = await setupGroups();
	await city(page).fill("pa");
	assert.equal(await page.getByRole("group").count(), 1);
	assert.deepEqual(await groupOptions(page, "France"), ["Paris"]);
});

test("arrow keys move across groups and choosing sets the select", async () => {
	const page = await setupGroups();
	await city(page).click();
	for (let i = 0; i < 4; i++) await page.keyboard.press("ArrowDown");
	await page.keyboard.press("Enter");
	assert.equal(await page.$eval("select", (el) => el.value), "cdg");
	assert.equal(await city(page).inputValue(), "Paris");
});

test("clicking a group label does not choose an option", async () => {
	const page = await setupGroups();
	await city(page).click();
	await page.getByText("Canada", { exact: true }).click();
	assert.equal(await page.$eval("select", (el) => el.value), "");
	assert.equal(await city(page).getAttribute("aria-expanded"), "true");
});

test("choosing an option after partial text clears the invalid state", async () => {
	const page = await setup("required");
	await input(page).fill("deutsch");
	await page.keyboard.press("ArrowDown");
	await page.keyboard.press("Enter");
	assert.equal(await input(page).evaluate((el) => el.checkValidity()), true);
});
