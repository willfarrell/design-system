import assert from "node:assert";
import { describe, it } from "node:test";
import removeDuplicateImportMiddleware from "./removeDuplicateImportMiddleware.js";

const run = (html) =>
	removeDuplicateImportMiddleware({
		event: {},
		resolve: (_event, { transformPageChunk }) =>
			Promise.resolve(transformPageChunk({ html })),
	});

const count = (html, tag) => html.split(tag).length - 1;

describe("removeDuplicateImportMiddleware", () => {
	it("should handle HTML without imports", async () => {
		assert.strictEqual(await run(""), "");
		assert.strictEqual(await run("<p>text</p>"), "<p>text</p>");
	});

	it("should remove duplicate script imports", async () => {
		const result = await run(
			`<script src="/a.js"></script><script src="/b.js"></script><script src="/a.js"></script>`,
		);
		assert.strictEqual(count(result, `<script src="/a.js">`), 1);
		assert.strictEqual(count(result, `<script src="/b.js">`), 1);
	});

	it("should remove duplicate link imports", async () => {
		const result = await run(
			`<link href="/a.css" rel="stylesheet"><link href="/b.css" rel="stylesheet"><link href="/a.css" rel="stylesheet">`,
		);
		assert.strictEqual(
			count(result, `<link href="/a.css" rel="stylesheet">`),
			1,
		);
		assert.strictEqual(
			count(result, `<link href="/b.css" rel="stylesheet">`),
			1,
		);
	});

	it("should keep different imports unchanged", async () => {
		const html = `<script src="/a.js"></script><script src="/b.js"></script>`;
		assert.strictEqual(await run(html), html);
	});

	it("should keep tags without src or href", async () => {
		const html = "<script></script><script></script>";
		assert.strictEqual(await run(html), html);
	});

	it("should handle multiple different duplicate types", async () => {
		const result = await run(
			`<script src="/a.js"></script><link href="/a.css" rel="stylesheet"><script src="/a.js"></script><link href="/a.css" rel="stylesheet">`,
		);
		assert.strictEqual(count(result, `<script src="/a.js">`), 1);
		assert.strictEqual(
			count(result, `<link href="/a.css" rel="stylesheet">`),
			1,
		);
	});

	it("removes the whole duplicate script element and keeps the first", async () => {
		assert.strictEqual(
			await run(
				`<script type="module" src="/a.js"></script><p>x</p><script type="module" src="/a.js"></script><p>y</p>`,
			),
			`<script type="module" src="/a.js"></script><p>x</p><p>y</p>`,
		);
	});
});
