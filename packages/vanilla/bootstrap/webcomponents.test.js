import assert from "node:assert/strict";
import { test } from "node:test";
import { load, open } from "../test-browser.js";

const setup = async (body) => {
	const page = await open(body, {
		files: { "/js/pewc/ds-ok.js": "window.loaded = true;" },
	});
	page.requested = [];
	page.on("request", (request) => page.requested.push(request.url()));
	await load(page, "bootstrap/webcomponents.js");
	await page.waitForTimeout(100);
	return page;
};

test("a valid is attribute loads its component", async () => {
	const page = await setup(`<span is="ds-ok" hidden></span>`);
	assert.equal(await page.evaluate(() => window.loaded), true);
	assert.deepEqual(page.errors, []);
});

for (const name of ['ds-x"],a', "../../evil", "DS-Upper", "ds ok"]) {
	test(`an invalid is attribute (${name}) is ignored`, async () => {
		const page = await setup(
			`<span is='${name}' hidden></span><span is="ds-ok" hidden></span>`,
		);
		assert.deepEqual(page.errors, []);
		assert.deepEqual(
			page.requested.filter(
				(url) => url.includes("/js/pewc/") && !url.endsWith("/ds-ok.js"),
			),
			[],
		);
		assert.equal(await page.evaluate(() => window.loaded), true);
	});
}

for (const [label, sortable, task] of [
	[
		"hashed",
		"/assets/ds-task-sortable-AbCd1234.js",
		"/assets/ds-task-Xy_w5-78.js",
	],
	["unhashed", "/x/ds-task-sortable.js", "/x/ds-task.js"],
]) {
	test(`a preload for a longer name is not mistaken for the component (${label})`, async () => {
		const page = await open(
			`<link rel="modulepreload" href="${sortable}"><link rel="modulepreload" href="${task}"><ul><li is="ds-task" hidden></li></ul>`,
			{
				files: {
					[sortable]: "window.loaded = [...(window.loaded ?? []), 'sortable'];",
					[task]: "window.loaded = [...(window.loaded ?? []), 'task'];",
				},
			},
		);
		await load(page, "bootstrap/webcomponents.js");
		await page.waitForTimeout(100);
		assert.deepEqual(await page.evaluate(() => window.loaded), ["task"]);
	});
}

test("an unhashed preload of a longer name is not mistaken for a hashed component", async () => {
	const page = await open(
		`<link rel="modulepreload" href="/x/ds-task-sortable.js"><ul><li is="ds-task" hidden></li></ul>`,
		{
			files: {
				"/x/ds-task-sortable.js":
					"window.loaded = [...(window.loaded ?? []), 'sortable'];",
				"/js/pewc/ds-task.js":
					"window.loaded = [...(window.loaded ?? []), 'task'];",
			},
		},
	);
	await load(page, "bootstrap/webcomponents.js");
	await page.waitForTimeout(100);
	assert.deepEqual(await page.evaluate(() => window.loaded), ["task"]);
});

test("a hashed preload is used for its component", async () => {
	const page = await open(
		`<link rel="modulepreload" href="/assets/ds-task-C_xhxLBw.js"><ul><li is="ds-task" hidden></li></ul>`,
		{
			files: {
				"/assets/ds-task-C_xhxLBw.js":
					"window.loaded = [...(window.loaded ?? []), 'hashed'];",
				"/js/pewc/ds-task.js":
					"window.loaded = [...(window.loaded ?? []), 'fallback'];",
			},
		},
	);
	await load(page, "bootstrap/webcomponents.js");
	await page.waitForTimeout(100);
	assert.deepEqual(await page.evaluate(() => window.loaded), ["hashed"]);
});
