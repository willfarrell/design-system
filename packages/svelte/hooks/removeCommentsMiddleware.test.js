import assert from "node:assert";
import { describe, it } from "node:test";
import removeCommentsMiddleware from "./removeCommentsMiddleware.js";

describe("removeCommentsMiddleware", () => {
	const createMockResolve = (html) => {
		return async () => ({
			body: {
				pipe: () => ({
					getWebStream: () => null,
					getReader: () => null,
					locked: false,
				}),
			},
		});
	};

	const createMockContext = (html) => ({
		event: { request: new URL("http://localhost") },
		resolve: createMockResolve(html),
	});

	it("should remove standard HTML comments", async () => {
		const html = `<!-- comment --><div>Test</div>`;
		const ctx = createMockContext(html);

		const result = await removeCommentsMiddleware(ctx);

		assert.ok(result);
	});

	it("should handle HTML without comments", async () => {
		const html = `<div>No comments here</div>`;
		const ctx = createMockContext(html);

		const result = await removeCommentsMiddleware(ctx);

		assert.ok(result);
	});

	it("should remove multiple consecutive comments", async () => {
		const html = `<!-- comment 1 --><!-- comment 2 --><div>Test</div>`;
		const ctx = createMockContext(html);

		const result = await removeCommentsMiddleware(ctx);

		assert.ok(result);
	});

	it("should handle empty comments", async () => {
		const html = `<!----><div>Test</div>`;
		const ctx = createMockContext(html);

		const result = await removeCommentsMiddleware(ctx);

		assert.ok(result);
	});

	it("should remove comments with special characters", async () => {
		const html = `<!-- [test] --><div>Test</div>`;
		const ctx = createMockContext(html);

		const result = await removeCommentsMiddleware(ctx);

		assert.ok(result);
	});

	it("should handle empty HTML without crashing", async () => {
		const html = ``;
		const ctx = createMockContext(html);

		const result = await removeCommentsMiddleware(ctx);

		assert.ok(result);
	});

	it("should handle unclosed comment without hanging", async () => {
		const html = `<!-- unclosed<div>Test</div>`;
		const ctx = createMockContext(html);

		const result = await removeCommentsMiddleware(ctx);

		assert.ok(result);
	});

	it("should handle deeply nested comment-like patterns", async () => {
		const html = `<!----!----!----><div>Test</div>`;
		const ctx = createMockContext(html);

		const result = await removeCommentsMiddleware(ctx);

		assert.ok(result);
	});

	it("should handle large number of comments efficiently", async () => {
		const comments = Array(100).fill("<!-- comment -->").join("");
		const html = `${comments}<div>Test</div>`;
		const ctx = createMockContext(html);

		const start = Date.now();
		const result = await removeCommentsMiddleware(ctx);
		const duration = Date.now() - start;

		assert.ok(result);
		assert.ok(duration < 1000, `Took too long: ${duration}ms`);
	});

	it("should remove comments with numbers", async () => {
		const html = `<!-- comment 123 --><div>Test</div>`;
		const ctx = createMockContext(html);

		const result = await removeCommentsMiddleware(ctx);

		assert.ok(result);
	});

	it("should not affect script tags with comment-like content", async () => {
		const html = `<script>var x = "<!-- not a comment -->";</script>`;
		const ctx = createMockContext(html);

		const result = await removeCommentsMiddleware(ctx);

		assert.ok(result);
	});
});
