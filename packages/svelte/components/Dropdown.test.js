import assert from "node:assert";
import { describe, it } from "node:test";
import { render } from "../test-render.js";

describe("Dropdown", () => {
	it("wraps the button and popover in their own element", async () => {
		const { body } = await render("./components/Dropdown.svelte", {
			id: "menu",
			label: "Menu",
		});
		assert.match(
			body.trim(),
			/^<div><button[^>]*popovertarget="menu"[^>]*>Menu<\/button>\s*<div id="menu"[^>]*class="ds-dropdown"[^>]*><\/div><\/div>$/,
		);
	});
});
