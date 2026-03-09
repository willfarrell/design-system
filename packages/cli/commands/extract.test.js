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

const vanillaPath = "/mock/node_modules/@willfarrell-ds/vanilla";
const mockGetModuleDir = () => vanillaPath;

mock.module("node:fs", {
	namedExports: {
		readFileSync: mockReadFileSync,
		writeFileSync: (path, data) => {
			files[path] = data;
		},
		existsSync: (path) => path in files,
		mkdirSync: () => {},
		readdirSync: () => [],
	},
});

mock.module("../lib/fs.js", {
	namedExports: {
		walkDirSync: mockWalkDirSync,
		saveFileSync: mockSaveFileSync,
		getModuleDir: mockGetModuleDir,
	},
});

const { default: extract } = await import("./extract.js");

const cwd = process.cwd();

const runExtract = (htmlFiles, jsFiles, cssFiles) => {
	for (const [name, content] of Object.entries(htmlFiles ?? {})) {
		files[`${cwd}/build/${name}`] = content;
	}
	for (const [name, content] of Object.entries(jsFiles ?? {})) {
		files[`${cwd}/build/${name}`] = content;
	}
	for (const cssPath of cssFiles ?? []) {
		files[`${vanillaPath}/${cssPath}`] = "";
	}
	const outputDir = `${cwd}/build/css`;
	extract({ inputDir: "build", outputDir, theme: "./theme.css" });
	return {
		app: files[`${outputDir}/app.css`],
		above: files[`${outputDir}/above.css`],
		below: files[`${outputDir}/below.css`],
	};
};

beforeEach(() => {
	files = {};
});

