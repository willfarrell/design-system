import assert from "node:assert/strict";
import { test } from "node:test";
import { load, open } from "../test-browser.js";

const setup = async () => {
	const page = await open(
		`<input id="file" type="file" is="ds-input-file"><p id="outside">text</p>`,
	);
	await load(page, "components/ds-input-file.js");
	await page.evaluate(() => {
		window.changes = 0;
		document.getElementById("file").addEventListener("change", () => {
			window.changes += 1;
		});
		window.transfer = (...names) => {
			const data = new DataTransfer();
			for (const name of names) data.items.add(new File(["x"], name));
			return data;
		};
		window.paste = (target, data) =>
			target.dispatchEvent(
				new ClipboardEvent("paste", { clipboardData: data, bubbles: true }),
			);
		window.names = () =>
			[...document.getElementById("file").files].map((file) => file.name);
	});
	return page;
};

test("click then cancel keeps the previous selection without throwing", async () => {
	const page = await setup();
	await page.evaluate(() => {
		document.getElementById("file").files = transfer("a.txt").files;
	});
	await page.evaluate(() => document.getElementById("file").click());
	assert.deepEqual(page.errors, []);
	assert.deepEqual(await page.evaluate(() => names()), ["a.txt"]);
});

test("drop assigns the dropped files", async () => {
	const page = await setup();
	await page.evaluate(() => {
		document
			.getElementById("file")
			.dispatchEvent(
				new DragEvent("drop", { dataTransfer: transfer("b.txt") }),
			);
	});
	assert.deepEqual(page.errors, []);
	assert.deepEqual(await page.evaluate(() => names()), ["b.txt"]);
	assert.equal(await page.evaluate(() => changes), 1);
});

test("paste on the input assigns the pasted files", async () => {
	const page = await setup();
	await page.evaluate(() => {
		paste(document.getElementById("file"), transfer("c.txt"));
	});
	assert.deepEqual(await page.evaluate(() => names()), ["c.txt"]);
	assert.equal(await page.evaluate(() => changes), 1);
});

test("paste elsewhere in the document leaves the files alone", async () => {
	const page = await setup();
	await page.evaluate(() => {
		document.getElementById("file").files = transfer("keep.txt").files;
		paste(document.getElementById("outside"), transfer("other.txt"));
	});
	assert.deepEqual(await page.evaluate(() => names()), ["keep.txt"]);
	assert.equal(await page.evaluate(() => changes), 0);
});

test("pasting plain text keeps the selected files", async () => {
	const page = await setup();
	await page.evaluate(() => {
		document.getElementById("file").files = transfer("keep.txt").files;
		const data = new DataTransfer();
		data.setData("text/plain", "hello");
		paste(document.getElementById("file"), data);
	});
	assert.deepEqual(await page.evaluate(() => names()), ["keep.txt"]);
	assert.equal(await page.evaluate(() => changes), 0);
});

test("removing the input detaches its listeners without throwing", async () => {
	const page = await setup();
	await page.evaluate(() => {
		const input = document.getElementById("file");
		input.remove();
		input.dispatchEvent(
			new DragEvent("drop", { dataTransfer: transfer("late.txt") }),
		);
	});
	assert.deepEqual(page.errors, []);
	assert.equal(await page.evaluate(() => changes), 0);
});

test("cancelling the picker restores the previous selection", async () => {
	const page = await setup();
	await page.evaluate(() => {
		const input = document.getElementById("file");
		input.files = transfer("keep.txt").files;
		input.dispatchEvent(new MouseEvent("click"));
		input.dispatchEvent(new Event("cancel"));
	});
	assert.deepEqual(await page.evaluate(() => names()), ["keep.txt"]);
});

test("drop change bubbles to the form", async () => {
	const page = await setup();
	const bubbled = await page.evaluate(() => {
		let count = 0;
		document.addEventListener("change", () => {
			count += 1;
		});
		document.getElementById("file").dispatchEvent(
			new DragEvent("drop", {
				dataTransfer: transfer("d.txt"),
				cancelable: true,
			}),
		);
		return count;
	});
	assert.equal(bubbled, 1);
});
