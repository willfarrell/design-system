import { expect, test } from "@playwright/test";

test("unknown demo component responds 404", async ({ request }) => {
	const response = await request.get("/demo/does-not-exist");
	expect(response.status()).toBe(404);
	expect(await response.text()).not.toContain("TODO");
});

test("known demo component responds 200", async ({ request }) => {
	const response = await request.get("/demo/badge");
	expect(response.status()).toBe(200);
});

test("security.txt is current and canonical", async ({ request }) => {
	const response = await request.get("/.well-known/security.txt");
	expect(response.status()).toBe(200);
	const body = await response.text();
	const expires = body.match(/^Expires: (.+)$/m)?.[1];
	expect(Date.parse(expires)).toBeGreaterThan(Date.now());
	expect(body).toMatch(
		/^Canonical: https:\/\/[^/]+\/\.well-known\/security\.txt$/m,
	);
	for (const [, url] of body.matchAll(/^Encryption: (.+)$/gm)) {
		const key = await request.get(new URL(url).pathname);
		expect(key.status(), url).toBe(200);
	}
});
