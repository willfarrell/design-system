import adapter from "@sveltejs/adapter-cloudflare";
import { sveltekit } from "@sveltejs/kit/vite";
import { defineConfig } from "vite";
import mkcert from "vite-plugin-mkcert";
import sriPrerendered from "vite-plugin-sri";
import tardisec from "./.tardisec.sveltekit.json" with { type: "json" };
import pkg from "./package.json" with { type: "json" };

const domain = process.env.DOMAIN ?? pkg.name;

export default defineConfig({
	plugins: [
		sveltekit({
			adapter: adapter({ platformProxy: { persist: false } }),
			appDir: "_",
			files: { serviceWorker: "src/scripts/service-worker" },
			csp: tardisec.kit.csp,
			paths: {
				// Also the CSRF trusted origin and prerender url.origin
				origin: `https://${domain}`,
				relative: false,
				base: process.argv.includes("dev") ? "" : process.env.BASE_PATH,
			},
			serviceWorker: { register: false },
			prerender: {
				concurrency: 5,
				crawl: true,
				entries: ["/", "/sitemap.xml"],
				handleHttpError: "warn", // 'fail'
				handleMissingId: "warn", // 'fail'
				handleEntryGeneratorMismatch: "warn", // 'fail'
				handleUnseenRoutes: "warn",
			},
			preprocess: [],
			extensions: [".svelte"],
			onwarn(warning, defaultHandler) {
				// polyfill for `is` included, allow
				if (warning.code === "attribute_avoid_is") return;

				// false-positive Triggers on non-reactive "is updated, but is not declared with `$state(...)`. Changing its value will not correctly trigger updates""
				if (warning.code === "non_reactive_update") return;

				warning.message = `[${warning.code}] ${warning.message}`;
				defaultHandler(warning);
			},
		}),
		mkcert({ mkcertPath: process.env.MKCERT_PATH }),
		sriPrerendered(),
	],
	build: {
		assetsInlineLimit: 0,
	},
	ssr: {
		noExternal: ["@willfarrell-ds/vanilla"],
	},
	optimizeDeps: {
		exclude: ["@willfarrell-ds/svelte", "@willfarrell-ds/vanilla"],
	},
});
