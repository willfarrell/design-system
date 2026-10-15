import assert from "node:assert/strict";
import { test } from "node:test";
import { load, open } from "../browser.testutil.js";

const setup = async (head = "") => {
	const page = await open(head);
	page.warnings = [];
	page.on("console", (message) => {
		if (["warning", "error"].includes(message.type())) {
			page.warnings.push(message.text());
		}
	});
	await page.evaluate(() => {
		window.registered = [];
		const listeners = [];
		Object.defineProperty(navigator, "serviceWorker", {
			value: {
				register: async (url, options) => {
					window.registered.push([String(url), options.scope]);
					return { active: {} };
				},
				addEventListener: (type, listener) => listeners.push(listener),
			},
		});
		window.messageWorker = (data) =>
			Promise.all(
				listeners.map((listener) =>
					listener(
						new MessageEvent("message", { data, origin: location.origin }),
					),
				),
			);
	});
	await load(page, "bootstrap/serviceworker.js");
	await page.evaluate(() => window.dispatchEvent(new Event("load")));
	await page.waitForTimeout(50);
	return page;
};

test("registers the linked service worker at the root scope", async () => {
	const page = await setup(`<link rel="modulepreload" href="/sw-AbCd1234.js">`);
	assert.deepEqual(await page.evaluate(() => window.registered), [
		["http://test/sw-AbCd1234.js", "/"],
	]);
});

test("falls back to /service-worker.js", async () => {
	const page = await setup();
	assert.deepEqual(await page.evaluate(() => window.registered), [
		["http://test/service-worker.js", "/"],
	]);
});

test("messages from the service worker do not warn", async () => {
	const page = await setup();
	await page.evaluate(() => window.messageWorker({ type: "cached" }));
	assert.deepEqual(page.warnings, []);
	assert.deepEqual(page.errors, []);
});
