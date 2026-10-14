import assert from "node:assert/strict";
import { test } from "node:test";
import { load, open } from "../browser.testutil.js";

const options = JSON.stringify({
	challenge: "Y2hhbGxlbmdl",
	rp: { name: "test", id: "test" },
	user: { id: "AQID", name: "user", displayName: "user" },
	pubKeyCredParams: [{ alg: -7, type: "public-key" }],
});

const setup = async (outcomes) => {
	const page = await open(`
		<iframe name="sink"></iframe>
		<form is="ds-form-webauthn-create" method="post" action="/register" target="sink">
			<input type="hidden" name="credential" data-options='${options}'>
			<button>Create passkey</button><span data-loader="false"></span>
		</form>`);
	page.consoleErrors = [];
	page.on("console", (message) => {
		if (message.type() === "error") page.consoleErrors.push(message.text());
	});
	page.posts = [];
	await page.route("http://test/register", async (route) => {
		page.posts.push(route.request().postData());
		await route.fulfill({ body: "ok", contentType: "text/html" });
	});
	await page.evaluate((results) => {
		window.calls = 0;
		window.PublicKeyCredential = function PublicKeyCredential() {};
		const bytes = () => new Uint8Array([1, 2, 3]).buffer;
		Object.defineProperty(navigator, "credentials", {
			value: {
				create: async () => {
					const result = results[window.calls] ?? results.at(-1);
					window.calls += 1;
					await new Promise((resolve) => setTimeout(resolve, 20));
					if (result !== "ok") throw new DOMException("failed", result);
					return {
						id: "AQID",
						rawId: bytes(),
						type: "public-key",
						authenticatorAttachment: "platform",
						getClientExtensionResults: () => ({}),
						response: {
							clientDataJSON: bytes(),
							attestationObject: bytes(),
							getTransports: () => [],
						},
					};
				},
			},
		});
	}, outcomes);
	await load(page, "components/ds-form-webauthn-create.js");
	return page;
};

const posted = async (page) => {
	await page.waitForTimeout(150);
	return page.posts.map((body) =>
		decodeURIComponent(body.replace(/^credential=/, "").replaceAll("+", " ")),
	);
};

const loader = (page) => page.getAttribute("[data-loader]", "data-loader");

test("submitting registers a passkey and posts the credential", async () => {
	const page = await setup(["ok"]);
	await page.click("button");
	const [body] = await posted(page);
	assert.equal(JSON.parse(body).id, "AQID");
	assert.equal(await loader(page), "true");
	assert.deepEqual(page.errors, []);
});

test("a second submit while registering starts only one ceremony", async () => {
	const page = await setup(["ok"]);
	await page.evaluate(() => {
		const form = document.querySelector("form");
		form.requestSubmit();
		form.requestSubmit();
	});
	assert.equal((await posted(page)).length, 1);
	assert.equal(await page.evaluate(() => window.calls), 1);
});

test("cancelling posts nothing, logs nothing, and allows a retry", async () => {
	const page = await setup(["NotAllowedError", "ok"]);
	await page.click("button");
	assert.deepEqual(await posted(page), []);
	assert.deepEqual(page.consoleErrors, []);
	await page.click("button");
	const [body] = await posted(page);
	assert.equal(JSON.parse(body).id, "AQID");
});

test("a failed registration is posted for the server to report", async () => {
	const page = await setup(["InvalidStateError"]);
	await page.click("button");
	assert.deepEqual(await posted(page), ["InvalidStateError"]);
	assert.deepEqual(page.consoleErrors, []);
});

test("restoring the page from the back/forward cache reloads it", async () => {
	const page = await setup(["ok"]);
	await page.click("button");
	await posted(page);
	await page.evaluate(() => {
		window.restored = true;
	});
	await Promise.all([
		page.waitForEvent("load"),
		page.evaluate(() =>
			window.dispatchEvent(
				new PageTransitionEvent("pageshow", { persisted: true }),
			),
		),
	]);
	assert.equal(await page.evaluate(() => window.restored), undefined);
});
