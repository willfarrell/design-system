import assert from "node:assert";
import { spawnSync } from "node:child_process";
import { createHash } from "node:crypto";
import {
	existsSync,
	mkdirSync,
	mkdtempSync,
	readFileSync,
	rmSync,
	writeFileSync,
} from "node:fs";
import { tmpdir } from "node:os";
import { join as pathJoin } from "node:path";
import { afterEach, beforeEach, describe, it } from "node:test";

const cli = pathJoin(import.meta.dirname, "index.js");

let dir;

const ds = (...args) =>
	spawnSync(process.execPath, [cli, ...args], { cwd: dir, encoding: "utf8" });

const sri = (content) =>
	`sha256-${createHash("sha256").update(content).digest("base64")}`;

beforeEach(() => {
	dir = mkdtempSync(pathJoin(tmpdir(), "ds-cli-"));
});

afterEach(() => {
	rmSync(dir, { recursive: true, force: true });
});

describe("ds inline", () => {
	it("inlines a css file into html files", () => {
		const css = "body{color:red}";
		mkdirSync(pathJoin(dir, "build/css"), { recursive: true });
		writeFileSync(pathJoin(dir, "build/css/app.css"), css);
		writeFileSync(
			pathJoin(dir, "build/index.html"),
			'<head><link rel="stylesheet" href="/css/app.css"></head>',
		);

		const result = ds("inline", "build", "build/css/app.css");

		assert.strictEqual(result.status, 0, result.stderr);
		assert.strictEqual(
			readFileSync(pathJoin(dir, "build/index.html"), "utf8"),
			`<head><style integrity="${sri(css)}">${css}</style></head>`,
		);
	});

	it("inlines a js file into html files", () => {
		const js = "console.log('$&')";
		mkdirSync(pathJoin(dir, "build/js"), { recursive: true });
		writeFileSync(pathJoin(dir, "build/js/app.js"), js);
		writeFileSync(
			pathJoin(dir, "build/index.html"),
			'<body><script src="/js/app.js"></script></body>',
		);

		const result = ds("inline", "build", "build/js/app.js");

		assert.strictEqual(result.status, 0, result.stderr);
		assert.strictEqual(
			readFileSync(pathJoin(dir, "build/index.html"), "utf8"),
			`<body><script integrity="${sri(js)}">${js}</script></body>`,
		);
	});

	it("inlines into an absolute directory path", () => {
		const css = "body{color:red}";
		mkdirSync(pathJoin(dir, "build/css"), { recursive: true });
		writeFileSync(pathJoin(dir, "build/css/app.css"), css);
		writeFileSync(
			pathJoin(dir, "build/index.html"),
			'<link rel="stylesheet" href="/css/app.css">',
		);

		const result = ds("inline", pathJoin(dir, "build"), "build/css/app.css");

		assert.strictEqual(result.status, 0, result.stderr);
		assert.strictEqual(
			readFileSync(pathJoin(dir, "build/index.html"), "utf8"),
			`<style integrity="${sri(css)}">${css}</style>`,
		);
	});

	it("keeps tag attributes and escapes closing tags", () => {
		const js = 'import "./a.js";document.write("</script>")';
		const escaped = 'import "./a.js";document.write("<\\/script>")';
		mkdirSync(pathJoin(dir, "build/js"), { recursive: true });
		writeFileSync(pathJoin(dir, "build/js/app.js"), js);
		writeFileSync(
			pathJoin(dir, "build/index.html"),
			'<script type="module" src="/js/app.js"></script>',
		);

		const result = ds("inline", "build", "build/js/app.js");

		assert.strictEqual(result.status, 0, result.stderr);
		assert.strictEqual(
			readFileSync(pathJoin(dir, "build/index.html"), "utf8"),
			`<script type="module" integrity="${sri(escaped)}">${escaped}</script>`,
		);
	});

	it("errors on unsupported file extensions", () => {
		mkdirSync(pathJoin(dir, "build"), { recursive: true });
		writeFileSync(pathJoin(dir, "build/logo.svg"), "<svg/>");
		writeFileSync(pathJoin(dir, "build/index.html"), "<img src=logo.svg>");

		const result = ds("inline", "build", "build/logo.svg");

		assert.notStrictEqual(result.status, 0);
		assert.match(result.stderr, /Unsupported file extension svg/);
		assert.strictEqual(
			readFileSync(pathJoin(dir, "build/index.html"), "utf8"),
			"<img src=logo.svg>",
		);
	});
});

describe("ds extract", () => {
	it("runs without arguments", () => {
		const result = ds();

		assert.strictEqual(result.status, 0, result.stderr);
	});
});

describe("ds optimize-styles", () => {
	it("accepts a numeric --iterations value", () => {
		mkdirSync(pathJoin(dir, "css"));
		writeFileSync(
			pathJoin(dir, "css/app.css"),
			":root{--a:1px}div{margin:var(--a)}",
		);

		const result = ds("optimize-styles", "css", "--iterations", "3");

		assert.strictEqual(result.status, 0, result.stderr);
		assert.ok(existsSync(pathJoin(dir, "css/app.css")));
	});

	it("rejects --iterations values that are not positive integers", () => {
		mkdirSync(pathJoin(dir, "css"));

		for (const value of ["0", "abc"]) {
			const result = ds("optimize-styles", "css", "--iterations", value);

			assert.notStrictEqual(result.status, 0);
			assert.match(result.stderr, /--iterations/);
		}
	});
});
