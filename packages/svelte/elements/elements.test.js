import assert from "node:assert";
import { describe, it } from "node:test";
import { render } from "../render.testutil.js";

describe("video", () => {
	it("does not autoplay by default", async () => {
		const { body } = await render("./elements/video.svelte");
		assert.doesNotMatch(body, /autoplay/);
	});
});

describe("audio", () => {
	it("does not autoplay by default", async () => {
		const { body } = await render("./elements/audio.svelte");
		assert.doesNotMatch(body, /autoplay/);
	});
});

describe("a", () => {
	const path = "./elements/a.svelte";
	it("drops javascript: hrefs", async () => {
		const { body } = await render(path, { href: " Java\tScript:alert(1)" });
		assert.doesNotMatch(body, /href/);
	});
	it("drops data: hrefs", async () => {
		const { body } = await render(path, { href: "data:text/html,x" });
		assert.doesNotMatch(body, /href/);
	});
	for (const href of [
		"/path",
		"page?a=b:c",
		"#section",
		"http://example.org",
		"https://example.org",
		"mailto:a@example.org",
		"tel:+15555550100",
	]) {
		it(`keeps ${href}`, async () => {
			const { body } = await render(path, { href });
			assert.ok(body.includes(`href="${href}"`), body);
		});
	}
});

describe("area", () => {
	it("drops javascript: hrefs", async () => {
		const { body } = await render("./elements/area.svelte", {
			href: "javascript:alert(1)",
			alt: "x",
		});
		assert.doesNotMatch(body, /href/);
	});
});

describe("iframe", () => {
	const path = "./elements/iframe.svelte";
	it("does not default to an empty title", async () => {
		const { body } = await render(path, { src: "/demo" });
		assert.doesNotMatch(body, /title=/);
	});
	it("renders the given title", async () => {
		const { body } = await render(path, { src: "/demo", title: "Demo" });
		assert.match(body, /title="Demo"/);
	});
	it("sandboxes by default", async () => {
		const { body } = await render(path, { src: "/demo", title: "Demo" });
		assert.match(body, /sandbox=""/);
	});
	it("lets consumers override sandbox", async () => {
		const { body } = await render(path, {
			src: "/demo",
			title: "Demo",
			sandbox: "allow-scripts",
		});
		assert.match(body, /sandbox="allow-scripts"/);
	});
});
