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

const placeholder = async (attributes, options) => {
	const page = await open(
		`<link rel="stylesheet" href="${vanilla}/all.css">
		<img id="lqip" src="/missing.png" alt="" width="60" height="40" ${attributes}>`,
		options,
	);
	return page.evaluate(() => {
		const { backgroundImage, backgroundColor } = getComputedStyle(
			document.getElementById("lqip"),
		);
		return { backgroundImage, backgroundColor };
	});
};

test("a data-lqip value paints a blurred placeholder behind the image", async () => {
	const { backgroundImage } = await placeholder('data-lqip="174755"');
	assert.match(backgroundImage, /radial-gradient/);
});

test("an image without data-lqip has no placeholder", async () => {
	const { backgroundImage, backgroundColor } = await placeholder("");
	assert.deepEqual(
		{ backgroundImage, backgroundColor },
		{ backgroundImage: "none", backgroundColor: "rgba(0, 0, 0, 0)" },
	);
});

test("the low 8 bits of data-lqip decode to the oklab base colour", async () => {
	const { backgroundColor } = await placeholder('data-lqip="-524288"');
	assert.equal(backgroundColor, "oklab(0.2 -0.35 -0.2625)");
});

test("each 2-bit cell decodes to a lightness of the base colour", async () => {
	const { backgroundImage } = await placeholder('data-lqip="286976"');
	const lightness = [...backgroundImage.matchAll(/oklab\(([\d.]+) /g)].map(
		([, l]) => Number(l),
	);
	assert.deepEqual(lightness, [0.8, 0.2, 0.4, 0.6, 0.2, 0.4]);
});

test("forced colours drop the placeholder", async () => {
	const { backgroundImage } = await placeholder('data-lqip="174755"', {
		media: { forcedColors: "active" },
	});
	assert.equal(backgroundImage, "none");
});
