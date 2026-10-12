import assert from "node:assert";
import { describe, it } from "node:test";
import { render } from "../test-render.js";

describe("FieldInput", () => {
	it("keeps a consumer aria-describedby alongside the hint", async () => {
		const { body } = await render("./components/FieldInput.svelte", {
			id: "q",
			label: "Q",
			hint: "Hint",
			"aria-describedby": "custom",
		});
		assert.match(body, /<input[^>]* aria-describedby="custom q-hint"/);
	});

	it("lets consumers override autocomplete", async () => {
		const { body } = await render("./components/InputEmail.svelte", {
			id: "email",
			label: "Email",
			autocomplete: "username",
		});
		assert.match(body, /autocomplete="username"/);
	});
});

describe("InputCheckbox", () => {
	const fieldset = (value) => new Map([["fieldset", { name: "fruit", value }]]);

	it("does not match substrings of a string fieldset value", async () => {
		const { body } = await render(
			"./components/InputCheckbox.svelte",
			{ label: "App", value: "app" },
			fieldset("apple"),
		);
		assert.doesNotMatch(body, /checked/);
	});

	it("matches values in an array", async () => {
		const { body } = await render(
			"./components/InputCheckbox.svelte",
			{ label: "Apple", value: "apple" },
			fieldset(["apple"]),
		);
		assert.match(body, /checked/);
	});

	it("links its error", async () => {
		const { body } = await render(
			"./components/InputCheckbox.svelte",
			{
				label: "Apple",
				value: "apple",
				error: [{ id: "fruit-apple", message: "Required" }],
			},
			fieldset([]),
		);
		assert.match(body, /aria-describedby="fruit-apple-error"/);
		assert.match(body, /aria-invalid="true"/);
	});
});
