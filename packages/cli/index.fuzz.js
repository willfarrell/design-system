import { mkdtempSync, rmSync } from "node:fs";
import { tmpdir } from "node:os";
import { join as pathJoin } from "node:path";
import { after, before, describe, test } from "node:test";
import fc from "fast-check";
import extract from "./commands/extract.js";

const expectedErrors = new Set(["ENOENT", "ENOTDIR"]);
const catchError = (input, e) => {
	if (!expectedErrors.has(e.code)) {
		throw e;
	}
};

describe("Fuzz", () => {
	const cwd = process.cwd();
	let dir;
	before(() => {
		dir = mkdtempSync(pathJoin(tmpdir(), "ds-fuzz-"));
		process.chdir(dir);
	});
	after(() => {
		process.chdir(cwd);
		rmSync(dir, { recursive: true, force: true });
	});

	test("Should accept random options for extract", async () => {
		await fc.assert(
			fc.asyncProperty(
				fc.string().filter((s) => !s.includes("..")),
				async (input) => {
					try {
						extract({ inputDir: input });
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
