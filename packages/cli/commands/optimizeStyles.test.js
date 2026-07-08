import assert from "node:assert";
import { beforeEach, describe, it, mock } from "node:test";

// In-memory filesystem
let files = {};

const mockReadFileSync = (path) => ({
	toString: () => {
		if (files[path] === undefined) throw new Error(`ENOENT: ${path}`);
		return files[path];
	},
});

const mockWalkDirSync = function* (dir, ext) {
	for (const path of Object.keys(files)) {
		if (path.startsWith(dir) && path.endsWith(ext)) {
			yield path;
		}
	}
};

const mockSaveFileSync = (path, data) => {
	files[path] = data;
};

mock.module("node:fs", {
	namedExports: {
		readFileSync: mockReadFileSync,
		writeFileSync: (path, data) => {
			files[path] = data;
		},
		existsSync: () => true,
		mkdirSync: () => {},
		readdirSync: () => [],
	},
});

mock.module("../lib/fs.js", {
	namedExports: {
		walkDirSync: mockWalkDirSync,
		saveFileSync: mockSaveFileSync,
	},
});

const { default: optimizeStyles } = await import("./optimizeStyles.js");

const cwd = process.cwd();

beforeEach(() => {
	files = {};
});

describe("optimizeStyles", () => {
	describe("single-use variable inlining", () => {
		it("replaces single-use var with its value", () => {
			files[`${cwd}/src/style.css`] = [
				":root { --color: #000; }",
				"div { color: var(--color); }",
			].join("\n");

			optimizeStyles("src", { iterations: 1 });

			assert.ok(!files[`${cwd}/src/style.css`].includes("var(--color)"));
			assert.ok(files[`${cwd}/src/style.css`].includes("color: #000"));
		});

		it("replaces single-use var with fallback", () => {
			files[`${cwd}/src/style.css`] = [
				":root { --color: #000; }",
				"div { color: var(--color, red); }",
			].join("\n");

			optimizeStyles("src", { iterations: 1 });

			assert.ok(!files[`${cwd}/src/style.css`].includes("var(--color, red)"));
			assert.ok(files[`${cwd}/src/style.css`].includes("color: #000"));
		});

		it("replaces single-use var with nested var() fallback", () => {
			files[`${cwd}/src/style.css`] = [
				":root { --border-color: #000; }",
				"div { border: 1px solid var(--border-color, var(--color-main-bold)); }",
			].join("\n");

			optimizeStyles("src", { iterations: 1 });

			const result = files[`${cwd}/src/style.css`];
			assert.ok(
				result.includes("border: 1px solid #000"),
				`Expected "border: 1px solid #000", got: ${result}`,
			);
			assert.ok(
				!result.includes("))"),
				`Expected no stray closing paren, got: ${result}`,
			);
		});

		it("does NOT replace multi-assigned var", () => {
			files[`${cwd}/src/style.css`] = [
				":root { --x: 1; }",
				"a { --x: 2; }",
				"div { width: var(--x); }",
			].join("\n");

			optimizeStyles("src", { iterations: 1 });

			assert.ok(files[`${cwd}/src/style.css`].includes("var(--x)"));
		});

		it("replaces var duplicated across chunks with same value", () => {
			files[`${cwd}/src/a.css`] = ":root { --x: 1rem; }";
			files[`${cwd}/src/b.css`] =
				":root { --x: 1rem; }\ndiv { width: var(--x); }";

			optimizeStyles("src", { iterations: 1 });

			assert.ok(
				files[`${cwd}/src/b.css`].includes("width: 1rem"),
				`Expected inlined value, got: ${files[`${cwd}/src/b.css`]}`,
			);
		});
	});

	describe("calc() simplification", () => {
		it("simplifies calc(1 + 1) to 2", () => {
			files[`${cwd}/src/style.css`] = "div { width: calc(1 + 1); }";

			optimizeStyles("src", { iterations: 1 });

			assert.ok(files[`${cwd}/src/style.css`].includes("width: 2"));
			assert.ok(!files[`${cwd}/src/style.css`].includes("calc"));
		});

		it("simplifies calc(0.1em + 0.2em) to 0.3em", () => {
			files[`${cwd}/src/style.css`] = "div { width: calc(0.1em + 0.2em); }";

			optimizeStyles("src", { iterations: 1 });

			assert.ok(files[`${cwd}/src/style.css`].includes("0.3em"));
			assert.ok(!files[`${cwd}/src/style.css`].includes("calc"));
		});

		it("simplifies calc(2 * 3em) to 6em", () => {
			files[`${cwd}/src/style.css`] = "div { width: calc(2 * 3em); }";

			optimizeStyles("src", { iterations: 1 });

			assert.ok(files[`${cwd}/src/style.css`].includes("6em"));
			assert.ok(!files[`${cwd}/src/style.css`].includes("calc"));
		});

		it("inlines single-use var then simplifies calc", () => {
			files[`${cwd}/src/style.css`] = [
				":root { --x: 2; }",
				"div { width: calc(var(--x) + 1); }",
			].join("\n");

			optimizeStyles("src", { iterations: 1 });

			const result = files[`${cwd}/src/style.css`];
			assert.ok(
				result.includes("width: 3"),
				`Expected "width: 3" in result: ${result}`,
			);
			assert.ok(
				!result.includes("calc"),
				`Expected no calc in result: ${result}`,
			);
		});

		it("preserves calc() containing multi-assigned var()", () => {
			files[`${cwd}/src/style.css`] =
				":root { --x: 1; }\na { --x: 2; }\ndiv { width: calc(var(--x) + 1); }";

			optimizeStyles("src", { iterations: 1 });

			assert.ok(files[`${cwd}/src/style.css`].includes("calc(var(--x) + 1)"));
		});

		it("preserves calc() with mixed units", () => {
			files[`${cwd}/src/style.css`] = "div { width: calc(1 + 1px); }";

			optimizeStyles("src", { iterations: 1 });

			assert.ok(
				files[`${cwd}/src/style.css`].includes("calc(1 + 1px)"),
				`Expected calc preserved with mixed units`,
			);
		});

		it("preserves calc() with relative color channel keywords", () => {
			files[`${cwd}/src/style.css`] =
				"div { color: oklch(from red calc(l + 0.5) c h / 0.5); border-color: oklch(from red calc(l * 0.5) c h); }";

			optimizeStyles("src", { iterations: 1 });

			const result = files[`${cwd}/src/style.css`];
			assert.ok(
				result.includes("calc(l + 0.5)"),
				`Expected calc(l + 0.5) preserved: ${result}`,
			);
			assert.ok(
				result.includes("calc(l * 0.5)"),
				`Expected calc(l * 0.5) preserved: ${result}`,
			);
		});

		it("preserves nested calc(calc(...))", () => {
			files[`${cwd}/src/style.css`] = "div { width: calc(calc(1 + 1) + 2); }";

			optimizeStyles("src", { iterations: 1 });

			// The inner calc matches first; it contains "calc(" so it's preserved
			assert.ok(files[`${cwd}/src/style.css`].includes("calc("));
		});
	});

	describe("partial calc() simplification", () => {
		it("simplifies mixed-unit calc by combining like units", () => {
			files[`${cwd}/src/style.css`] = "div { width: calc(60ch + 3em + 30ch); }";
			optimizeStyles("src", { iterations: 1 });
			const result = files[`${cwd}/src/style.css`];
			assert.ok(
				result.includes("calc(90ch + 3em)"),
				`Expected calc(90ch + 3em), got: ${result}`,
			);
		});

		it("partially evaluates calc with var()", () => {
			files[`${cwd}/src/style.css`] =
				"div { width: calc(var(--border-width) * 2 + 1rem * 2 + 1em); }";
			optimizeStyles("src", { iterations: 1 });
			const result = files[`${cwd}/src/style.css`];
			assert.ok(
				result.includes("calc(var(--border-width) * 2 + 2rem + 1em)"),
				`Expected partial simplification, got: ${result}`,
			);
		});

		it("combines like-unit terms with var()", () => {
			files[`${cwd}/src/style.css`] =
				"div { width: calc(var(--x) + 1rem + 2rem); }";
			optimizeStyles("src", { iterations: 1 });
			const result = files[`${cwd}/src/style.css`];
			assert.ok(
				result.includes("calc(var(--x) + 3rem)"),
				`Expected calc(var(--x) + 3rem), got: ${result}`,
			);
		});

		it("handles subtraction with mixed units", () => {
			files[`${cwd}/src/style.css`] = "div { width: calc(10px - 3px + 1em); }";
			optimizeStyles("src", { iterations: 1 });
			const result = files[`${cwd}/src/style.css`];
			assert.ok(
				result.includes("calc(7px + 1em)"),
				`Expected calc(7px + 1em), got: ${result}`,
			);
		});

		it("preserves 50% as a unit in calc with mixed units", () => {
			files[`${cwd}/src/style.css`] =
				"div { top: calc(50% - 0.53033em * 0.5 + 0.220971em * 0.5); }";
			optimizeStyles("src", { iterations: 1 });
			const result = files[`${cwd}/src/style.css`];
			assert.ok(
				result.includes("50%"),
				`Expected 50% preserved, got: ${result}`,
			);
		});

		it("preserves all-var expressions unchanged", () => {
			files[`${cwd}/src/style.css`] =
				"div { width: calc(var(--a) + var(--b)); }";
			optimizeStyles("src", { iterations: 1 });
			const result = files[`${cwd}/src/style.css`];
			assert.ok(
				result.includes("calc(var(--a) + var(--b))"),
				`Expected preserved, got: ${result}`,
			);
		});
	});

	describe("min() simplification", () => {
		it("simplifies min(10px, 20px) to 10px", () => {
			files[`${cwd}/src/style.css`] = "div { width: min(10px, 20px); }";

			optimizeStyles("src", { iterations: 1 });

			assert.ok(files[`${cwd}/src/style.css`].includes("width: 10px"));
			assert.ok(!files[`${cwd}/src/style.css`].includes("min("));
		});

		it("simplifies min(0.5em, 1em) to 0.5em", () => {
			files[`${cwd}/src/style.css`] = "div { width: min(0.5em, 1em); }";

			optimizeStyles("src", { iterations: 1 });

			assert.ok(files[`${cwd}/src/style.css`].includes("0.5em"));
			assert.ok(!files[`${cwd}/src/style.css`].includes("min("));
		});

		it("preserves min() with mixed units", () => {
			files[`${cwd}/src/style.css`] = "div { width: min(10px, 5vw); }";

			optimizeStyles("src", { iterations: 1 });

			assert.ok(
				files[`${cwd}/src/style.css`].includes("min(10px, 5vw)"),
				`Expected min preserved with mixed units`,
			);
		});

		it("preserves min() containing var()", () => {
			files[`${cwd}/src/style.css`] = "div { width: min(var(--x), 10px); }";

			optimizeStyles("src", { iterations: 1 });

			assert.ok(files[`${cwd}/src/style.css`].includes("min(var(--x)"));
		});

		it("inlines var then simplifies min", () => {
			files[`${cwd}/src/style.css`] = [
				":root { --x: 30px; }",
				"div { width: min(var(--x), 20px); }",
			].join("\n");

			optimizeStyles("src", { iterations: 1 });

			const result = files[`${cwd}/src/style.css`];
			assert.ok(
				result.includes("width: 20px"),
				`Expected "width: 20px" in result: ${result}`,
			);
		});
	});

	describe("max() simplification", () => {
		it("simplifies max(10px, 20px) to 20px", () => {
			files[`${cwd}/src/style.css`] = "div { width: max(10px, 20px); }";

			optimizeStyles("src", { iterations: 1 });

			assert.ok(files[`${cwd}/src/style.css`].includes("width: 20px"));
			assert.ok(!files[`${cwd}/src/style.css`].includes("max("));
		});
	});

	describe("clean phase", () => {
		it("removes single-use variable declarations after inlining", () => {
			files[`${cwd}/src/style.css`] = [
				":root { --color: #000; }",
				"div { color: var(--color); }",
			].join("\n");

			// iterations: 2 needed — first pass inlines (foundCount=1 so clean skips),
			// second pass sees no usage left and clean removes the declaration
			optimizeStyles("src", { iterations: 2 });

			assert.ok(
				!files[`${cwd}/src/style.css`].includes("--color: #000"),
				`Expected declaration removed, got: ${files[`${cwd}/src/style.css`]}`,
			);
		});
	});

	describe("rgb(a) to hex conversion", () => {
		it("converts rgb(0, 0, 0) to #000", () => {
			files[`${cwd}/src/style.css`] = "div { color: rgb(0, 0, 0); }";

			optimizeStyles("src", { iterations: 1 });

			assert.ok(files[`${cwd}/src/style.css`].includes("#000"));
			assert.ok(!files[`${cwd}/src/style.css`].includes("rgb("));
		});

		it("converts rgb(255, 255, 255) to #fff", () => {
			files[`${cwd}/src/style.css`] = "div { color: rgb(255, 255, 255); }";

			optimizeStyles("src", { iterations: 1 });

			assert.ok(files[`${cwd}/src/style.css`].includes("#fff"));
		});

		it("converts rgb(171, 205, 239) to #abcdef", () => {
			files[`${cwd}/src/style.css`] = "div { color: rgb(171, 205, 239); }";

			optimizeStyles("src", { iterations: 1 });

			assert.ok(files[`${cwd}/src/style.css`].includes("#abcdef"));
		});

		it("converts rgba(0, 0, 0, 0.8) to #000c", () => {
			files[`${cwd}/src/style.css`] = "div { background: rgba(0, 0, 0, 0.8); }";

			optimizeStyles("src", { iterations: 1 });

			assert.ok(files[`${cwd}/src/style.css`].includes("#000c"));
		});

		it("converts rgba(255, 0, 0, 1) to #f00 (alpha=1 stripped, then shortened)", () => {
			files[`${cwd}/src/style.css`] = "div { color: rgba(255, 0, 0, 1); }";

			optimizeStyles("src", { iterations: 1 });

			const result = files[`${cwd}/src/style.css`];
			assert.ok(
				!result.includes("ff0000ff"),
				`Alpha ff should be stripped: ${result}`,
			);
			assert.ok(result.includes("#f00"), `Expected #f00: ${result}`);
		});

		it("converts rgba(0, 0, 0, 0) to #0000", () => {
			files[`${cwd}/src/style.css`] = "div { color: rgba(0, 0, 0, 0); }";

			optimizeStyles("src", { iterations: 1 });

			assert.ok(files[`${cwd}/src/style.css`].includes("#0000"));
		});

		it("preserves rgb() containing non-numeric values", () => {
			files[`${cwd}/src/style.css`] = "div { color: rgb(var(--r), 0, 0); }";

			optimizeStyles("src", { iterations: 1 });

			assert.ok(files[`${cwd}/src/style.css`].includes("rgb(var(--r), 0, 0)"));
		});

		it("preserves rgb() with out-of-range values", () => {
			files[`${cwd}/src/style.css`] = "div { color: rgb(256, 0, 0); }";

			optimizeStyles("src", { iterations: 1 });

			assert.ok(files[`${cwd}/src/style.css`].includes("rgb(256, 0, 0)"));
		});
	});

	describe("hsl/hsla to hex conversion", () => {
		it("converts hsl(0, 100%, 50%) to #f00", () => {
			files[`${cwd}/src/style.css`] = "div { color: hsl(0, 100%, 50%); }";
			optimizeStyles("src", { iterations: 1 });
			assert.ok(files[`${cwd}/src/style.css`].includes("#f00"));
			assert.ok(!files[`${cwd}/src/style.css`].includes("hsl("));
		});

		it("converts hsl(120, 100%, 50%) to #0f0", () => {
			files[`${cwd}/src/style.css`] = "div { color: hsl(120, 100%, 50%); }";
			optimizeStyles("src", { iterations: 1 });
			assert.ok(files[`${cwd}/src/style.css`].includes("#0f0"));
		});

		it("converts hsl(120 100% 50%) modern syntax", () => {
			files[`${cwd}/src/style.css`] = "div { color: hsl(120 100% 50%); }";
			optimizeStyles("src", { iterations: 1 });
			assert.ok(files[`${cwd}/src/style.css`].includes("#0f0"));
		});

		it("converts hsl(120 100% 50% / 0.5) with alpha", () => {
			files[`${cwd}/src/style.css`] = "div { color: hsl(120 100% 50% / 0.5); }";
			optimizeStyles("src", { iterations: 1 });
			assert.ok(files[`${cwd}/src/style.css`].includes("#00ff0080"));
		});

		it("converts hsla(0, 100%, 50%, 0.5)", () => {
			files[`${cwd}/src/style.css`] = "div { color: hsla(0, 100%, 50%, 0.5); }";
			optimizeStyles("src", { iterations: 1 });
			assert.ok(files[`${cwd}/src/style.css`].includes("#ff000080"));
		});

		it("preserves hsl with var()", () => {
			files[`${cwd}/src/style.css`] =
				"div { color: hsl(var(--h), 100%, 50%); }";
			optimizeStyles("src", { iterations: 1 });
			assert.ok(
				files[`${cwd}/src/style.css`].includes("hsl(var(--h), 100%, 50%)"),
			);
		});
	});

	describe("hwb to hex conversion", () => {
		it("converts hwb(0 0% 0%) to #f00", () => {
			files[`${cwd}/src/style.css`] = "div { color: hwb(0 0% 0%); }";
			optimizeStyles("src", { iterations: 1 });
			assert.ok(files[`${cwd}/src/style.css`].includes("#f00"));
		});

		it("converts hwb(120 0% 0%) to #0f0", () => {
			files[`${cwd}/src/style.css`] = "div { color: hwb(120 0% 0%); }";
			optimizeStyles("src", { iterations: 1 });
			assert.ok(files[`${cwd}/src/style.css`].includes("#0f0"));
		});

		it("converts hwb(0 0% 0% / 0.5) with alpha", () => {
			files[`${cwd}/src/style.css`] = "div { color: hwb(0 0% 0% / 0.5); }";
			optimizeStyles("src", { iterations: 1 });
			assert.ok(files[`${cwd}/src/style.css`].includes("#ff000080"));
		});
	});

	describe("lab to hex conversion", () => {
		it("converts lab(0% 0 0) to #000", () => {
			files[`${cwd}/src/style.css`] = "div { color: lab(0% 0 0); }";
			optimizeStyles("src", { iterations: 1 });
			assert.ok(files[`${cwd}/src/style.css`].includes("#000"));
		});

		it("converts lab(100% 0 0) to #fff", () => {
			files[`${cwd}/src/style.css`] = "div { color: lab(100% 0 0); }";
			optimizeStyles("src", { iterations: 1 });
			assert.ok(files[`${cwd}/src/style.css`].includes("#fff"));
		});

		it("converts lab(50% 0 0 / 0.5) with alpha", () => {
			files[`${cwd}/src/style.css`] = "div { color: lab(50% 0 0 / 0.5); }";
			optimizeStyles("src", { iterations: 1 });
			const result = files[`${cwd}/src/style.css`];
			assert.ok(
				result.includes("/ 0.5") === false,
				`Expected alpha converted: ${result}`,
			);
			assert.ok(result.includes("#"), `Expected hex output: ${result}`);
		});
	});

	describe("lch to hex conversion", () => {
		it("converts lch(0% 0 0) to #000", () => {
			files[`${cwd}/src/style.css`] = "div { color: lch(0% 0 0); }";
			optimizeStyles("src", { iterations: 1 });
			assert.ok(files[`${cwd}/src/style.css`].includes("#000"));
		});

		it("converts lch(100% 0 0) to #fff", () => {
			files[`${cwd}/src/style.css`] = "div { color: lch(100% 0 0); }";
			optimizeStyles("src", { iterations: 1 });
			assert.ok(files[`${cwd}/src/style.css`].includes("#fff"));
		});
	});

	describe("oklab to hex conversion", () => {
		it("converts oklab(0 0 0) to #000", () => {
			files[`${cwd}/src/style.css`] = "div { color: oklab(0 0 0); }";
			optimizeStyles("src", { iterations: 1 });
			assert.ok(files[`${cwd}/src/style.css`].includes("#000"));
		});

		it("converts oklab(1 0 0) to #fff", () => {
			files[`${cwd}/src/style.css`] = "div { color: oklab(1 0 0); }";
			optimizeStyles("src", { iterations: 1 });
			assert.ok(files[`${cwd}/src/style.css`].includes("#fff"));
		});
	});

	describe("oklch to hex conversion", () => {
		it("converts oklch(0 0 0) to #000", () => {
			files[`${cwd}/src/style.css`] = "div { color: oklch(0 0 0); }";
			optimizeStyles("src", { iterations: 1 });
			assert.ok(files[`${cwd}/src/style.css`].includes("#000"));
		});

		it("converts oklch(1 0 0) to #fff", () => {
			files[`${cwd}/src/style.css`] = "div { color: oklch(1 0 0); }";
			optimizeStyles("src", { iterations: 1 });
			assert.ok(files[`${cwd}/src/style.css`].includes("#fff"));
		});

		it("preserves oklch with from keyword", () => {
			files[`${cwd}/src/style.css`] =
				"div { color: oklch(from var(--c) l c h); }";
			optimizeStyles("src", { iterations: 1 });
			assert.ok(files[`${cwd}/src/style.css`].includes("oklch(from"));
		});
	});

	describe("color() to hex conversion", () => {
		it("converts color(srgb 1 0 0) to #f00", () => {
			files[`${cwd}/src/style.css`] = "div { color: color(srgb 1 0 0); }";
			optimizeStyles("src", { iterations: 1 });
			assert.ok(files[`${cwd}/src/style.css`].includes("#f00"));
		});

		it("converts color(srgb 0 0 0) to #000", () => {
			files[`${cwd}/src/style.css`] = "div { color: color(srgb 0 0 0); }";
			optimizeStyles("src", { iterations: 1 });
			assert.ok(files[`${cwd}/src/style.css`].includes("#000"));
		});

		it("converts color(srgb 1 0 0 / 0.5) with alpha", () => {
			files[`${cwd}/src/style.css`] = "div { color: color(srgb 1 0 0 / 0.5); }";
			optimizeStyles("src", { iterations: 1 });
			assert.ok(files[`${cwd}/src/style.css`].includes("#ff000080"));
		});

		it("converts color(srgb-linear 1 0 0) to #f00", () => {
			files[`${cwd}/src/style.css`] =
				"div { color: color(srgb-linear 1 0 0); }";
			optimizeStyles("src", { iterations: 1 });
			assert.ok(files[`${cwd}/src/style.css`].includes("#f00"));
		});
	});

	describe("color-mix() to hex conversion", () => {
		it("converts color-mix(in srgb, #ff0000 50%, #0000ff) to #800080", () => {
			files[`${cwd}/src/style.css`] =
				"div { color: color-mix(in srgb, #ff0000 50%, #0000ff); }";
			optimizeStyles("src", { iterations: 1 });
			assert.ok(
				files[`${cwd}/src/style.css`].includes("#800080"),
				`Expected #800080, got: ${files[`${cwd}/src/style.css`]}`,
			);
		});

		it("converts color-mix(in srgb, red, blue) to #800080", () => {
			files[`${cwd}/src/style.css`] =
				"div { color: color-mix(in srgb, red, blue); }";
			optimizeStyles("src", { iterations: 1 });
			assert.ok(
				files[`${cwd}/src/style.css`].includes("#800080"),
				`Expected #800080, got: ${files[`${cwd}/src/style.css`]}`,
			);
		});

		it("converts color-mix(in srgb, #000000 25%, #ffffff)", () => {
			files[`${cwd}/src/style.css`] =
				"div { color: color-mix(in srgb, #000000 25%, #ffffff); }";
			optimizeStyles("src", { iterations: 1 });
			assert.ok(
				files[`${cwd}/src/style.css`].includes("#bfbfbf"),
				`Expected #bfbfbf, got: ${files[`${cwd}/src/style.css`]}`,
			);
		});

		it("preserves color-mix with var()", () => {
			files[`${cwd}/src/style.css`] =
				"div { color: color-mix(in srgb, var(--c1) 50%, var(--c2)); }";
			optimizeStyles("src", { iterations: 1 });
			assert.ok(files[`${cwd}/src/style.css`].includes("color-mix("));
		});

		it("preserves color-mix with non-srgb colorspace", () => {
			files[`${cwd}/src/style.css`] =
				"div { color: color-mix(in oklch, #ff0000 50%, #0000ff); }";
			optimizeStyles("src", { iterations: 1 });
			assert.ok(files[`${cwd}/src/style.css`].includes("color-mix("));
		});
	});

	describe("hex color shortening", () => {
		it("shortens #aabbcc to #abc", () => {
			files[`${cwd}/src/style.css`] = "div { color: #aabbcc; }";
			optimizeStyles("src", { iterations: 1 });
			assert.ok(files[`${cwd}/src/style.css`].includes("#abc"));
			assert.ok(!files[`${cwd}/src/style.css`].includes("#aabbcc"));
		});

		it("shortens #000000 to #000", () => {
			files[`${cwd}/src/style.css`] = "div { color: #000000; }";
			optimizeStyles("src", { iterations: 1 });
			assert.ok(files[`${cwd}/src/style.css`].includes("#000"));
		});

		it("shortens #00000000 to #0000", () => {
			files[`${cwd}/src/style.css`] = "div { color: #00000000; }";
			optimizeStyles("src", { iterations: 1 });
			assert.ok(files[`${cwd}/src/style.css`].includes("#0000"));
		});

		it("shortens #000000cc to #000c", () => {
			files[`${cwd}/src/style.css`] = "div { color: #000000cc; }";
			optimizeStyles("src", { iterations: 1 });
			assert.ok(files[`${cwd}/src/style.css`].includes("#000c"));
		});

		it("does NOT shorten #abcde0 (non-paired digits)", () => {
			files[`${cwd}/src/style.css`] = "div { color: #abcde0; }";
			optimizeStyles("src", { iterations: 1 });
			assert.ok(files[`${cwd}/src/style.css`].includes("#abcde0"));
		});

		it("does NOT shorten hex inside url()", () => {
			files[`${cwd}/src/style.css`] =
				"div { background: url(\"data:image/svg+xml,<svg fill='#aabbcc'/>\"); }";
			optimizeStyles("src", { iterations: 1 });
			assert.ok(
				files[`${cwd}/src/style.css`].includes("#aabbcc"),
				`Expected #aabbcc preserved in url(): ${files[`${cwd}/src/style.css`]}`,
			);
		});
	});

	describe("zero-value unit stripping", () => {
		it("strips 0px to 0", () => {
			files[`${cwd}/src/style.css`] = "div { margin: 0px; }";
			optimizeStyles("src", { iterations: 1 });
			const result = files[`${cwd}/src/style.css`];
			assert.ok(
				result.includes("margin: 0;"),
				`Expected "margin: 0;": ${result}`,
			);
		});

		it("strips 0em to 0", () => {
			files[`${cwd}/src/style.css`] = "div { padding: 0em; }";
			optimizeStyles("src", { iterations: 1 });
			assert.ok(files[`${cwd}/src/style.css`].includes("padding: 0;"));
		});

		it("strips 0rem to 0", () => {
			files[`${cwd}/src/style.css`] = "div { gap: 0rem; }";
			optimizeStyles("src", { iterations: 1 });
			assert.ok(files[`${cwd}/src/style.css`].includes("gap: 0;"));
		});

		it("strips 0vh to 0", () => {
			files[`${cwd}/src/style.css`] = "div { height: 0vh; }";
			optimizeStyles("src", { iterations: 1 });
			assert.ok(files[`${cwd}/src/style.css`].includes("height: 0;"));
		});

		it("does NOT strip 0% (used in gradients/keyframes)", () => {
			files[`${cwd}/src/style.css`] = "div { width: 0%; }";
			optimizeStyles("src", { iterations: 1 });
			assert.ok(files[`${cwd}/src/style.css`].includes("0%"));
		});

		it("does NOT strip 0s (duration)", () => {
			files[`${cwd}/src/style.css`] = "div { transition: all 0s; }";
			optimizeStyles("src", { iterations: 1 });
			assert.ok(files[`${cwd}/src/style.css`].includes("0s"));
		});

		it("does NOT strip 0deg (angle)", () => {
			files[`${cwd}/src/style.css`] = "div { transform: rotate(0deg); }";
			optimizeStyles("src", { iterations: 1 });
			assert.ok(files[`${cwd}/src/style.css`].includes("0deg"));
		});

		it("does NOT strip 0fr (grid)", () => {
			files[`${cwd}/src/style.css`] = "div { grid-template-columns: 0fr 1fr; }";
			optimizeStyles("src", { iterations: 1 });
			assert.ok(files[`${cwd}/src/style.css`].includes("0fr"));
		});

		it("handles multiple zero values in one declaration", () => {
			files[`${cwd}/src/style.css`] = "div { margin: 0px 0rem 0em 0px; }";
			optimizeStyles("src", { iterations: 1 });
			assert.ok(files[`${cwd}/src/style.css`].includes("margin: 0 0 0 0;"));
		});
	});

	describe("comment removal", () => {
		it("removes CSS block comments", () => {
			files[`${cwd}/src/style.css`] = "div { /* a comment */ color: red; }";
			optimizeStyles("src", { iterations: 1 });
			assert.ok(!files[`${cwd}/src/style.css`].includes("/*"));
			assert.ok(files[`${cwd}/src/style.css`].includes("color: red"));
		});

		it("removes multi-line comments", () => {
			files[`${cwd}/src/style.css`] =
				"div {\n/* line 1\n   line 2 */\ncolor: red;\n}";
			optimizeStyles("src", { iterations: 1 });
			assert.ok(!files[`${cwd}/src/style.css`].includes("/*"));
			assert.ok(files[`${cwd}/src/style.css`].includes("color: red"));
		});

		it("preserves comments inside url()", () => {
			files[`${cwd}/src/style.css`] =
				'div { background: url("data:image/svg+xml,/* not a comment */"); }';
			optimizeStyles("src", { iterations: 1 });
			assert.ok(files[`${cwd}/src/style.css`].includes("/* not a comment */"));
		});

		it("skips comment removal when removeComments is false", () => {
			files[`${cwd}/src/style.css`] = "div { /* keep me */ color: red; }";
			optimizeStyles("src", { iterations: 1, removeComments: false });
			assert.ok(files[`${cwd}/src/style.css`].includes("/* keep me */"));
		});
	});

	describe("empty rule removal", () => {
		it("removes empty rules", () => {
			files[`${cwd}/src/style.css`] = "div { }\np { color: red; }";
			optimizeStyles("src", { iterations: 1 });
			assert.ok(!files[`${cwd}/src/style.css`].includes("div"));
			assert.ok(files[`${cwd}/src/style.css`].includes("p { color: red; }"));
		});

		it("removes rules that become empty after comment removal", () => {
			files[`${cwd}/src/style.css`] =
				"div { /* only a comment */ }\np { color: red; }";
			optimizeStyles("src", { iterations: 1 });
			assert.ok(!files[`${cwd}/src/style.css`].includes("div"));
			assert.ok(files[`${cwd}/src/style.css`].includes("color: red"));
		});
	});

	describe("clamp() simplification", () => {
		it("simplifies clamp(10px, 20px, 30px) to 20px", () => {
			files[`${cwd}/src/style.css`] = "div { width: clamp(10px, 20px, 30px); }";
			optimizeStyles("src", { iterations: 1 });
			const result = files[`${cwd}/src/style.css`];
			assert.ok(
				result.includes("width: 20px"),
				`Expected "width: 20px": ${result}`,
			);
			assert.ok(!result.includes("clamp("));
		});

		it("clamps value to min when val < min", () => {
			files[`${cwd}/src/style.css`] = "div { width: clamp(20px, 10px, 30px); }";
			optimizeStyles("src", { iterations: 1 });
			const result = files[`${cwd}/src/style.css`];
			assert.ok(
				result.includes("width: 20px"),
				`Expected "width: 20px": ${result}`,
			);
		});

		it("clamps value to max when val > max", () => {
			files[`${cwd}/src/style.css`] = "div { width: clamp(10px, 40px, 30px); }";
			optimizeStyles("src", { iterations: 1 });
			const result = files[`${cwd}/src/style.css`];
			assert.ok(
				result.includes("width: 30px"),
				`Expected "width: 30px": ${result}`,
			);
		});

		it("preserves clamp() with mixed units", () => {
			files[`${cwd}/src/style.css`] = "div { width: clamp(10px, 5vw, 30px); }";
			optimizeStyles("src", { iterations: 1 });
			assert.ok(files[`${cwd}/src/style.css`].includes("clamp("));
		});

		it("preserves clamp() containing var()", () => {
			files[`${cwd}/src/style.css`] =
				"div { width: clamp(10px, var(--x), 30px); }";
			optimizeStyles("src", { iterations: 1 });
			assert.ok(files[`${cwd}/src/style.css`].includes("clamp("));
		});

		it("simplifies clamp with em units", () => {
			files[`${cwd}/src/style.css`] =
				"div { font-size: clamp(1em, 2em, 3em); }";
			optimizeStyles("src", { iterations: 1 });
			const result = files[`${cwd}/src/style.css`];
			assert.ok(result.includes("2em"), `Expected "2em": ${result}`);
			assert.ok(!result.includes("clamp("));
		});
	});

	describe("inherited property removal", () => {
		it("removes matching inherited declaration across files", () => {
			files[`${cwd}/src/base.css`] =
				"body { font-family: var(--font-family); }";
			files[`${cwd}/src/elements.css`] =
				"h1 { font-family: var(--font-family); }";

			optimizeStyles("src", { iterations: 1 });

			assert.ok(
				!files[`${cwd}/src/elements.css`].includes("font-family"),
				`Expected font-family removed from h1, got: ${files[`${cwd}/src/elements.css`]}`,
			);
		});

		it("preserves non-matching values", () => {
			files[`${cwd}/src/base.css`] =
				"body { font-family: var(--font-family); }";
			files[`${cwd}/src/elements.css`] =
				"h1 { font-family: var(--heading-font); }";

			optimizeStyles("src", { iterations: 1 });

			assert.ok(
				files[`${cwd}/src/elements.css`].includes(
					"font-family: var(--heading-font)",
				),
				`Expected different value preserved, got: ${files[`${cwd}/src/elements.css`]}`,
			);
		});

		it("preserves complex selectors", () => {
			files[`${cwd}/src/base.css`] = "body { color: #000; }";
			files[`${cwd}/src/style.css`] =
				".heading { color: #000; }\n[data-theme] { color: #000; }";

			optimizeStyles("src", { iterations: 1 });

			assert.ok(
				files[`${cwd}/src/style.css`].includes(".heading { color: #000; }"),
				`Expected class selector preserved, got: ${files[`${cwd}/src/style.css`]}`,
			);
			assert.ok(
				files[`${cwd}/src/style.css`].includes("[data-theme] { color: #000; }"),
				`Expected attribute selector preserved, got: ${files[`${cwd}/src/style.css`]}`,
			);
		});

		it("preserves body's own declarations", () => {
			files[`${cwd}/src/base.css`] = "body { color: #000; }";

			optimizeStyles("src", { iterations: 1 });

			assert.ok(
				files[`${cwd}/src/base.css`].includes("body { color: #000; }"),
				`Expected body declaration preserved, got: ${files[`${cwd}/src/base.css`]}`,
			);
		});

		it("preserves non-inherited properties", () => {
			files[`${cwd}/src/base.css`] = "body { margin: 0; }";
			files[`${cwd}/src/elements.css`] = "h1 { margin: 0; }";

			optimizeStyles("src", { iterations: 1 });

			assert.ok(
				files[`${cwd}/src/elements.css`].includes("margin: 0"),
				`Expected non-inherited property preserved, got: ${files[`${cwd}/src/elements.css`]}`,
			);
		});

		it("removes multiple matching properties from one selector", () => {
			files[`${cwd}/src/base.css`] =
				"body { color: #000; font-family: sans-serif; }";
			files[`${cwd}/src/elements.css`] =
				"p { color: #000; font-family: sans-serif; margin: 1em 0; }";

			optimizeStyles("src", { iterations: 1 });

			const result = files[`${cwd}/src/elements.css`];
			assert.ok(
				!result.includes("color: #000"),
				`Expected color removed, got: ${result}`,
			);
			assert.ok(
				!result.includes("font-family: sans-serif"),
				`Expected font-family removed, got: ${result}`,
			);
			assert.ok(
				result.includes("margin: 1em 0"),
				`Expected margin preserved, got: ${result}`,
			);
		});

		it("empty rule cleanup after removal", () => {
			files[`${cwd}/src/base.css`] = "body { color: #000; }";
			files[`${cwd}/src/elements.css`] = "h1 { color: #000; }";

			optimizeStyles("src", { iterations: 1 });

			const result = files[`${cwd}/src/elements.css`];
			assert.ok(
				!result.includes("h1"),
				`Expected empty rule removed, got: ${result}`,
			);
		});

		it("preserves form element declarations", () => {
			files[`${cwd}/src/base.css`] =
				"body { font-family: var(--font-family); }";
			files[`${cwd}/src/elements.css`] = [
				"input { font-family: var(--font-family); }",
				"select { font-family: var(--font-family); }",
				"textarea { font-family: var(--font-family); }",
				"button { font-family: var(--font-family); }",
			].join("\n");

			optimizeStyles("src", { iterations: 1 });

			const result = files[`${cwd}/src/elements.css`];
			assert.ok(
				result.includes("input { font-family: var(--font-family); }"),
				`Expected input preserved, got: ${result}`,
			);
			assert.ok(
				result.includes("select { font-family: var(--font-family); }"),
				`Expected select preserved, got: ${result}`,
			);
			assert.ok(
				result.includes("textarea { font-family: var(--font-family); }"),
				`Expected textarea preserved, got: ${result}`,
			);
			assert.ok(
				result.includes("button { font-family: var(--font-family); }"),
				`Expected button preserved, got: ${result}`,
			);
		});

		it("works with var() values (exact string match)", () => {
			files[`${cwd}/src/base.css`] =
				"body { line-height: var(--line-height); }";
			files[`${cwd}/src/elements.css`] =
				"p { line-height: var(--line-height); }";

			optimizeStyles("src", { iterations: 1 });

			assert.ok(
				!files[`${cwd}/src/elements.css`].includes("line-height"),
				`Expected line-height removed, got: ${files[`${cwd}/src/elements.css`]}`,
			);
		});
	});

	describe("scoped variable inlining", () => {
		it("does NOT inline a scoped assignment (preserves fallback)", () => {
			files[`${cwd}/src/style.css`] = [
				"header input { --border-color: var(--color-l5); }",
				"div { border-color: var(--border-color, currentColor); }",
			].join("\n");

			optimizeStyles("src", { iterations: 1 });

			const result = files[`${cwd}/src/style.css`];
			assert.ok(
				result.includes("var(--border-color, currentColor)"),
				`Expected fallback preserved, got: ${result}`,
			);
		});

		it("inlines a body {} assignment (global scope)", () => {
			files[`${cwd}/src/style.css`] = [
				"body { --color: #000; }",
				"div { color: var(--color); }",
			].join("\n");

			optimizeStyles("src", { iterations: 1 });

			const result = files[`${cwd}/src/style.css`];
			assert.ok(
				!result.includes("var(--color)"),
				`Expected var inlined, got: ${result}`,
			);
			assert.ok(
				result.includes("color: #000"),
				`Expected value inlined, got: ${result}`,
			);
		});

		it("does NOT inline when variable is in both :root and scoped selector", () => {
			files[`${cwd}/src/style.css`] = [
				":root { --x: 1rem; }",
				".dark { --x: 2rem; }",
				"div { width: var(--x); }",
			].join("\n");

			optimizeStyles("src", { iterations: 1 });

			const result = files[`${cwd}/src/style.css`];
			assert.ok(
				result.includes("var(--x)"),
				`Expected var preserved, got: ${result}`,
			);
		});

		it("does NOT inline same scoped value across files", () => {
			files[`${cwd}/src/a.css`] = ".card { --spacing: 1rem; }";
			files[`${cwd}/src/b.css`] =
				".card { --spacing: 1rem; }\ndiv { padding: var(--spacing, 0); }";

			optimizeStyles("src", { iterations: 1 });

			const result = files[`${cwd}/src/b.css`];
			assert.ok(
				result.includes("var(--spacing, 0)"),
				`Expected fallback preserved, got: ${result}`,
			);
		});
	});

	describe("iteration behavior", () => {
		it("resolves chained vars across iterations", () => {
			files[`${cwd}/src/style.css`] = [
				":root { --a: var(--b); --b: 42px; }",
				"div { width: var(--a); }",
			].join("\n");

			optimizeStyles("src", { iterations: 2 });

			const result = files[`${cwd}/src/style.css`];
			assert.ok(
				result.includes("42px"),
				`Expected "42px" in result: ${result}`,
			);
			assert.ok(
				!result.includes("var(--a)"),
				`Expected no var(--a) in result: ${result}`,
			);
		});
	});
});
