import assert from "node:assert";
import { describe, it } from "node:test";
import { render } from "../test-render.js";

const cases = [
	["InputFetchTypeahead", "ds-fetch-typeahead", { id: "q", label: "Q" }],
	["InputFile", "ds-input-file", { id: "f", label: "F" }],
	["InputSelectTypeahead", "ds-select-typeahead", { id: "s", label: "S" }],
	["InputJavaScriptEnabled", "ds-input-javascript-enabled", {}],
];

describe("web component preload", () => {
	for (const [component, is, props] of cases) {
		it(`${component} upgrades to ${is} and preloads it`, async () => {
			const { body, head } = await render(
				`./components/${component}.svelte`,
				props,
			);
			assert.match(body, new RegExp(` is="${is}"`));
			assert.match(
				head,
				new RegExp(`<link rel="modulepreload" href="[^"]*/${is}\\.js"`),
			);
		});
	}
});
