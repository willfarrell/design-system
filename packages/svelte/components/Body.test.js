import assert from "node:assert";
import { describe, it } from "node:test";
import { page, render } from "../render.testutil.js";

describe("BodyHeader", () => {
	const path = "./components/BodyHeader.svelte";
	it("starts with a skip link to main", async () => {
		const { body } = await render(path);
		assert.match(
			body,
			/<nav aria-label="Top menu"><a href="#main" class="skip">Skip to main content<\/a>/,
		);
	});
	it("names the menu toggle", async () => {
		const { body } = await render(path);
		assert.match(
			body,
			/<button [^>]*class="hamburger" popovertarget="nav-menu-main"><span class="visually-hidden">Main menu<\/span>/,
		);
	});
	it("renders nav links, groups and actions", async () => {
		page.url = new URL("http://localhost/docs/intro");
		const { body } = await render(path, {
			navStartLinks: {
				Docs: "/docs",
				More: { Intro: "/docs/intro" },
				"Sign out": { _action: "logout" },
			},
		});
		page.url = new URL("http://localhost/");
		assert.match(body, /<a href="\/docs" aria-current="true">Docs<\/a>/);
		assert.match(
			body,
			/<details class="chevron" open[^>]*><summary><strong>More<\/strong>/,
		);
		assert.match(
			body,
			/<form [^>]*action="\?\/logout"[^>]*><button type="submit">Sign out<\/button>/,
		);
	});
});

describe("BodyFooter", () => {
	it("renders link columns", async () => {
		const { body } = await render("./components/BodyFooter.svelte", {
			navLinks: { Product: { Docs: "/docs" } },
		});
		assert.match(body, /<nav class="grid" aria-labelledby="nav-footer-label">/);
		assert.match(body, /<strong>Product<\/strong>/);
		assert.match(body, /<a href="\/docs">Docs<\/a>/);
	});
});
