import { deepEqual, equal, throws } from "node:assert/strict";
import { before, describe, mock, test } from "node:test";

let load;
let actions;

before(async () => {
	mock.module("#examples/registry.js", {
		exports: { default: { ExampleBadge: {} } },
	});
	({ load, actions } = await import("./+page.server.js"));
});

describe("demo load", () => {
	test("returns a registered component", () => {
		equal(load({ params: { component: "badge" } }).component, "badge");
	});

	test("404s an unknown component", () => {
		throws(
			() => load({ params: { component: "does-not-exist" } }),
			(e) => e.status === 404,
		);
	});

	test("404s a prototype key", () => {
		throws(
			() => load({ params: { component: "constructor" } }),
			(e) => e.status === 404,
		);
	});

	test("accepts demo form submissions", () => {
		deepEqual(actions.default(), {});
	});
});
