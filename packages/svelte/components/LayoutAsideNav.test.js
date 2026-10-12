import assert from "node:assert";
import { describe, it } from "node:test";
import { render } from "../test-render.js";

const path = "./components/LayoutAsideNav.svelte";
const key = "<script>alert(1)</script>";

describe("LayoutAsideNav", () => {
	it("escapes group, link and summary keys", async () => {
		const { body } = await render(path, {
			nav: { [key]: true, [`${key}link`]: "/a", [`${key}group`]: { B: "/b" } },
		});
		assert.doesNotMatch(body, /<script>/);
		assert.strictEqual(
			body.match(/&lt;script>alert\(1\)&lt;\/script>/g).length,
			3,
		);
	});
});
