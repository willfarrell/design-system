import assert from "node:assert/strict";
import { test } from "node:test";
import { load, open } from "../browser.testutil.js";

const setup = async (html) => {
	const page = await open(html);
	await load(page, "components/ds-table-sortable.js");
	return page;
};

const column = (page, index) =>
	page.$$eval(
		"tbody tr",
		(rows, i) => rows.map((row) => row.cells[i].textContent.trim()),
		index,
	);

const sorts = (page) =>
	page.$$eval("thead th", (cells) =>
		cells.map((cell) => cell.getAttribute("aria-sort")),
	);

const table = `<table is="ds-table-sortable">
	<thead><tr><th>Name</th><th>Size</th><th>Date</th></tr></thead>
	<tbody>
		<tr><td>b</td><td><data value="1234">1,234</data></td><td><time datetime="2024-02-01">Feb</time></td></tr>
		<tr><td>A</td><td><data value="9">9</data></td><td><time datetime="2023-12-01">Dec</time></td></tr>
		<tr><td>c</td><td><data value="10">10</data></td><td><time datetime="2024-01-01">Jan</time></td></tr>
	</tbody>
</table>`;

test("headers become buttons that sort ascending then descending", async () => {
	const page = await setup(table);
	const name = page.getByRole("button", { name: "Name" });
	await name.click();
	assert.deepEqual(await column(page, 0), ["A", "b", "c"]);
	assert.deepEqual(await sorts(page), ["ascending", null, null]);
	await name.click();
	assert.deepEqual(await column(page, 0), ["c", "b", "A"]);
	assert.deepEqual(await sorts(page), ["descending", null, null]);
});

test("only the last sorted header carries aria-sort", async () => {
	const page = await setup(table);
	await page.getByRole("button", { name: "Name" }).click();
	await page.getByRole("button", { name: "Size" }).click();
	assert.deepEqual(await sorts(page), [null, "ascending", null]);
});

test("machine values sort numbers and dates, not their formatted text", async () => {
	const page = await setup(table);
	await page.getByRole("button", { name: "Size" }).click();
	assert.deepEqual(await column(page, 1), ["9", "10", "1,234"]);
	await page.getByRole("button", { name: "Date" }).click();
	assert.deepEqual(await column(page, 2), ["Dec", "Jan", "Feb"]);
});

test("a header after a colspan sorts its own column", async () => {
	const page = await setup(`<table is="ds-table-sortable">
		<thead><tr><th colspan="2">Name</th><th>Age</th></tr></thead>
		<tbody>
			<tr><td>Ada</td><td>L</td><td>3</td></tr>
			<tr><td>Bob</td><td>M</td><td>1</td></tr>
			<tr><td>Cy</td><td>N</td><td>2</td></tr>
		</tbody>
	</table>`);
	await page.getByRole("button", { name: "Age" }).click();
	assert.deepEqual(await column(page, 2), ["1", "2", "3"]);
});

test("removing the table restores the header text", async () => {
	const page = await setup(table);
	const headers = await page.evaluate(() => {
		const el = document.querySelector("table");
		el.remove();
		return [...el.querySelectorAll("th")].map((th) => th.innerHTML);
	});
	assert.deepEqual(headers, ["Name", "Size", "Date"]);
});
