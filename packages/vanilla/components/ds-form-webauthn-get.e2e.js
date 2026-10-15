import assert from "node:assert/strict";
import { test } from "node:test";
import { load, open } from "../browser.testutil.js";

const options = JSON.stringify({
	challenge: "Y2hhbGxlbmdl",
	allowCredentials: [],
});

const setup = async (autocomplete, outcome, { inside = "" } = {}) => {
	const page = await open(`
		<iframe name="sink"></iframe>
		<form is="ds-form-webauthn-get" method="post" action="/login" target="sink">
			${inside}
			<input type="hidden" name="credential" ${autocomplete ? `autocomplete="${autocomplete}"` : ""} data-options='${options}'>
			<button>Sign in</button>
		</form>`);
	page.posts = [];
	await page.route("http://test/login", async (route) => {
		page.posts.push(route.request().postData());
		await route.fulfill({ body: "ok", contentType: "text/html" });
	});
	await page.evaluate((result) => {
		window.calls = [];
		window.PublicKeyCredential = function PublicKeyCredential() {};
		window.PublicKeyCredential.isConditionalMediationAvailable = async () =>
			true;
		const bytes = () => new Uint8Array([1, 2, 3]).buffer;
		Object.defineProperty(navigator, "credentials", {
			value: {
				get: (request) => {
					window.calls.push(request.mediation ?? "modal");
					if (request.mediation === "conditional") {
						return new Promise((_, reject) => {
							request.signal.addEventListener("abort", () =>
								reject(new DOMException("aborted", "AbortError")),
							);
						});
					}
					if (result !== "ok") {
						return Promise.reject(new DOMException("failed", result));
					}
					return Promise.resolve({
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
						},
					});
				},
			},
		});
	}, outcome);
	await load(page, "components/ds-form-webauthn-get.js");
	return page;
};

const posted = async (page) => {
	await page.waitForTimeout(150);
	return page.posts.map((body) =>
		decodeURIComponent(body.replace(/^credential=/, "").replaceAll("+", " ")),
	);
};

test("an input without autocomplete loads without throwing", async () => {
	const page = await setup(undefined, "ok");
	assert.deepEqual(page.errors, []);
	assert.deepEqual(await page.evaluate(() => window.calls), []);
});

test("autocomplete webauthn starts conditional mediation, not a modal", async () => {
	const page = await setup("webauthn", "ok");
	await page.waitForTimeout(50);
	assert.deepEqual(await page.evaluate(() => window.calls), ["conditional"]);
	assert.deepEqual(await posted(page), []);
});

test("submitting authenticates and posts the credential", async () => {
	const page = await setup("webauthn", "ok");
	await page.click("button");
	const [body] = await posted(page);
	assert.equal(JSON.parse(body).id, "AQID");
	assert.deepEqual(page.errors, []);
});

test("cancelling the prompt posts nothing", async () => {
	const page = await setup(undefined, "NotAllowedError");
	await page.click("button");
	assert.deepEqual(await posted(page), []);
});

test("a failed authentication is posted for the server to report", async () => {
	const page = await setup(undefined, "InvalidStateError");
	await page.click("button");
	assert.deepEqual(await posted(page), ["InvalidStateError"]);
});

test("a replayed assertion under the same name is dropped before posting", async () => {
	const page = await setup(undefined, "ok", {
		inside: '<input type="hidden" name="credential" value="stale">',
	});
	await page.click("button");
	const [body] = await posted(page);
	assert.equal(JSON.parse(body).id, "AQID");
});
