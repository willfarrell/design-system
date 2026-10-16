import assert from "node:assert";
import { mkdtempSync, readFileSync, rmSync } from "node:fs";
import { tmpdir } from "node:os";
import { join as pathJoin } from "node:path";
import { afterEach, beforeEach, describe, it } from "node:test";
import { saveFileSync } from "./fs.js";

let dir;

beforeEach(() => {
	dir = mkdtempSync(pathJoin(tmpdir(), "ds-fs-"));
});

afterEach(() => {
	rmSync(dir, { recursive: true, force: true });
});

describe("saveFileSync", () => {
	it("creates nested directories", () => {
		const path = pathJoin(dir, "a/b/c/app.css");

		saveFileSync(path, "body{}");

		assert.strictEqual(readFileSync(path, "utf8"), "body{}");
	});
});
