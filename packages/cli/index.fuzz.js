import { describe, test } from "node:test";
import fc from "fast-check";
import extract from "./commands/extract.js";

const expectedErrors = new Set(["ENOENT", "ENOTDIR"]);
const catchError = (input, e) => {
	if (!expectedErrors.has(e.code)) {
		throw e;
	}
};

describe("Fuzz", () => {
	test("Should accept random options for extract", async () => {
		await fc.assert(
			fc.asyncProperty(fc.string(), async (input) => {
				try {
					extract({ inputDir: input });
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
