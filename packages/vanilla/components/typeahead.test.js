import assert from "node:assert/strict";
import { test } from "node:test";
import { open, vanilla } from "../test-browser.js";

const setup = async () => {
	const page = await open(`<input id="q" aria-label="q">`, {
		headers: {
			"content-security-policy": "require-trusted-types-for 'script'",
		},
	});
	await page.evaluate(async (url) => {
		delete Element.prototype.setHTML;
		const { createCombobox } = await import(url);
		window.combobox = createCombobox({
			input: document.getElementById("q"),
			id: "q",
			onQuery: () => {},
			onConfirm: () => {},
		});
	}, `${vanilla}/components/typeahead.js`);
	return page;
};

const options = (page) =>
	page.$$eval('[role="option"]', (nodes) =>
		nodes.map((node) => ({
			id: node.id,
			text: node.textContent,
			selected: node.getAttribute("aria-selected"),
			disabled: node.getAttribute("aria-disabled"),
		})),
	);

test("options render under Trusted Types without setHTML", async () => {
	const page = await setup();
	await page.evaluate(() =>
		combobox.render([{ label: "<b>One</b>" }, { label: "Two" }]),
	);
	assert.deepEqual(page.errors, []);
	assert.deepEqual(await options(page), [
		{
			id: "q-listbox-0",
			text: "<b>One</b>",
			selected: "false",
			disabled: null,
		},
		{ id: "q-listbox-1", text: "Two", selected: "false", disabled: null },
	]);
	assert.equal(
		await page.$$eval("[role=option] b", (nodes) => nodes.length),
		0,
	);
});

test("the empty state renders under Trusted Types without setHTML", async () => {
	const page = await setup();
	await page.evaluate(() => combobox.render([]));
	assert.deepEqual(page.errors, []);
	assert.deepEqual(await options(page), [
		{ id: "", text: "No results found.", selected: null, disabled: "true" },
	]);
});
