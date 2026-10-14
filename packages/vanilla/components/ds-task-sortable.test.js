import assert from "node:assert/strict";
import { test } from "node:test";
import { load, open } from "../browser.testutil.js";

const setup = async () => {
	const page = await open(`
		<div is="ds-task-sortable">
			<label for="sort">Sort by</label>
			<select id="sort">
				<option value="name">Name</option>
				<option value="-name">Name, Z to A</option>
				<option value="size">Size</option>
				<option value="-size">Size, largest first</option>
			</select>
			<ul>
				<li data-sort-name="beta" data-sort-size="10">beta</li>
				<li data-sort-name="Alpha" data-sort-size="9">Alpha</li>
				<li data-sort-name="gamma" data-sort-size="100">gamma</li>
				<li data-sort-name="delta">delta</li>
			</ul>
		</div>`);
	await load(page, "components/ds-task-sortable.js");
	return page;
};

const order = (page) => page.locator("li").allTextContents();

test("choosing a sort reorders the tasks", async () => {
	const page = await setup();
	await page.selectOption("select", "name");
	assert.deepEqual(await order(page), ["Alpha", "beta", "delta", "gamma"]);
	await page.selectOption("select", "-name");
	assert.deepEqual(await order(page), ["gamma", "delta", "beta", "Alpha"]);
});

test("numbers sort numerically and missing values sort first", async () => {
	const page = await setup();
	await page.selectOption("select", "size");
	assert.deepEqual(await order(page), ["delta", "Alpha", "beta", "gamma"]);
	await page.selectOption("select", "-size");
	assert.deepEqual(await order(page), ["gamma", "beta", "Alpha", "delta"]);
});

test("after removal the select no longer sorts", async () => {
	const page = await setup();
	await page.evaluate(() => {
		const host = document.querySelector("[is=ds-task-sortable]");
		host.remove();
		document.body.append(
			host.querySelector("select"),
			host.querySelector("ul"),
		);
	});
	await page.selectOption("select", "name");
	assert.deepEqual(await order(page), ["beta", "Alpha", "gamma", "delta"]);
});
