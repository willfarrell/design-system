import assert from "node:assert";
import { describe, it } from "node:test";
import { render } from "../render.testutil.js";

describe("svg", () => {
	it("keeps SVG presentation attributes", async () => {
		const { body } = await render("./elements/svg.svelte", {
			viewBox: "0 0 24 24",
			width: "24",
			height: "24",
			fill: "currentColor",
			xmlns: "http://www.w3.org/2000/svg",
		});
		assert.match(body, /viewBox="0 0 24 24"/);
		assert.match(body, /width="24"/);
		assert.match(body, /height="24"/);
		assert.match(body, /fill="currentColor"/);
		assert.match(body, /xmlns="http:\/\/www.w3.org\/2000\/svg"/);
	});
});

describe("Icon", () => {
	const path = "./components/Icon.svelte";
	it("is decorative without alt", async () => {
		const { body } = await render(path, { src: "/icons.svg#a" });
		assert.match(body, /aria-hidden="true"/);
		assert.doesNotMatch(body, /role="img"/);
	});
	it("is decorative with an empty alt", async () => {
		const { body } = await render(path, { src: "/icons.svg#a", alt: "" });
		assert.match(body, /aria-hidden="true"/);
	});
	it("names the image with alt", async () => {
		const { body } = await render(path, { src: "/icons.svg#a", alt: "Search" });
		assert.match(body, /role="img"/);
		assert.match(body, /aria-label="Search"/);
		assert.doesNotMatch(body, /aria-hidden/);
	});
});
