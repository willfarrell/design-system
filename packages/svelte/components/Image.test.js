import assert from "node:assert";
import { describe, it } from "node:test";
import { render } from "../render.testutil.js";

describe("img", () => {
	const path = "./elements/img.svelte";
	it("does not default alt so a missing alt stays detectable", async () => {
		const { body } = await render(path, { src: "/a.png" });
		assert.doesNotMatch(body, /alt=/);
	});
	it("keeps an explicit empty alt for decorative images", async () => {
		const { body } = await render(path, { src: "/a.png", alt: "" });
		assert.match(body, /alt=""/);
	});
	it("does not default width and height", async () => {
		const { body } = await render(path, { src: "/a.png", alt: "" });
		assert.doesNotMatch(body, /width=|height=/);
	});
});

describe("Image", () => {
	const path = "./components/Image.svelte";
	it("renders an svg src as a bare img", async () => {
		const { body } = await render(path, { src: "/logo.svg", alt: "Logo" });
		assert.match(body, /^<img [^>]*src="\/logo.svg"/);
		assert.doesNotMatch(body, /<picture/);
		assert.match(body, /alt="Logo"/);
	});
	it("wraps a raster src in picture", async () => {
		const { body } = await render(path, {
			src: "/a.png",
			alt: "A",
			width: "320",
			height: "180",
		});
		assert.match(
			body,
			/<picture>\s*<img [^>]*src="\/a.png"[^>]*>\s*<\/picture>/,
		);
		assert.match(body, /alt="A"/);
		assert.match(body, /width="320"/);
	});
	it("does not default alt", async () => {
		const { body } = await render(path, { src: "/a.png" });
		assert.doesNotMatch(body, /alt=/);
	});
});
