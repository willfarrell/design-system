import assert from "node:assert";
import { describe, it } from "node:test";
import { render } from "../render.testutil.js";

const path = "./components/Codeblock.svelte";

describe("Codeblock", () => {
	it("escapes code and upgrades to the highlight and actions components", async () => {
		const { body, head } = await render(path, {
			language: "html",
			code: "<p>x</p>",
		});
		assert.match(body, /<pre is="ds-codeblock-actions"/);
		assert.match(
			body,
			/<code is="ds-codeblock-highlight" data-lang="html">&lt;p>x&lt;\/p><\/code>/,
		);
		assert.match(head, /ds-codeblock-actions\.js/);
		assert.match(head, /ds-copy\.js/);
	});
	it("omits actions when disabled", async () => {
		const { body, head } = await render(path, { code: "x", actions: false });
		assert.match(body, /^<pre><code is="ds-codeblock-highlight"/);
		assert.doesNotMatch(head, /ds-codeblock-actions\.js|ds-copy\.js/);
	});
});
