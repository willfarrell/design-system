import assert from "node:assert";
import { describe, it } from "node:test";
import { createRawSnippet } from "svelte";
import { render } from "../render.testutil.js";

const path = "./components/Fieldset.svelte";

describe("Fieldset", () => {
	it("renders legend, hint and describes the fieldset by the hint", async () => {
		const { body } = await render(path, {
			id: "fruit",
			legend: "Fruit",
			hint: "Pick one",
		});
		assert.match(
			body,
			/<fieldset name="fruit" id="fruit"[^>]* aria-describedby="fruit-hint"/,
		);
		assert.match(body, /<legend>\s*Fruit\s*<\/legend>/);
		assert.match(body, /<span id="fruit-hint">Pick one<\/span>/);
	});
	it("marks the fieldset invalid when it has an error", async () => {
		const { body } = await render(path, {
			id: "fruit",
			legend: "Fruit",
			error: [{ id: "fruit", message: "Required" }],
		});
		assert.match(body, /aria-invalid="true"/);
		assert.match(body, /aria-describedby="fruit-error"/);
	});
	it("renders its children", async () => {
		const { body } = await render(path, {
			id: "fruit",
			legend: "Fruit",
			children: createRawSnippet(() => ({ render: () => "<i></i>" })),
		});
		assert.match(body, /<i><\/i>/);
	});
});

describe("InputRadio", () => {
	const radio = "./components/InputRadio.svelte";
	const fieldset = (value) => new Map([["fieldset", { name: "fruit", value }]]);

	it("takes its id and name from the fieldset", async () => {
		const { body } = await render(
			radio,
			{ label: "A", value: "a" },
			fieldset(),
		);
		const [input] = body.match(/<input[^>]*>/);
		for (const attr of [
			'id="fruit-a"',
			'name="fruit"',
			'type="radio"',
			'value="a"',
		]) {
			assert.ok(input.includes(attr), attr);
		}
		assert.match(body, /<label for="fruit-a">\s*A\s*<\/label>/);
		assert.doesNotMatch(body, /checked/);
	});
	it("is checked when it matches the fieldset value", async () => {
		const { body } = await render(
			radio,
			{ label: "A", value: "a" },
			fieldset("a"),
		);
		assert.match(body, /checked/);
	});
	it("describes the input by its hint", async () => {
		const { body } = await render(
			radio,
			{ label: "A", value: "a", hint: "First" },
			fieldset(),
		);
		assert.match(body, /aria-describedby="fruit-a-hint"/);
		assert.match(body, /<span id="fruit-a-hint">First<\/span>/);
	});
});
