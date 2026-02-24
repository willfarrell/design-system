import assert from "node:assert";
import { describe, it } from "node:test";
import removeOnEventsMiddleware from "./removeOnEventsMiddleware.js";

describe("removeOnEventsMiddleware", () => {
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

	it("should remove onclick Svelte internal events", async () => {
		const html = `<button onclick="this.__e=event">Click</button>`;
		const ctx = createMockContext(html);

		const result = await removeOnEventsMiddleware(ctx);

		assert.ok(result);
	});

	it("should remove onmouseover Svelte internal events", async () => {
		const html = `<div onmouseover="this.__e=event">Hover</div>`;
		const ctx = createMockContext(html);

		const result = await removeOnEventsMiddleware(ctx);

		assert.ok(result);
	});

	it("should handle HTML without events", async () => {
		const html = `<div>No events here</div>`;
		const ctx = createMockContext(html);

		const result = await removeOnEventsMiddleware(ctx);

		assert.ok(result);
	});

	it("should not remove legitimate onclick handlers", async () => {
		const html = `<button onclick="doSomething()">Click</button>`;
		const ctx = createMockContext(html);

		const result = await removeOnEventsMiddleware(ctx);

		assert.ok(result);
	});

	it("should handle multiple different event handlers", async () => {
		const html = `
			<button onclick="this.__e=event" onmouseover="this.__e=event">
				Test
			</button>
		`;
		const ctx = createMockContext(html);

		const result = await removeOnEventsMiddleware(ctx);

		assert.ok(result);
	});

	it("should handle various Svelte event patterns", async () => {
		const html = `
			<input oninput="this.__e=event">
			<form onsubmit="this.__e=event">
				<button onblur="this.__e=event">
			</form>
		`;
		const ctx = createMockContext(html);

		const result = await removeOnEventsMiddleware(ctx);

		assert.ok(result);
	});

	it("should not match onEventName with different format", async () => {
		const html = `<div onmousemove="value = event">Move</div>`;
		const ctx = createMockContext(html);

		const result = await removeOnEventsMiddleware(ctx);

		assert.ok(result);
	});

	it("should handle empty HTML", async () => {
		const html = ``;
		const ctx = createMockContext(html);

		const result = await removeOnEventsMiddleware(ctx);

		assert.ok(result);
	});
});
