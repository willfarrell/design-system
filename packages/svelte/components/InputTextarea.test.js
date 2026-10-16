import assert from "node:assert";
import { describe, it } from "node:test";
import { render } from "../render.testutil.js";

const path = "./components/InputTextarea.svelte";

describe("InputTextarea", () => {
	it("ignores errors for other fields", async () => {
		const { body } = await render(path, {
			id: "bio",
			label: "Bio",
			error: [{ id: "email", message: "Required" }],
		});
		assert.doesNotMatch(body, /aria-invalid/);
		assert.doesNotMatch(body, /aria-describedby/);
	});

	it("marks invalid and describes by its own error and hint", async () => {
		const { body } = await render(path, {
			id: "bio",
			label: "Bio",
			hint: "Short",
			error: [{ id: "bio", message: "Required" }],
		});
		assert.match(body, /<textarea[^>]* aria-describedby="bio-hint bio-error"/);
		assert.match(body, /<textarea[^>]* aria-invalid="true"/);
	});
});
