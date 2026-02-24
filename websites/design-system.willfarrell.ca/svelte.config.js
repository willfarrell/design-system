import { resolve } from "node:path";
import adapter from "@sveltejs/adapter-cloudflare";
//import { markdown } from 'svelte-preprocess-markdown'
// import preprocess from "svelte-preprocess";
import tardisec from "./tardisec.json" with { type: "json" };

const domain = process.env.ORIGIN ?? "design-system.willfarrell.ca";
const origin = domain;
const config = {
	kit: {
		adapter: adapter(),
		alias: {
			"@design-system": resolve("../../packages"),
			"@components": resolve("./src/components"),
			"@examples": resolve("./src/examples"),
			"@variables": resolve("./src/variables"),
			"@scripts": resolve("./src/scripts"),
			"@styles": resolve("./src/styles"),
			"@utils": resolve("../../packages/svelte/utils"),
		},
		appDir: "_",
		csp: {
			...tardisec["svelte.config.js"]["Content-Security-Policy"],
		},
		csrf: {
			trustedOrigins: [origin],
		},
		paths: {
			relative: false,
			base: process.argv.includes("dev") ? "" : process.env.BASE_PATH,
		},
		//inlineStyleThreshold: 25 * 1024,
		serviceWorker: { register: false },
	},
	preprocess: [
		//markdown(),
		// preprocess({
		//   postcss: true,
		//   preserve: ["ld+json"],
		// }),
	],
	extensions: [".svelte"],
	// compilerOptions: {
	//   cssHash: ({ hash, css }) => `s-${hash(css)}`,
	// },
	//inlineStyleThreshold: 5 * 1024,

	prerender: {
		concurrency: 5,
		crawl: true,
		entries: ["/", "/sitemap.xml"],
		handleHttpError: "warn", // 'fail'
		handleMissingId: "warn", // 'fail'
		handleEntryGeneratorMismatch: "warn", // 'fail'
		origin: process.env.ORIGIN ?? "https://design-system.willfarrell.ca",
	},

	onwarn(warning, defaultHandler) {
		// polyfill for `is` included, allow
		if (warning.code === "attribute_avoid_is") return;

		// false-positive Triggers on non-reactive "is updated, but is not declared with `$state(...)`. Changing its value will not correctly trigger updates""
		if (warning.code === "non_reactive_update") return;

		warning.message = `[${warning.code}] ${warning.message}`;
		defaultHandler(warning);
	},
};

export default config;
