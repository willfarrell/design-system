import assert from "node:assert";
import { describe, it } from "node:test";
import {
	brotliDecompressSync,
	gunzipSync,
	inflateSync,
	zstdDecompressSync,
} from "node:zlib";
import applyContentEncodingMiddleware from "./applyContentEncodingMiddleware.js";

const createMockEvent = (acceptEncoding, method = "GET") => ({
	request: {
		method,
		headers: new Headers(
			acceptEncoding ? { "Accept-Encoding": acceptEncoding } : {},
		),
	},
});

const createMockResolve =
	(body, headers = {}) =>
	async () =>
		new Response(body, { status: 200, statusText: "OK", headers });

const collectResponse = async (response) => {
	const reader = response.body.getReader();
	const chunks = [];
	while (true) {
		const { done, value } = await reader.read();
		if (done) break;
		chunks.push(value);
	}
	const totalLength = chunks.reduce((sum, c) => sum + c.length, 0);
	const result = new Uint8Array(totalLength);
	let offset = 0;
	for (const chunk of chunks) {
		result.set(chunk, offset);
		offset += chunk.length;
	}
	return result;
};

describe("applyContentEncodingMiddleware", () => {
	it("should compress with gzip", async () => {
		const body = "Hello, world!";
		const result = await applyContentEncodingMiddleware({
			event: createMockEvent("gzip"),
			resolve: createMockResolve(body),
		});

		assert.strictEqual(result.headers.get("Content-Encoding"), "gzip");
		assert.strictEqual(result.headers.has("Content-Length"), false);

		const compressed = await collectResponse(result);
		const decompressed = gunzipSync(compressed);
		assert.strictEqual(decompressed.toString(), body);
	});

	it("should compress with br", async () => {
		const body = "Hello, brotli!";
		const result = await applyContentEncodingMiddleware({
			event: createMockEvent("br"),
			resolve: createMockResolve(body),
		});

		assert.strictEqual(result.headers.get("Content-Encoding"), "br");

		const compressed = await collectResponse(result);
		const decompressed = brotliDecompressSync(compressed);
		assert.strictEqual(decompressed.toString(), body);
	});

	it("should compress with deflate", async () => {
		const body = "Hello, deflate!";
		const result = await applyContentEncodingMiddleware({
			event: createMockEvent("deflate"),
			resolve: createMockResolve(body),
		});

		assert.strictEqual(result.headers.get("Content-Encoding"), "deflate");

		const compressed = await collectResponse(result);
		const decompressed = inflateSync(compressed);
		assert.strictEqual(decompressed.toString(), body);
	});

	it("should compress with zstd", async () => {
		const body = "Hello, zstd!";
		const result = await applyContentEncodingMiddleware({
			event: createMockEvent("zstd"),
			resolve: createMockResolve(body),
		});

		assert.strictEqual(result.headers.get("Content-Encoding"), "zstd");

		const compressed = await collectResponse(result);
		const decompressed = zstdDecompressSync(compressed);
		assert.strictEqual(decompressed.toString(), body);
	});

	it("should select highest quality encoding", async () => {
		const body = "Hello!";
		const result = await applyContentEncodingMiddleware({
			event: createMockEvent("gzip;q=0.5, br;q=1.0"),
			resolve: createMockResolve(body),
		});

		assert.strictEqual(result.headers.get("Content-Encoding"), "br");
	});

	it("should handle wildcard encoding", async () => {
		const body = "Hello!";
		const result = await applyContentEncodingMiddleware({
			event: createMockEvent("*"),
			resolve: createMockResolve(body),
		});

		assert.strictEqual(result.headers.get("Content-Encoding"), "br");
	});

	it("should skip q=0 encodings", async () => {
		const body = "Hello!";
		const result = await applyContentEncodingMiddleware({
			event: createMockEvent("br;q=0, gzip"),
			resolve: createMockResolve(body),
		});

		assert.strictEqual(result.headers.get("Content-Encoding"), "gzip");
	});

	it("should skip when body is null", async () => {
		const result = await applyContentEncodingMiddleware({
			event: createMockEvent("gzip"),
			resolve: async () => new Response(null, { status: 204 }),
		});

		assert.strictEqual(result.headers.has("Content-Encoding"), false);
	});

	it("should skip when Content-Encoding already set", async () => {
		const result = await applyContentEncodingMiddleware({
			event: createMockEvent("gzip"),
			resolve: createMockResolve("body", {
				"Content-Encoding": "identity",
			}),
		});

		assert.strictEqual(result.headers.get("Content-Encoding"), "identity");
	});

	it("should skip for HEAD requests", async () => {
		const result = await applyContentEncodingMiddleware({
			event: createMockEvent("gzip", "HEAD"),
			resolve: createMockResolve("body"),
		});

		assert.strictEqual(result.headers.has("Content-Encoding"), false);
	});

	it("should skip when Cache-Control contains no-transform", async () => {
		const result = await applyContentEncodingMiddleware({
			event: createMockEvent("gzip"),
			resolve: createMockResolve("body", {
				"Cache-Control": "no-transform, public",
			}),
		});

		assert.strictEqual(result.headers.has("Content-Encoding"), false);
	});

	it("should skip when no acceptable encoding", async () => {
		const result = await applyContentEncodingMiddleware({
			event: createMockEvent("identity"),
			resolve: createMockResolve("body"),
		});

		assert.strictEqual(result.headers.has("Content-Encoding"), false);
	});

	it("should skip when no Accept-Encoding header", async () => {
		const result = await applyContentEncodingMiddleware({
			event: createMockEvent(null),
			resolve: createMockResolve("body"),
		});

		assert.strictEqual(result.headers.has("Content-Encoding"), false);
	});

	it("should set Vary header", async () => {
		const result = await applyContentEncodingMiddleware({
			event: createMockEvent("gzip"),
			resolve: createMockResolve("body"),
		});

		assert.ok(result.headers.get("Vary")?.includes("Accept-Encoding"));
	});

	it("should delete Content-Length header", async () => {
		const result = await applyContentEncodingMiddleware({
			event: createMockEvent("gzip"),
			resolve: createMockResolve("body", { "Content-Length": "4" }),
		});

		assert.strictEqual(result.headers.has("Content-Length"), false);
	});

	it("should preserve status and statusText", async () => {
		const result = await applyContentEncodingMiddleware({
			event: createMockEvent("gzip"),
			resolve: async () =>
				new Response("created", {
					status: 201,
					statusText: "Created",
				}),
		});

		assert.strictEqual(result.status, 201);
		assert.strictEqual(result.statusText, "Created");
	});
});
