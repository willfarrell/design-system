import assert from "node:assert/strict";
import { test } from "node:test";
import { load, open } from "../test-browser.js";

const options = JSON.stringify({
	challenge: "Y2hhbGxlbmdl",
	allowCredentials: [],
	rp: { name: "test", id: "test" },
	user: { id: "AQID", name: "user", displayName: "user" },
	pubKeyCredParams: [{ alg: -7, type: "public-key" }],
});

const setup = async (is, autocomplete) => {
	const page = await open(`
		<iframe name="sink"></iframe>
		<form method="post" action="/login" target="sink">
			<input type="hidden" is="${is}" name="credential" ${autocomplete ? `autocomplete="${autocomplete}"` : ""} data-options='${options}'>
			<button>Sign in</button>
		</form>`);
	page.consoleErrors = [];
	page.on("console", (message) => {
		if (message.type() === "error") page.consoleErrors.push(message.text());
	});
	page.posts = [];
	await page.route("http://test/login", async (route) => {
		page.posts.push(route.request().postData());
		await route.fulfill({ body: "ok", contentType: "text/html" });
	});
	await page.evaluate(() => {
		window.calls = [];
		window.PublicKeyCredential = function PublicKeyCredential() {};
		window.PublicKeyCredential.isConditionalMediationAvailable = async () =>
			true;
		const bytes = () => new Uint8Array([1, 2, 3]).buffer;
		const credential = () => ({
			id: "AQID",
			rawId: bytes(),
			type: "public-key",
			authenticatorAttachment: "platform",
			getClientExtensionResults: () => ({}),
			response: {
				authenticatorData: bytes(),
				clientDataJSON: bytes(),
				signature: bytes(),
				userHandle: bytes(),
				attestationObject: bytes(),
				getTransports: () => [],
			},
		});
		Object.defineProperty(navigator, "credentials", {
			value: {
				create: () => {
					window.calls.push("create");
					return Promise.resolve(credential());
				},
				get: (request) => {
					window.calls.push(request.mediation ?? "modal");
					if (request.mediation === "conditional") {
						return new Promise((_, reject) => {
							request.signal.addEventListener("abort", () =>
								reject(new DOMException("aborted", "AbortError")),
							);
						});
					}
					return Promise.resolve(credential());
				},
			},
		});
	});
	await load(page, `components/${is}.js`);
	await page.waitForTimeout(50);
	return page;
};

const posted = async (page) => {
	await page.waitForTimeout(150);
	return page.posts.map((body) =>
		decodeURIComponent(body.replace(/^credential=/, "").replaceAll("+", " ")),
	);
};

test("ds-input-webauthn-get without autocomplete upgrades without errors", async () => {
	const page = await setup("ds-input-webauthn-get");
	assert.deepEqual(page.errors, []);
	assert.deepEqual(page.consoleErrors, []);
	assert.deepEqual(await page.evaluate(() => window.calls), []);
});

test("ds-input-webauthn-get with autocomplete webauthn upgrades into conditional mediation", async () => {
	const page = await setup("ds-input-webauthn-get", "webauthn");
	assert.deepEqual(page.errors, []);
	assert.deepEqual(page.consoleErrors, []);
	assert.deepEqual(await page.evaluate(() => window.calls), ["conditional"]);
});

test("ds-input-webauthn-get submitting posts the credential", async () => {
	const page = await setup("ds-input-webauthn-get", "webauthn");
	await page.click("button");
	const [body] = await posted(page);
	assert.equal(JSON.parse(body).id, "AQID");
	assert.deepEqual(page.errors, []);
});

test("ds-input-webauthn-create upgrades without errors", async () => {
	const page = await setup("ds-input-webauthn-create");
	assert.deepEqual(page.errors, []);
	assert.deepEqual(page.consoleErrors, []);
	assert.deepEqual(await page.evaluate(() => window.calls), []);
});

test("ds-input-webauthn-create submitting posts the credential", async () => {
	const page = await setup("ds-input-webauthn-create");
	await page.click("button");
	const [body] = await posted(page);
	assert.equal(JSON.parse(body).id, "AQID");
	assert.deepEqual(page.errors, []);
});
