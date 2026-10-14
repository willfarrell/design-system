import assert from "node:assert";
import { describe, it } from "node:test";
import { render } from "../render.testutil.js";

const path = "./components/FieldHgroupSnippet.test.svelte";

const between = (html, tag) =>
	html.match(new RegExp(`<${tag}[^>]*>([\\s\\S]*?)</${tag}>`))[1];

describe("FieldHgroupSnippet", () => {
	it("renders only phrasing content inside a label", async () => {
		const { body } = await render(path, { prefix: "Step 1" });
		const label = between(body, "label");
		assert.doesNotMatch(label, /<(hgroup|h\d|p|div)\b/);
		assert.match(label, /Step 1/);
		assert.match(label, /Email/);
	});

	it("renders a heading group inside a legend", async () => {
		const { body } = await render(path, { prefix: "Step 2" });
		const legend = between(body, "legend");
		assert.match(
			legend,
			/<hgroup><p aria-roledescription="subtitle">Step 2<\/p>\s*<h1>Radios<\/h1><\/hgroup>/,
		);
	});
});
