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
			`<head><style>${css}</style></head>`,
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
			`<body><script>${js}</script></body>`,
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
			`<style>${css}</style>`,
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
			`<script type="module">${escaped}</script>`,
		);
	});

	it("does not inline into tags whose filename only ends with the input filename", () => {
		const html =
			'<link rel="stylesheet" href="/css/myapp.css"><script src="/js/myapp.js"></script>';
		mkdirSync(pathJoin(dir, "build/css"), { recursive: true });
		mkdirSync(pathJoin(dir, "build/js"), { recursive: true });
		writeFileSync(pathJoin(dir, "build/css/app.css"), "body{color:red}");
		writeFileSync(pathJoin(dir, "build/js/app.js"), "console.log(1)");
		writeFileSync(pathJoin(dir, "build/index.html"), html);

		const css = ds("inline", "build", "build/css/app.css");
		const js = ds("inline", "build", "build/js/app.js");

		assert.strictEqual(css.status, 0, css.stderr);
		assert.strictEqual(js.status, 0, js.stderr);
		assert.strictEqual(
			readFileSync(pathJoin(dir, "build/index.html"), "utf8"),
			html,
		);
	});

	it("drops the integrity attribute of the replaced tag", () => {
		const css = "body{color:red}";
		mkdirSync(pathJoin(dir, "build/css"), { recursive: true });
		writeFileSync(pathJoin(dir, "build/css/app.css"), css);
		writeFileSync(
			pathJoin(dir, "build/index.html"),
			'<link rel="stylesheet" href="/css/app.css" integrity="sha384-x" media="print">',
		);

		const result = ds("inline", "build", "build/css/app.css");

		assert.strictEqual(result.status, 0, result.stderr);
		assert.strictEqual(
			readFileSync(pathJoin(dir, "build/index.html"), "utf8"),
			`<style media="print">${css}</style>`,
		);
	});

	it("inlines single-quoted urls with a query string", () => {
		const js = "console.log(1)";
		mkdirSync(pathJoin(dir, "build/js"), { recursive: true });
		writeFileSync(pathJoin(dir, "build/js/app.js"), js);
		writeFileSync(
			pathJoin(dir, "build/index.html"),
			"<script src='/js/app.js?v=1' integrity='sha384-x' defer></script>",
		);

		const result = ds("inline", "build", "build/js/app.js");

		assert.strictEqual(result.status, 0, result.stderr);
		assert.strictEqual(
			readFileSync(pathJoin(dir, "build/index.html"), "utf8"),
			`<script defer>${js}</script>`,
		);
	});

	it("logs the csp hash of the inlined content with --debug", () => {
		const js = 'document.write("</p>")';
		const escaped = 'document.write("<\\/p>")';
		mkdirSync(pathJoin(dir, "build/js"), { recursive: true });
		writeFileSync(pathJoin(dir, "build/js/app.js"), js);
		writeFileSync(pathJoin(dir, "build/index.html"), "");

		const result = ds("inline", "build", "build/js/app.js", "--debug");

		assert.strictEqual(result.status, 0, result.stderr);
		assert.ok(
			result.stdout.includes(
				`sha256-${createHash("sha256").update(escaped).digest("base64")}`,
			),
			result.stdout,
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

	it("only inlines variables with the --prefix", () => {
		mkdirSync(pathJoin(dir, "css"));
		writeFileSync(
			pathJoin(dir, "css/app.css"),
			":root{--a:1px;--ds-b:2px}div{margin:var(--a) var(--ds-b)}",
		);

		const result = ds("optimize-styles", "css", "--prefix");

		assert.strictEqual(result.status, 0, result.stderr);
		assert.strictEqual(
			readFileSync(pathJoin(dir, "css/app.css"), "utf8"),
			":root{--a:1px;}div{margin:var(--a) 2px}",
		);
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
