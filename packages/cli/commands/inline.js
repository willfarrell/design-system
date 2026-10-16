import { createHash } from "node:crypto";
import { readFileSync, writeFileSync } from "node:fs";
import { basename, extname, resolve } from "node:path";
import { walkDirSync } from "../lib/fs.js";

const algo = "sha256";
const methods = {
	css: {
		regexp:
			/<link[^>]*?href=["']?(?:[^>"']*?\/)?([^>"'?#\s/]+)(?=[?#"'\s>])[^>]*>/g,
		keep: (name) => ["blocking", "media", "nonce", "title"].includes(name),
		escape: (content) => content.replace(/<\/(style)/gi, "<\\/$1"),
		replace: (attrs, content) => `<style${attrs}>${content}</style>`,
	},
	js: {
		regexp:
			/<script[^>]*?src=["']?(?:[^>"']*?\/)?([^>"'?#\s/]+)(?=[?#"'\s>])[^>]*>(?:\s*<\/script>)?/g,
		keep: (name) => !["integrity", "src"].includes(name),
		escape: (content) => content.replaceAll("</", "<\\/"),
		replace: (attrs, content) => `<script${attrs}>${content}</script>`,
	},
};

const attributes = (tag, keep) =>
	tag
		.slice(0, tag.indexOf(">"))
		.matchAll(/\s([^\s"'=<>/]+)(?:=(?:"[^"]*"|'[^']*'|[^\s>]*))?/g)
		.filter(([, name]) => keep(name.toLowerCase()))
		.map(([attr]) => attr)
		.toArray()
		.join("");

const command = (dir, input, options = {}) => {
	const filename = basename(input);
	const ext = extname(filename).substring(1);
	const method = methods[ext];
	if (!method) {
		console.error("Unsupported file extension", ext);
		process.exitCode = 1;
		return;
	}

	const content = method.escape(readFileSync(input).toString());
	if (options.debug) {
		const integrity = createHash(algo).update(content).digest("base64");
		console.log(input, `${algo}-${integrity}`);
	}

	const sourceDir = resolve(dir);
	for (const filePath of walkDirSync(sourceDir, ".html")) {
		if (options.debug) {
			console.log("Update", filePath);
		}
		const html = readFileSync(filePath).toString();
		let inlined = false;
		writeFileSync(
			filePath,
			html.replace(method.regexp, (tag, name) => {
				if (inlined || name !== filename) return tag;
				inlined = true;
				return method.replace(attributes(tag, method.keep), content);
			}),
		);
	}
	console.log("Done!");
};

export default command;
