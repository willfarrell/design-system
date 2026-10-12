import { deepEqual } from "node:assert/strict";
import { before, describe, mock, test } from "node:test";

let load;

before(async () => {
	mock.module("#scripts/pages.js", {
		exports: {
			default: [
				"/",
				"/component/badge",
				"/form/input-search",
				"/form/input-text",
			],
		},
	});
	({ load } = await import("./+page.server.js"));
});

const search = (q) =>
	load({ url: new URL(`https://localhost/search?q=${encodeURIComponent(q)}`) });

describe("search load", () => {
	test("matches every term", () => {
		deepEqual(search("Input text").results, ["/form/input-text"]);
		deepEqual(search("input").results, [
			"/form/input-search",
			"/form/input-text",
		]);
	});

	test("returns nothing for an empty query", () => {
		deepEqual(search("  ").results, []);
		deepEqual(load({ url: new URL("https://localhost/search") }).results, []);
	});
});
