import assert from "node:assert";
import { describe, it } from "node:test";
import { render } from "../render.testutil.js";

describe("form", () => {
	const path = "./elements/form.svelte";
	it("prefixes a bare action name as a named SvelteKit action", async () => {
		const { body } = await render(path, { action: "login" });
		assert.match(body, /action="\?\/login"/);
	});
	for (const action of ["?/login", "/login", "https://example.org/login"]) {
		it(`keeps ${action} unchanged`, async () => {
			const { body } = await render(path, { action });
			assert.ok(body.includes(`action="${action}"`), body);
		});
	}
	it("posts without browser validation by default", async () => {
		const { body } = await render(path);
		assert.match(body, /<form method="POST" novalidate/);
	});
});

describe("Form", () => {
	it("upgrades to ds-form-submit and preloads it", async () => {
		const { body, head } = await render("./components/Form.svelte", {
			action: "save",
		});
		assert.match(body, /<form [^>]*is="ds-form-submit"/);
		assert.match(body, /action="\?\/save"/);
		assert.match(
			head,
			/<link rel="modulepreload" href="[^"]*ds-form-submit\.js"/,
		);
	});
});

describe("FormErrors", () => {
	const path = "./components/FormErrors.svelte";
	it("renders nothing without errors", async () => {
		const { body } = await render(path);
		assert.strictEqual(body.trim(), "");
	});
	it("links each error to its field", async () => {
		const { body } = await render(path, {
			errors: [
				{ id: "email", message: "Enter an email" },
				{ message: "Try again later" },
			],
		});
		assert.match(body, /role="alert"/);
		assert.match(body, /<h2>There's a problem<\/h2>/);
		assert.match(body, /<a href="#email">Enter an email<\/a>/);
		assert.match(body, /<li>\s*Try again later\s*<\/li>/);
	});
	it("escapes error messages", async () => {
		const { body } = await render(path, {
			errors: [{ id: "a", message: "<b>x</b>" }],
		});
		assert.match(body, /&lt;b>x&lt;\/b>/);
	});
});
