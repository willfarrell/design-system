import { readFile } from "node:fs/promises";
import { extname, join } from "node:path";
import { after } from "node:test";
import { chromium } from "playwright";

const root = new URL("../../", import.meta.url).pathname;
const served = (specifier) =>
	`/${new URL(import.meta.resolve(specifier)).pathname.slice(root.length)}`;
const types = {
	".css": "text/css",
	".html": "text/html",
	".js": "text/javascript",
	".json": "application/json",
	".mjs": "text/javascript",
};

const imports = {
	"@simplewebauthn/browser": served("@simplewebauthn/browser"),
	"@ungap/custom-elements": "/test-stub/empty.js",
	prismjs: "/test-stub/prism.js",
	tinykeys: served("tinykeys"),
};

const stubs = {
	"/test-stub/empty.js": "",
	"/test-stub/prism.js": `
		const Prism = { languages: {}, tokenize: (text) => [text] };
		globalThis.Prism = Prism;
		export default Prism;
	`,
};

export const vanilla = "/packages/vanilla";

export const importmap = () =>
	`<script type="importmap">${JSON.stringify({ imports })}</script>`;

let browser;
after(() => browser?.close());

export const open = async (
	html,
	{ files = {}, headers = {}, media, context: contextOptions = {} } = {},
) => {
	browser ??= await chromium.launch({
		args: ["--enable-blink-features=PrefersReducedData"],
	});
	const context = await browser.newContext(contextOptions);
	const page = await context.newPage();
	page.errors = [];
	page.on("pageerror", (error) => page.errors.push(error));
	if (media) await page.emulateMedia(media);
	await page.route("http://test/**", async (route) => {
		const { pathname } = new URL(route.request().url());
		const file = files[pathname] ?? stubs[pathname];
		if (pathname === "/" || pathname === "/index.html") {
			return route.fulfill({
				body: `<!doctype html><html><head>${importmap()}</head><body>${html}</body></html>`,
				headers: { "content-type": "text/html", ...headers },
			});
		}
		if (file !== undefined) {
			const {
				body,
				contentType,
				status = 200,
			} = typeof file === "string" ? { body: file } : file;
			return route.fulfill({
				status,
				body,
				contentType: contentType ?? types[extname(pathname)] ?? "text/plain",
			});
		}
		try {
			const body = await readFile(join(root, decodeURIComponent(pathname)));
			return route.fulfill({
				body,
				contentType: types[extname(pathname)] ?? "text/plain",
			});
		} catch {
			return route.fulfill({ status: 404, body: "" });
		}
	});
	await page.goto("http://test/");
	return page;
};

export const load = (page, ...paths) =>
	page.evaluate(
		(urls) => Promise.all(urls.map((url) => import(url))),
		paths.map((path) => `${vanilla}/${path}`),
	);
