import assert from "node:assert/strict";
import { test } from "node:test";
import { open, vanilla } from "../browser.testutil.js";

const png = Buffer.from(
	"iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+M9QDwADhgGAWjR9awAAAABJRU5ErkJggg==",
	"base64",
);

const setup = () =>
	open(
		`<link rel="stylesheet" href="${vanilla}/all.css">
		<img id="loaded" src="/pixel.png" alt="A purple pixel" width="40" height="40">
		<img id="broken" src="/missing.png" alt="A red fox asleep in the snow">`,
		{ files: { "/pixel.png": { body: png, contentType: "image/png" } } },
	);

const style = (page, id) =>
	page.evaluate(async (id) => {
		const img = document.getElementById(id);
		await img.decode().catch(() => {});
		const { fontStyle, padding, backgroundColor, borderStyle } =
			getComputedStyle(img);
		const { width, height } = img.getBoundingClientRect();
		return { fontStyle, padding, backgroundColor, borderStyle, width, height };
	}, id);

test("alt text of an image that fails to load is italic", async () => {
	const page = await setup();
	assert.equal((await style(page, "broken")).fontStyle, "italic");
});

test("a loaded image keeps its size and gains no box decoration", async () => {
	const page = await setup();
	const { width, height, padding, backgroundColor, borderStyle } = await style(
		page,
		"loaded",
	);
	assert.deepEqual(
		{ width, height, padding, backgroundColor, borderStyle },
		{
			width: 40,
			height: 40,
			padding: "0px",
			backgroundColor: "rgba(0, 0, 0, 0)",
			borderStyle: "none",
		},
	);
});
