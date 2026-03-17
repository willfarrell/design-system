import { describe, test } from "node:test";
import fc from "fast-check";
import allowedAttributes from "./utils/attributes.js";

const catchError = (input, e) => {
	console.error(input, e);
	throw e;
};

describe("Fuzz", () => {
	test("Should handle random props for allowedAttributes", async () => {
		fc.assert(
			fc.asyncProperty(
				fc.dictionary(fc.string(), fc.string()),
				async (input) => {
					try {
						allowedAttributes(input, new Set([]));
					} catch (e) {
						catchError(input, e);
					}
				},
			),
			{
				numRuns: 10,
				verbose: 2,
				examples: [],
			},
		);
	});
});
