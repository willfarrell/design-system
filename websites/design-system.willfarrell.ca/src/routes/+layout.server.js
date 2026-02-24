import pkg from "../../package.json" with { type: "json" };

export const prerender = true;
export const ssr = true;
export const csr = false;

export async function load({}) {
	return {
		version: pkg.version,
	};
}
