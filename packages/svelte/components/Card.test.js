import assert from "node:assert";
import { describe, it } from "node:test";
import { createRawSnippet } from "svelte";
import { render } from "../test-render.js";

const path = "./components/Card.svelte";
const children = createRawSnippet((args) => ({
	render: () => `<h2 id="${args().id}">Title</h2>`,
}));

describe("Card", () => {
	it("labels the article by a slug of id", async () => {
		const { body } = await render(path, { id: "My Card!", children });
		assert.match(body, /<article[^>]* aria-labelledby="card-my-card"/);
		assert.match(body, /<h2 id="card-my-card">/);
	});

	it("labels the article by a deterministic id when id is missing", async () => {
		const first = await render(path, { children });
		const second = await render(path, { children });
		const [, labelledby] = first.body.match(/aria-labelledby="([^"]+)"/);
		assert.match(first.body, new RegExp(`<h2 id="${labelledby}">`));
		assert.strictEqual(first.body, second.body);
	});
});
