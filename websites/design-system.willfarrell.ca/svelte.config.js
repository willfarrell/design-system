import { resolve } from "node:path";
import adapter from "@sveltejs/adapter-cloudflare";
import tardisec from "./.tardisec.sveltekit.json" with { type: "json" };
import pkg from "./package.json" with { type: "json" };

const domain = process.env.DOMAIN ?? pkg.name;
const origin = `https://${domain}`;
const config = {
	kit: {
		adapter: adapter({ platformProxy: { persist: false } }),
		alias: {
			"@design-system": resolve("../../packages/svelte"),
			"@components": resolve("./src/components"),
			"@hooks": resolve("./src/hooks"),
			"@scripts": resolve("./src/scripts"),
			"@styles": resolve("./src/styles"),
			"@examples": resolve("./src/examples"),
		},
		appDir: "_",
		csp: tardisec.kit.csp,
		csrf: {
			trustedOrigins: [origin],
		},
		paths: {
			relative: false,
			base: process.argv.includes("dev") ? "" : process.env.BASE_PATH,
		},
		//inlineStyleThreshold: 25 * 1024,
		serviceWorker: { register: false },
		prerender: {
			concurrency: 5,
			crawl: true,
			entries: ["/", "/sitemap.xml"],
			handleHttpError: "warn", // 'fail'
			handleMissingId: "warn", // 'fail'
			handleEntryGeneratorMismatch: "warn", // 'fail'
			handleUnseenRoutes: "warn",
			origin,
		},
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