describe("extract", () => {
	describe("tag extraction", () => {
		it("extracts basic HTML tags", () => {
			const { app } = runExtract(
				{ "index.html": "<div><p>hello</p><span>world</span></div>" },
				{},
				["elements/div.css", "elements/p.css", "elements/span.css"],
			);
			assert.ok(app.includes("elements/div.css"));
			assert.ok(app.includes("elements/p.css"));
			assert.ok(app.includes("elements/span.css"));
		});

		it("extracts self-closing tags", () => {
			const { app } = runExtract(
				{ "index.html": '<br><hr><img src="test.png">' },
				{},
				["elements/br.css", "elements/hr.css", "elements/img.css"],
			);
			assert.ok(app.includes("elements/br.css"));
			assert.ok(app.includes("elements/hr.css"));
			assert.ok(app.includes("elements/img.css"));
		});

		it("extracts input[type=...] variants", () => {
			const { app } = runExtract(
				{
					"index.html": '<input type="email"><input type="checkbox">',
				},
				{},
				[
					"elements/input.css",
					"elements/input[type=email].css",
					"elements/input[type=checkbox].css",
				],
			);
			assert.ok(app.includes("elements/input.css"));
			assert.ok(app.includes("elements/input[type=email].css"));
			assert.ok(app.includes("elements/input[type=checkbox].css"));
		});
	});

	describe("class extraction", () => {
		it("extracts classes as .className and tag.className", () => {
			const { app } = runExtract(
				{ "index.html": '<div class="container"></div>' },
				{},
				[
					"elements/div.css",
					"classes/.container.css",
					"classes/div.container.css",
				],
			);
			assert.ok(app.includes("classes/.container.css"));
		});

		it("handles multiple classes on one element", () => {
			const { app } = runExtract(
				{ "index.html": '<div class="foo bar"></div>' },
				{},
				["elements/div.css", "classes/.foo.css", "classes/.bar.css"],
			);
			assert.ok(app.includes("classes/.foo.css"));
			assert.ok(app.includes("classes/.bar.css"));
		});
	});

	describe("role extraction", () => {
		it("extracts role=alert", () => {
			const { app } = runExtract(
				{ "index.html": '<section role="alert"></section>' },
				{},
				["elements/section.css", "classes/section[role=alert].css"],
			);
			assert.ok(app.includes("classes/section[role=alert].css"));
		});
	});

	describe("aria extraction", () => {
		it("extracts aside[aria-labelledby^=callout-]", () => {
			const { app } = runExtract(
				{ "index.html": '<aside aria-labelledby="callout-info"></aside>' },
				{},
				["elements/aside.css", "classes/aside[aria-labelledby^=callout-].css"],
			);
			assert.ok(app.includes("classes/aside[aria-labelledby^=callout-].css"));
		});
	});

	describe("PEWC extraction", () => {
		it('extracts is="ds-component" attributes', () => {
			const { app } = runExtract(
				{ "index.html": '<form is="ds-form-submit"></form>' },
				{},
				["elements/form.css", "components/ds-form-submit.css"],
			);
			assert.ok(app.includes("components/ds-form-submit.css"));
		});
	});

	describe("file scanning", () => {
		it("scans .html files in directory", () => {
			const { app } = runExtract({ "index.html": "<div></div>" }, {}, [
				"elements/div.css",
			]);
			assert.ok(app.includes("elements/div.css"));
		});

		it("scans .js files in directory", () => {
			const { app } = runExtract(
				{},
				{ "chunk.js": '$$renderer.push(`<footer class="site-footer">`);' },
				["elements/footer.css"],
			);
			assert.ok(app.includes("elements/footer.css"));
		});

		it("combines results from both .html and .js files", () => {
			const { app } = runExtract(
				{ "index.html": "<header><nav>menu</nav></header>" },
				{
					"chunk.js":
						'$$renderer.push(`<footer><div class="container"></div></footer>`);',
				},
				[
					"elements/header.css",
					"elements/nav.css",
					"elements/footer.css",
					"elements/div.css",
					"classes/.container.css",
				],
			);
			assert.ok(
				app.includes("elements/header.css"),
				"Should include header from HTML",
			);
			assert.ok(
				app.includes("elements/footer.css"),
				"Should include footer from JS",
			);
			assert.ok(
				app.includes("classes/.container.css"),
				"Should include container class from JS",
			);
		});

		it("extracts tags from Svelte SSR output", () => {
			const { app } = runExtract(
				{},
				{
					"chunk.js": [
						'$$renderer.push(`<footer class="site-footer">`);',
						'$$renderer.push(`<div class="container">`);',
					].join("\n"),
				},
				["elements/footer.css", "elements/div.css"],
			);
			assert.ok(app.includes("elements/footer.css"));
			assert.ok(app.includes("elements/div.css"));
		});

		it("extracts classes from Svelte 5 SSR JS object syntax", () => {
			const { app } = runExtract(
				{},
				{
					"chunk.js": '{ id: "main", class: "container-slices" }',
				},
				["classes/.container-slices.css"],
			);
			assert.ok(
				app.includes("classes/.container-slices.css"),
				"should extract class from JS object syntax",
			);
		});

		it("resolves tag-qualified class files from JS object syntax", () => {
			const { app } = runExtract(
				{ "index.html": '<a href="#">link</a>' },
				{
					"chunk.js": '{ class: "skip" }',
				},
				["elements/a.css", "classes/a.skip.css"],
			);
			assert.ok(
				app.includes("classes/a.skip.css"),
				"should resolve a.skip.css from .skip class + a tag",
			);
		});

		it("extracts is attribute from Svelte 5 SSR JS object syntax", () => {
			const { app } = runExtract(
				{},
				{
					"chunk.js": '{ is: "ds-card" }',
				},
				["components/ds-card.css"],
			);
			assert.ok(
				app.includes("components/ds-card.css"),
				"should extract is from JS object syntax",
			);
		});
	});

	describe("CSS generation", () => {
		it("includes base.css and media.css imports always", () => {
			const { app } = runExtract({ "index.html": "<div></div>" }, {}, []);
			assert.ok(app.includes("layers/base.css"));
			assert.ok(app.includes("layers/media.css"));
		});

		it("includes vanilla theme and custom theme imports", () => {
			const { app } = runExtract({ "index.html": "<div></div>" }, {}, []);
			assert.ok(
				app.includes("vanilla/theme.css"),
				"should include vanilla theme",
			);
			assert.ok(app.includes("./theme.css"), "should include custom theme");
		});

		it("skips imports when CSS file doesn't exist", () => {
			// Don't register elements/div.css in mock filesystem
			const { app } = runExtract({ "index.html": "<div></div>" }, {}, []);
			assert.ok(!app.includes("elements/div.css"));
		});

		it("sorts imports alphabetically within each section", () => {
			const { app } = runExtract(
				{ "index.html": "<p></p><a></a><div></div>" },
				{},
				["elements/p.css", "elements/a.css", "elements/div.css"],
			);
			const aIdx = app.indexOf("elements/a.css");
			const divIdx = app.indexOf("elements/div.css");
			const pIdx = app.indexOf("elements/p.css");
			assert.ok(aIdx < divIdx, "a.css should come before div.css");
			assert.ok(divIdx < pIdx, "div.css should come before p.css");
		});

		it("includes element CSS imports for found tags", () => {
			const { app } = runExtract({ "index.html": "<p>text</p>" }, {}, [
				"elements/p.css",
			]);
			assert.ok(app.includes("elements/p.css"));
		});

		it("includes class CSS imports for found classes", () => {
			const { app } = runExtract(
				{ "index.html": '<div class="icon"></div>' },
				{},
				["elements/div.css", "classes/.icon.css"],
			);
			assert.ok(app.includes("classes/.icon.css"));
		});

		it("includes role CSS imports for found roles", () => {
			const { app } = runExtract(
				{ "index.html": '<section role="alert"></section>' },
				{},
				["elements/section.css", "classes/section[role=alert].css"],
			);
			assert.ok(app.includes("classes/section[role=alert].css"));
		});

		it("includes aria CSS imports for found aria attributes", () => {
			const { app } = runExtract(
				{ "index.html": '<aside aria-labelledby="callout-info"></aside>' },
				{},
				["elements/aside.css", "classes/aside[aria-labelledby^=callout-].css"],
			);
			assert.ok(app.includes("classes/aside[aria-labelledby^=callout-].css"));
		});

		it("includes component CSS imports for found PEWC", () => {
			const { app } = runExtract(
				{ "index.html": '<form is="ds-task"></form>' },
				{},
				["elements/form.css", "components/ds-task.css"],
			);
			assert.ok(app.includes("components/ds-task.css"));
		});
	});

	describe("above/below splitting", () => {
		it("above.css contains only whitelisted discovered imports", () => {
			const { above } = runExtract(
				{
					"index.html": "<nav>menu</nav><table><tr><td>data</td></tr></table>",
				},
				{},
				[
					"elements/nav.css",
					"elements/table.css",
					"elements/tr.css",
					"elements/td.css",
				],
			);
			assert.ok(
				above.includes("elements/nav.css"),
				"above should include whitelisted nav",
			);
			assert.ok(
				!above.includes("elements/table.css"),
				"above should not include non-whitelisted table",
			);
		});

		it("above.css omits whitelisted items not discovered", () => {
			// nav is whitelisted but not in HTML, so should not appear in above.css
			const { above } = runExtract({ "index.html": "<div></div>" }, {}, [
				"elements/div.css",
			]);
			assert.ok(
				!above.includes("elements/nav.css"),
				"above should not include undiscovered whitelisted items",
			);
		});

		it("below.css contains non-whitelisted imports", () => {
			const { below } = runExtract(
				{
					"index.html": "<nav>menu</nav><table><tr><td>data</td></tr></table>",
				},
				{},
				[
					"elements/nav.css",
					"elements/table.css",
					"elements/tr.css",
					"elements/td.css",
				],
			);
			assert.ok(
				below.includes("elements/table.css"),
				"below should include non-whitelisted table",
			);
			assert.ok(
				!below.includes("elements/nav.css"),
				"below should not include whitelisted nav",
			);
		});

		it("app.css contains all imports", () => {
			const { app } = runExtract(
				{
					"index.html": "<nav>menu</nav><table><tr><td>data</td></tr></table>",
				},
				{},
				[
					"elements/nav.css",
					"elements/table.css",
					"elements/tr.css",
					"elements/td.css",
				],
			);
			assert.ok(app.includes("elements/nav.css"), "app should include nav");
			assert.ok(app.includes("elements/table.css"), "app should include table");
		});

		it("layers/base.css and layers/media.css go to above.css", () => {
			const { above } = runExtract({ "index.html": "<div></div>" }, {}, [
				"elements/div.css",
			]);
			assert.ok(
				above.includes("layers/base.css"),
				"above should include layers/base.css",
			);
			assert.ok(
				above.includes("layers/media.css"),
				"above should include layers/media.css",
			);
		});

		it("theme imports appear in above.css and app.css only", () => {
			const { app, above, below } = runExtract(
				{ "index.html": "<div></div><nav></nav>" },
				{},
				["elements/div.css", "elements/nav.css"],
			);
			assert.ok(
				app.includes("vanilla/theme.css"),
				"app should include vanilla theme",
			);
			assert.ok(app.includes("./theme.css"), "app should include custom theme");
			assert.ok(
				above.includes("vanilla/theme.css"),
				"above should include vanilla theme",
			);
			assert.ok(
				above.includes("./theme.css"),
				"above should include custom theme",
			);
			assert.ok(
				!below.includes("./theme.css"),
				"below should not include theme",
			);
		});
	});

	describe("multiple directories", () => {
		it("combines results from multiple input directories", () => {
			files[`${cwd}/dir-a/index.html`] = "<nav>menu</nav>";
			files[`${cwd}/dir-b/index.html`] =
				'<a href="/docs" class="button">Go</a>';
			files[`${vanillaPath}/elements/nav.css`] = "";
			files[`${vanillaPath}/elements/a.css`] = "";
			files[`${vanillaPath}/classes/a.button.css`] = "";

			const outputDir = `${cwd}/out/css`;
			extract({
				inputDir: ["dir-a", "dir-b"],
				outputDir,
				theme: "./theme.css",
			});

			const app = files[`${outputDir}/app.css`];
			assert.ok(
				app.includes("elements/nav.css"),
				"should include nav from dir-a",
			);
			assert.ok(app.includes("elements/a.css"), "should include a from dir-b");
			assert.ok(
				app.includes("classes/a.button.css"),
				"should include a.button from dir-b",
			);
		});

		it("single string dir still works", () => {
			files[`${cwd}/build/index.html`] = "<div></div>";
			files[`${vanillaPath}/elements/div.css`] = "";

			const outputDir = `${cwd}/build/css`;
			extract({ inputDir: "build", outputDir, theme: "./theme.css" });

			assert.ok(files[`${outputDir}/app.css`].includes("elements/div.css"));
		});
	});

	describe("integration", () => {
		it("saves CSS files when outputDir option provided", () => {
			files[`${cwd}/build/index.html`] = "<div></div>";
			const outputDir = `${cwd}/build/css`;

			extract({
				inputDir: "build",
				outputDir,
				theme: "./theme.css",
			});

			assert.ok(files[`${outputDir}/app.css`]);
			assert.ok(files[`${outputDir}/app.css`].includes("base.css"));
			assert.ok(files[`${outputDir}/above.css`]);
			assert.ok(files[`${outputDir}/below.css`] !== undefined);
		});

		it("does not save when outputDir not provided", () => {
			files[`${cwd}/build/index.html`] = "<div></div>";

			extract({ inputDir: "build" });

			const cssFiles = Object.keys(files).filter((k) => k.endsWith("app.css"));
			assert.strictEqual(cssFiles.length, 0);
		});
	});
});
