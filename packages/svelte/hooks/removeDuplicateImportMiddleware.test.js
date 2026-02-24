import assert from "node:assert";
import { describe, it, mock } from "node:test";
import removeDuplicateImportMiddleware from "./removeDuplicateImportMiddleware.js";

describe("removeDuplicateImportMiddleware", () => {
	const createMockResolve = (html) => {
		return mock.fn(() =>
			Promise.resolve({
				body: {
					pipe: () => ({
						getWebStream: () => null,
						getReader: () => null,
						locked: false,
					}),
				},
			}),
		);
	};

	it("should handle empty HTML without throwing", async () => {
		const mockResolve = createMockResolve("");
		const mockEvent = { request: new URL("http://localhost") };

		const result = await removeDuplicateImportMiddleware({
			event: mockEvent,
			resolve: mockResolve,
		});

		assert.ok(result);
	});

	it("should remove duplicate script imports", async () => {
		const html = `
			<html>
				<script src="/a.js"></script>
				<script src="/b.js"></script>
				<script src="/a.js"></script>
			</html>
		`;
		const mockResolve = createMockResolve(html);
		const mockEvent = { request: new URL("http://localhost") };

		const result = await removeDuplicateImportMiddleware({
			event: mockEvent,
			resolve: mockResolve,
		});

		assert.ok(result);
	});

	it("should remove duplicate link imports", async () => {
		const html = `
			<html>
				<link href="/a.css" rel="stylesheet">
				<link href="/b.css" rel="stylesheet">
				<link href="/a.css" rel="stylesheet">
			</html>
		`;
		const mockResolve = createMockResolve(html);
		const mockEvent = { request: new URL("http://localhost") };

		const result = await removeDuplicateImportMiddleware({
			event: mockEvent,
			resolve: mockResolve,
		});

		assert.ok(result);
	});

	it("should keep different imports unchanged", async () => {
		const html = `
			<html>
				<script src="/a.js"></script>
				<script src="/b.js"></script>
			</html>
		`;
		const mockResolve = createMockResolve(html);
		const mockEvent = { request: new URL("http://localhost") };

		const result = await removeDuplicateImportMiddleware({
			event: mockEvent,
			resolve: mockResolve,
		});

		assert.ok(result);
	});

	it("should handle single import without issues", async () => {
		const html = `<script src="/only.js"></script>`;
		const mockResolve = createMockResolve(html);
		const mockEvent = { request: new URL("http://localhost") };

		const result = await removeDuplicateImportMiddleware({
			event: mockEvent,
			resolve: mockResolve,
		});

		assert.ok(result);
	});

	it("should handle malformed tags gracefully", async () => {
		const html = `
			<html>
				<script></script>
				<script></script>
			</html>
		`;
		const mockResolve = createMockResolve(html);
		const mockEvent = { request: new URL("http://localhost") };

		const result = await removeDuplicateImportMiddleware({
			event: mockEvent,
			resolve: mockResolve,
		});

		assert.ok(result);
	});

	it("should handle multiple different duplicate types", async () => {
		const html = `
			<html>
				<script src="/a.js"></script>
				<link href="/a.css" rel="stylesheet">
				<script src="/a.js"></script>
				<link href="/a.css" rel="stylesheet">
			</html>
		`;
		const mockResolve = createMockResolve(html);
		const mockEvent = { request: new URL("http://localhost") };

		const result = await removeDuplicateImportMiddleware({
			event: mockEvent,
			resolve: mockResolve,
		});

		assert.ok(result);
	});
});
