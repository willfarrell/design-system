import { expect, test } from "@playwright/test";
import tardisec from "../.tardisec.json" with { type: "json" };

// request fixture is plain HTTP — bypassCSP does not apply here
test("tardisec security headers are served", async ({ request }) => {
	const response = await request.get("/");
	const headers = response.headers();

	test.skip(
		!headers["strict-transport-security"],
		"dev server — security headers are prod/preview only",
	);

	for (const [key, value] of Object.entries(tardisec.http.headers)) {
		if (!value) continue;
		// kit's csp config renders both CSP headers itself (same directives,
		// different serialization), so the middleware skips its static copies
		if (key.toLowerCase().startsWith("content-security-policy")) continue;
		expect(headers[key.toLowerCase()], key).toBe(value);
	}

	expect(headers["content-security-policy"]).toContain("default-src 'none'");
	expect(headers["content-security-policy-report-only"]).toContain(
		"'report-sha256'",
	);
});
