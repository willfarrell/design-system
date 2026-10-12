import assert from "node:assert";
import { describe, it } from "node:test";
import { render } from "../test-render.js";

const path = "./components/InputBrowserUpToDate.svelte";

describe("InputBrowserUpToDate", () => {
	it("renders only the hidden input without a matching error", async () => {
		const { body } = await render(path, {
			legend: "Browser",
			error: [{ id: "other", message: "Nope" }],
		});
		assert.doesNotMatch(body, /<fieldset/);
		assert.match(body, /<input[^>]* is="ds-input-browser-up-to-date"/);
	});

	it("renders legend, hint and error when out of date", async () => {
		const { body } = await render(path, {
			legend: "Browser",
			hint: "Update it",
			error: [{ id: "browser-up-to-date", message: "Out of date" }],
		});
		assert.match(body, /<fieldset[^>]* aria-invalid="true"/);
		assert.match(body, /<legend[^>]*>\s*Browser/);
		assert.match(body, /id="browser-up-to-date-hint"[^>]*>Update it/);
		assert.match(body, /id="browser-up-to-date-error"[^>]*>\s*Out of date/);
	});

	it("links to each browser update page by name without icons", async () => {
		const { body } = await render(path, {
			legend: "Browser",
			error: [{ id: "browser-up-to-date", message: "Out of date" }],
		});
		for (const name of ["Chrome", "Edge", "Firefox", "Safari"]) {
			assert.match(
				body,
				new RegExp(
					`<a href="https://[^"]*"[^>]*>${name}(<span[^>]*>[^<]*</span>)?</a>`,
				),
			);
		}
		assert.doesNotMatch(body, /icons\.browser\.svg|<svg|<img/);
	});
});
