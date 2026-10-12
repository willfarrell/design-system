import { createHash } from "node:crypto";
import { readFileSync, writeFileSync } from "node:fs";
import { basename, extname, resolve } from "node:path";
import { walkDirSync } from "../lib/fs.js";
import { escapeRegExp } from "../lib/regexp.js";

const algo = "sha256";
const methods = {
	css: {
		regexp: (filename) =>
			new RegExp(`<link[^>]*?href="?[^>"]*?${escapeRegExp(filename)}[^>]*>`),
		keep: (name) => ["blocking", "media", "nonce", "title"].includes(name),
		escape: (content) => content.replace(/<\/(style)/gi, "<\\/$1"),
		replace: (attrs, integrity, content) =>
			`<style${attrs} integrity="${algo}-${integrity}">${content}</style>`,
	},
	js: {
		regexp: (filename) =>
			new RegExp(
				`<script[^>]*?src="?[^>"]*?${escapeRegExp(filename)}[^>]*>(?:\\s*</script>)?`,
			),
		keep: (name) => !["integrity", "src"].includes(name),
		escape: (content) => content.replaceAll("</", "<\\/"),
		replace: (attrs, integrity, content) =>
			`<script${attrs} integrity="${algo}-${integrity}">${content}</script>`,
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
	const integrity = createHash(algo).update(content).digest("base64");

	if (options.debug) {
		console.log(input, `${algo}-${integrity}`);
	}

	const regexp = method.regexp(filename);
	const sourceDir = resolve(dir);
	for (const filePath of walkDirSync(sourceDir, ".html")) {
		if (options.debug) {
			console.log("Update", filePath);
		}
		const html = readFileSync(filePath).toString();
		writeFileSync(
			filePath,
			html.replace(regexp, (tag) =>
				method.replace(attributes(tag, method.keep), integrity, content),
			),
		);
	}
	console.log("Done!");
};

export default command;
