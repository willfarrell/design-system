import assert from "node:assert";
import { describe, it } from "node:test";
import { render } from "../test-render.js";

describe("InputWebAuthnCreate", () => {
	it("upgrades to ds-input-webauthn-create", async () => {
		const { body, head } = await render(
			"./components/InputWebAuthnCreate.svelte",
			{ name: "credential" },
		);
		assert.match(body, /<input[^>]* is="ds-input-webauthn-create"/);
		assert.match(
			head,
			/<link rel="modulepreload" href="[^"]*ds-input-webauthn-create\.js"/,
		);
	});
});

describe("InputWebAuthnGet", () => {
	it("upgrades to ds-input-webauthn-get", async () => {
		const { body, head } = await render(
			"./components/InputWebAuthnGet.svelte",
			{
				name: "credential",
			},
		);
		assert.match(body, /<input[^>]* is="ds-input-webauthn-get"/);
		assert.match(body, /autocomplete="webauthn"/);
		assert.match(
			head,
			/<link rel="modulepreload" href="[^"]*ds-input-webauthn-get\.js"/,
		);
	});
});
