import { defineConfig, devices } from "@playwright/test";

const baseURL = process.env.PLAYWRIGHT_BASE_URL ?? "https://localhost:4173";

export default defineConfig({
	testDir: "./tests",
	fullyParallel: true,
	forbidOnly: !!process.env.CI,
	retries: process.env.CI ? 2 : 0,
	reporter: "list",
	snapshotPathTemplate:
		"{testDir}/{testFileDir}/{testFileName}-snapshots/{arg}-{projectName}{ext}",
	ignoreSnapshots: process.platform !== "linux",
	use: {
		baseURL,
		ignoreHTTPSErrors: true,
		trace: "on-first-retry",
	},
	projects: [
		{
			name: "chromium",
			use: { ...devices["Desktop Chrome"] },
		},
		{
			name: "firefox",
			use: { ...devices["Desktop Firefox"] },
		},
		{
			name: "webkit",
			use: { ...devices["Desktop Safari"] },
		},
	],
	webServer: process.env.PLAYWRIGHT_BASE_URL
		? undefined
		: {
				command: "npm run build && npx vite preview --strictPort",
				url: baseURL,
				ignoreHTTPSErrors: true,
				reuseExistingServer: !process.env.CI,
				timeout: 300_000,
			},
});
