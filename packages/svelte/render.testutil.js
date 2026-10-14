import { readFileSync } from "node:fs";
import { registerHooks } from "node:module";
import { fileURLToPath } from "node:url";
import { compile } from "svelte/compiler";
import { render as renderServer } from "svelte/server";

const workerUrlSuffix = "?worker&url";
const pageKey = Symbol.for("render.testutil.page");

export const page = { url: new URL("http://localhost/") };
globalThis[pageKey] = page;

registerHooks({
	resolve(specifier, context, nextResolve) {
		if (specifier === "$app/state") {
			return { url: "app:state", shortCircuit: true };
		}
		if (specifier.endsWith(workerUrlSuffix)) {
			return {
				url: `worker-url:${specifier.slice(0, -workerUrlSuffix.length)}`,
				shortCircuit: true,
			};
		}
		return nextResolve(specifier, context);
	},
	load(url, context, nextLoad) {
		if (url === "app:state") {
			return {
				format: "module",
				source:
					'export const page = globalThis[Symbol.for("render.testutil.page")];',
				shortCircuit: true,
			};
		}
		if (url.startsWith("worker-url:")) {
			return {
				format: "module",
				source: `export default ${JSON.stringify(`/${url.slice("worker-url:".length)}`)};`,
				shortCircuit: true,
			};
		}
		if (url.endsWith(".svelte")) {
			const filename = fileURLToPath(url);
			const { js } = compile(readFileSync(filename, "utf8"), {
				generate: "server",
				filename,
			});
			return {
				format: "module",
				source: `import.meta.glob = () => ({});\n${js.code}`,
				shortCircuit: true,
			};
		}
		return nextLoad(url, context);
	},
});

const stripMarkers = (html) => html.replaceAll(/<!--[\s\S]*?-->/g, "");

export const render = async (path, props = {}, context) => {
	const { default: Component } = await import(new URL(path, import.meta.url));
	const { head, body } = await renderServer(Component, { props, context });
	return { head: stripMarkers(head), body: stripMarkers(body) };
};
