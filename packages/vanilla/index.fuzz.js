import { describe, test } from "node:test";
import fc from "fast-check";
import { createSignal } from "./bootstrap/pewc/signals.js";

const catchError = (input, e) => {
	console.error(input, e);
	throw e;
};

describe("Fuzz", () => {
	test("Should handle random signal names", async () => {
		await fc.assert(
			fc.asyncProperty(fc.string(), async (input) => {
				try {
					createSignal(input);
				} catch (e) {
					catchError(input, e);
				}
			}),
			{
				numRuns: 10,
				verbose: 2,
				examples: [],
			},
		);
	});
});
