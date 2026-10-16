import assert from "node:assert";
import { describe, it } from "node:test";
import { createRawSnippet } from "svelte";
import { render } from "../render.testutil.js";

const markup = "<img src=x onerror=alert(1)>";

describe("FieldHint", () => {
	const path = "./components/FieldHint.svelte";
	it("renders the hint as text", async () => {
		const { body } = await render(path, { id: "a", hint: markup });
		assert.match(body, /<span id="a-hint">&lt;img src=x onerror=alert\(1\)>/);
	});
});

describe("FieldLabel", () => {
	const path = "./components/FieldLabel.svelte";
	it("renders the label as text", async () => {
		const { body } = await render(path, { id: "a", label: markup });
		assert.match(body, /<label for="a">\s*&lt;img src=x onerror=alert\(1\)>/);
	});
	it("renders rich content through the children snippet", async () => {
		const children = createRawSnippet((label) => ({
			render: () => `<strong>${label()}</strong>`,
		}));
		const { body } = await render(path, { id: "a", label: "Name", children });
		assert.match(body, /<label for="a">\s*<strong>Name<\/strong>/);
	});
});

describe("FieldLegend", () => {
	const path = "./components/FieldLegend.svelte";
	it("renders the legend as text", async () => {
		const { body } = await render(path, { legend: markup });
		assert.match(body, /<legend>\s*&lt;img src=x onerror=alert\(1\)>/);
	});
});
