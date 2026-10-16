import assert from "node:assert";
import { describe, it } from "node:test";
import { createRawSnippet } from "svelte";
import { render } from "../render.testutil.js";

const text = (value) => createRawSnippet(() => ({ render: () => value }));

describe("HeadingAnchor", () => {
	it("gives each anchor link a unique name", async () => {
		const a = await render("./components/Heading2.svelte", {
			id: "install",
			children: text("Install"),
		});
		const b = await render("./components/Heading2.svelte", {
			id: "usage",
			children: text("Usage"),
		});
		const name = (body) =>
			body.match(/<a [^>]*>.*?<span class="visually-hidden">([^<]*)</)[1];
		assert.notStrictEqual(name(a.body), name(b.body));
		assert.match(name(a.body), /install/);
	});
});

describe("Footnotes", () => {
	it("gives each backlink a unique name", async () => {
		const { body } = await render("./components/Footnotes.svelte", {
			title: "Notes",
			footnotes: [
				{ id: "a", value: "A" },
				{ id: "b", value: "B" },
			],
		});
		const labels = [...body.matchAll(/<a [^>]*aria-label="([^"]+)"/g)].map(
			(m) => m[1],
		);
		assert.strictEqual(labels.length, 2);
		assert.notStrictEqual(labels[0], labels[1]);
		assert.match(labels[0], /1/);
		assert.match(labels[1], /2/);
	});
});

describe("Table", () => {
	const path = "./components/Table.svelte";
	it("labels the scroll region by the caption", async () => {
		const { body } = await render(path, { caption: "Font sizes" });
		const [, id] = body.match(/<caption id="([^"]+)">\s*Font sizes/);
		assert.match(body, new RegExp(`role="region" aria-labelledby="${id}"`));
		assert.doesNotMatch(body, /aria-label="/);
	});
	it("uses a given aria-label", async () => {
		const { body } = await render(path, { "aria-label": "Prices" });
		assert.match(body, /role="region" aria-label="Prices"/);
	});
	it("is keyboard focusable so it can scroll", async () => {
		const { body } = await render(path, { caption: "x" });
		assert.match(body, /<div class="table-overflow"[^>]* tabindex="0"/);
	});
});
