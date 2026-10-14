import assert from "node:assert";
import { describe, it } from "node:test";
import { render } from "../../../../../../../packages/svelte/render.testutil.js";

describe("layout/form page", () => {
	it("keeps headings out of labels", async () => {
		const { body } = await render(
			new URL("./+page.svelte", import.meta.url).href,
		);
		const labels = [...body.matchAll(/<label[^>]*>([\s\S]*?)<\/label>/g)];
		assert.ok(labels.length);
		for (const [, content] of labels) {
			assert.doesNotMatch(content, /<(h\d|hgroup|p|div)\b/);
		}
		assert.match(body, /<h1[^>]*>\s*<label for="textarea"[^>]*>/);
	});
});
