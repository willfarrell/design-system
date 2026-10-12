import { expect, test } from "@playwright/test";

test("sitemap lists every static page route", async ({ request }) => {
	const response = await request.get("/sitemap.xml");
	expect(response.status()).toBe(200);
	const body = await response.text();
	const locs = [...body.matchAll(/<loc>([^<]+)<\/loc>/g)].map(
		([, loc]) => new URL(loc).pathname,
	);
	expect(locs).toContain("/");
	expect(locs).toContain("/component/badge");
	expect(locs).toContain("/form/input-text");
	expect(locs).toContain("/layout/article");
	expect(locs.some((loc) => /[([]/.test(loc))).toBe(false);
	for (const loc of ["/", "/component/badge", "/form/input-text"]) {
		const page = await request.get(loc);
		expect(page.status(), loc).toBe(200);
	}
});
