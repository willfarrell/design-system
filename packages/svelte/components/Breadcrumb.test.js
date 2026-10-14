import assert from "node:assert";
import { describe, it } from "node:test";
import { page, render } from "../render.testutil.js";

const path = "./components/Breadcrumb.svelte";
const items = [
	{ href: "/", text: "Home" },
	{ href: "/component", text: "Components" },
	{ href: "/component/breadcrumb", text: "Breadcrumb" },
];

describe("Breadcrumb", () => {
	it("renders an ordered list of links inside a labelled nav", async () => {
		const { body } = await render(path, { items });
		assert.match(body, /^<nav[^>]* aria-label="Breadcrumb"[^>]*><ol>/);
		assert.strictEqual(body.match(/<li><a /g).length, 3);
		assert.match(body, /<a href="\/component">Components<\/a>/);
	});

	it("marks only the last item as the current page", async () => {
		page.url = new URL("http://localhost/component/breadcrumb/");
		const { body } = await render(path, { items });
		assert.strictEqual(body.match(/aria-current/g).length, 1);
		assert.match(
			body,
			/<a href="\/component\/breadcrumb" aria-current="page">Breadcrumb<\/a><\/li><\/ol>/,
		);
	});

	it("drops unsafe hrefs and escapes text", async () => {
		const { body } = await render(path, {
			items: [
				{ href: "javascript:alert(1)", text: "<script>alert(1)</script>" },
			],
		});
		assert.doesNotMatch(body, /javascript:|<script>/);
	});

	it("uses a styling class and accepts a localized label", async () => {
		const { body } = await render(path, { items, label: "Fil d'Ariane" });
		assert.match(body, /^<nav class="breadcrumb" aria-label="Fil d'Ariane">/);
	});
});
