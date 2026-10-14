import assert from "node:assert";
import { describe, it } from "node:test";
import applyCacheControlMiddleware from "./applyCacheControlMiddleware.js";

const run = (cookies, headers = {}) =>
	applyCacheControlMiddleware({
		event: { cookies: { getAll: () => cookies } },
		resolve: async () => new Response("ok", { headers }),
	});

describe("applyCacheControlMiddleware", () => {
	it("defaults to a public, revalidating cache", async () => {
		const response = await run([]);
		assert.strictEqual(
			response.headers.get("Cache-Control"),
			"public, max-age=60, stale-if-error=300, stale-while-revalidate=31536000",
		);
	});

	it("keeps a Cache-Control set by the route", async () => {
		const response = await run([], { "Cache-Control": "max-age=5" });
		assert.strictEqual(response.headers.get("Cache-Control"), "max-age=5");
	});

	it("disables shared caching when cookies are present", async () => {
		const response = await run([{ name: "session", value: "x" }], {
			"Cache-Control": "public, max-age=600",
		});
		assert.strictEqual(
			response.headers.get("Cache-Control"),
			"private, no-cache",
		);
	});

	it("disables shared caching when the response sets a cookie", async () => {
		const response = await run([], {
			"Set-Cookie": "session=; Max-Age=0; Path=/",
		});
		assert.strictEqual(
			response.headers.get("Cache-Control"),
			"private, no-cache",
		);
	});
});
