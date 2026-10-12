import assert from "node:assert";
import { describe, it } from "node:test";
import { render } from "../test-render.js";

const path = "./components/ItemList.svelte";
const menu = [{ href: "/edit", label: "Edit" }];

describe("ItemList", () => {
	it("uses item.id for the menu id", async () => {
		const { body } = await render(path, {
			items: [{ id: "a", label: "A", href: "/a", menu }],
		});
		assert.match(body, /id="a-menu"/);
	});

	it("gives menus unique ids when item.id is missing", async () => {
		const { body } = await render(path, {
			items: [
				{ label: "A", href: "/a", menu },
				{ label: "B", href: "/b", menu },
			],
		});
		const ids = [...body.matchAll(/id="([^"]*-menu)"/g)].map(([, id]) => id);
		assert.strictEqual(ids.length, 2);
		assert.notStrictEqual(ids[0], ids[1]);
		assert.doesNotMatch(body, /undefined/);
	});
});
