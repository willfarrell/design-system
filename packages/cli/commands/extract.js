import { existsSync, readFileSync } from "node:fs";
import { join as pathJoin, relative as pathRelative, resolve } from "node:path";
import { getModuleDir, saveFileSync, walkDirSync } from "../lib/fs.js";

let indexes = {};
const elementRegExp = /<([a-z][a-z0-9]*)[^>]*>/g;
const attrsRegExp =
	/\s([^\s"'=<>/]+)(?:\s*=\s*(?:"([^"]*)"|'([^']*)'|([^\s"'=<>`]+)))?/g;

const parse = (content) => {
	let matchElement = elementRegExp.exec(content);
	while (matchElement) {
		const [elem, tag] = matchElement;

		indexes.tags[tag] ??= 0;
		indexes.tags[tag] += 1;
		const attrs = {};
		for (const [, key, dq, sq, uq] of elem.matchAll(attrsRegExp)) {
			attrs[key.toLowerCase()] = dq ?? sq ?? uq ?? "";
		}

		if (tag === "input" && attrs.type) {
			const tagExpression = `${tag}[type=${attrs.type}]`;
			indexes.tags[tagExpression] ??= 0;
			indexes.tags[tagExpression] += 1;
		}

		if (attrs.class) {
			for (const className of attrs.class.split(" ")) {
				let key = `.${className}`;
				indexes.classes[key] ??= 0;
				indexes.classes[key] += 1;
				key = `${tag}.${className}`;
				indexes.classes[key] ??= 0;
				indexes.classes[key] += 1;
			}
		}

		if (attrs.role) {
			const key = `${tag}[role=${attrs.role}]`;
			indexes.roles[key] ??= 0;
			indexes.roles[key] += 1;
		}

		for (const [key, value] of Object.entries(attrs)) {
			if (key.startsWith("aria-") && value) {
				for (const ariaKey of [`[${key}]`, `${tag}[${key}]`]) {
					indexes.arias[ariaKey] ??= 0;
					indexes.arias[ariaKey] += 1;
				}
				const prefix = value.split("-")[0];
				if (prefix) {
					const ariaKey = `${tag}[${key}^=${prefix}-]`;
					indexes.arias[ariaKey] ??= 0;
					indexes.arias[ariaKey] += 1;
				}
			}
		}

		if ("popover" in attrs) {
			indexes.arias["[popover]"] ??= 0;
			indexes.arias["[popover]"] += 1;
		}

		if (attrs.is) {
			indexes.pewc[attrs.is] ??= 0;
			indexes.pewc[attrs.is] += 1;
		}
		matchElement = elementRegExp.exec(content);
	}
};

// Svelte 5 SSR outputs JS objects like { class: "container-slices", is: "ds-card" }
const jsAttrRegExp =
	/(?<![\w-])(is|type|role|popover|aria-[\w-]+)["']?\s*:\s*"([^"]*)"/g;
const jsClassRegExp =
	/(?<![\w$-])(?:["']?class["']?\s*:|attr_class[\w$]*\(|clsx[\w$]*\()/g;
const classTokenRegExp = /^-?[_a-zA-Z][\w-]*$/;

// Svelte 5 SSR destructuring defaults like: is = "ds-card", class = "container"
const jsDestructureDefaultRegExp = /(class|is|type|role)\s*=\s*"([^"]*)"/g;

const addJSAttr = (key, value) => {
	if (key === "class") {
		for (const className of value.split(" ")) {
			const k = `.${className}`;
			indexes.classes[k] ??= 0;
			indexes.classes[k] += 1;
		}
	} else if (key === "is") {
		indexes.pewc[value] ??= 0;
		indexes.pewc[value] += 1;
	} else if (key === "type") {
		const k = `input[type=${value}]`;
		indexes.tags[k] ??= 0;
		indexes.tags[k] += 1;
	} else if (key === "popover") {
		indexes.arias["[popover]"] ??= 0;
		indexes.arias["[popover]"] += 1;
	} else if (key === "role") {
		indexes.roles[`[role=${value}]`] ??= 0;
		indexes.roles[`[role=${value}]`] += 1;
	} else if (key.startsWith("aria-") && value) {
		indexes.arias[`[${key}]`] ??= 0;
		indexes.arias[`[${key}]`] += 1;
		const prefix = value.split("-")[0];
		if (prefix) {
			const ariaKey = `[${key}^=${prefix}-]`;
			indexes.arias[ariaKey] ??= 0;
			indexes.arias[ariaKey] += 1;
		}
	}
};

const scanString = (content, start) => {
	let i = start + 1;
	let value = "";
	while (i < content.length && content[i] !== content[start]) {
		if (content[i] === "\\") i++;
		value += content[i];
		i++;
	}
	return { value, end: i + 1 };
};

const scanTemplate = (content, start, tokens) => {
	let i = start + 1;
	let chunk = "";
	let afterExpression = false;
	const flush = (beforeExpression) => {
		const parts = chunk.split(/\s+/);
		if (afterExpression) parts.shift();
		if (beforeExpression) parts.pop();
		tokens.push(...parts);
		chunk = "";
	};
	while (i < content.length) {
		if (content[i] === "\\") {
			chunk += content[i + 1];
			i += 2;
		} else if (content[i] === "`") {
			flush(false);
			return i + 1;
		} else if (content[i] === "$" && content[i + 1] === "{") {
			flush(true);
			i = scanClassExpression(content, i + 2, tokens, true) + 1;
			afterExpression = true;
		} else {
			chunk += content[i];
			i++;
		}
	}
	return i;
};

const scanClassExpression = (content, start, tokens, untilClose) => {
	const stack = [];
	let previous = "{";
	let i = start;
	while (i < content.length) {
		const ch = content[i];
		const inCall = stack.includes(true);
		if (ch === '"' || ch === "'") {
			const { value, end } = scanString(content, i);
			if (!inCall) tokens.push(...value.split(/\s+/));
			i = end;
			previous = ch;
			continue;
		}
		if (ch === "`") {
			i = scanTemplate(content, i, inCall ? [] : tokens);
			previous = ch;
			continue;
		}
		const identifier = /^[A-Za-z_$][\w$]*/.exec(content.slice(i, i + 256))?.[0];
		if (identifier) {
			if (
				!inCall &&
				(previous === "{" || previous === ",") &&
				/^\s*:/.test(content.slice(i + identifier.length))
			) {
				tokens.push(identifier);
			}
			i += identifier.length;
			previous = "a";
			continue;
		}
		if ("([{".includes(ch)) {
			stack.push(ch === "(" && /[a)\]]/.test(previous));
		} else if (")]}".includes(ch)) {
			if (!stack.length) break;
			stack.pop();
		} else if (!stack.length && !untilClose && (ch === "," || ch === ";")) {
			break;
		}
		if (!/\s/.test(ch)) previous = ch;
		i++;
	}
	return i;
};

const parseJS = (content) => {
	for (const regExp of [jsAttrRegExp, jsDestructureDefaultRegExp]) {
		for (const [, key, value] of content.matchAll(regExp)) {
			addJSAttr(key, value);
		}
	}
	for (const match of content.matchAll(jsClassRegExp)) {
		const tokens = [];
		scanClassExpression(
			content,
			match.index + match[0].length,
			tokens,
			match[0].endsWith("("),
		);
		for (const token of tokens) {
			if (classTokenRegExp.test(token)) addJSAttr("class", token);
		}
	}
};

const aboveTheFold = new Set([
	"layers/base.css",
	"layers/media.css",
	"elements/nav.css",
	"elements/a.css",
	"elements/button.css",
	"elements/hgroup.css",
	"elements/h1.css",
	"elements/li.css",
	"elements/search.css",
	"elements/ul.css",
	"classes/.container.css",
	"classes/.container-aside.css",
	"classes/.container-slices.css",
	"classes/.container-toc.css",
	"classes/.form-errors.css",
	"classes/.visually-hidden.css",
	"classes/a.back.css",
	"classes/a.button.css",
	"classes/a.skip.css",
	"classes/details.chevron.css",
	"theme.css",
	"theme-custom",
]);

const buildCSS = (
	{ namespace = "willfarrell-ds", tags, classes, roles, arias, pewc } = {},
	theme,
) => {
	const vanillaPath = getModuleDir(`@${namespace}/vanilla`);
	const header = `/* generated by @${namespace}/cli */\n`;
	const imports = [];

	imports.push({
		key: "layers/base.css",
		line: `@import "@${namespace}/vanilla/layers/base.css";\n`,
	});

	let list = Object.keys(tags);
	list.sort();
	for (const key of list) {
		if (existsSync(`${vanillaPath}/elements/${key}.css`)) {
			imports.push({
				key: `elements/${key}.css`,
				line: `@import "@${namespace}/vanilla/elements/${key}.css";\n`,
			});
		}
	}
	const addedClasses = new Set();
	const addClass = (key) => {
		const cssKey = `classes/${key}.css`;
		if (!addedClasses.has(cssKey) && existsSync(`${vanillaPath}/${cssKey}`)) {
			addedClasses.add(cssKey);
			imports.push({
				key: cssKey,
				line: `@import "@${namespace}/vanilla/${cssKey}";\n`,
			});
		}
	};
	for (const selectors of [classes, roles, arias]) {
		list = Object.keys(selectors);
		list.sort();
		for (const key of list) {
			addClass(key);
			if (key.startsWith(".") || key.startsWith("[")) {
				for (const tag of Object.keys(tags)) {
					addClass(`${tag}${key}`);
				}
			}
		}
	}
	const components = new Set(Object.keys(pewc));
	for (const key of Object.keys(classes)) {
		if (key.startsWith(".")) components.add(key.slice(1));
	}
	list = [...components];
	list.sort();
	for (const key of list) {
		if (existsSync(`${vanillaPath}/components/${key}.css`)) {
			imports.push({
				key: `components/${key}.css`,
				line: `@import "@${namespace}/vanilla/components/${key}.css";\n`,
			});
		}
	}

	imports.push({
		key: "theme.css",
		line: `@import "@${namespace}/vanilla/theme.css";\n`,
	});
	if (theme && theme !== `@${namespace}/vanilla/theme.css`) {
		imports.push({
			key: "theme-custom",
			line: `@import "${theme}";\n`,
		});
	}
	imports.push({
		key: "layers/media.css",
		line: `@import "@${namespace}/vanilla/layers/media.css";\n`,
	});

	return { imports, header };
};

const splitCSS = (imports, header) => {
	const above = [];
	const below = [];
	for (const { key, line } of imports) {
		if (aboveTheFold.has(key)) {
			above.push(line);
		} else {
			below.push(line);
		}
	}
	return {
		app: header + imports.map((i) => i.line).join(""),
		above: header + above.join(""),
		below: below.join(""),
	};
};

const extract = (options = {}) => {
	const inputDirs = [options.inputDir ?? []].flat();
	indexes = { tags: {}, classes: {}, roles: {}, arias: {}, pewc: {} };

	for (const input of inputDirs) {
		const sourceDir = resolve(input);
		for (const filePath of walkDirSync(sourceDir, ".html")) {
			if (options.debug) {
				console.log("Parse", filePath);
			}
			const content = readFileSync(filePath).toString();
			parse(content);
		}
		for (const filePath of walkDirSync(sourceDir, ".js")) {
			if (options.debug) {
				console.log("Parse", filePath);
			}
			const content = readFileSync(filePath).toString();
			parse(content);
			parseJS(content);
		}
	}

	if (options.debug) {
		console.log("tags", Object.keys(indexes.tags).sort());
		console.log("classes", Object.keys(indexes.classes).sort());
		console.log("roles", Object.keys(indexes.roles).sort());
		console.log("arias", Object.keys(indexes.arias).sort());
		console.log("pewc", Object.keys(indexes.pewc).sort());
	}

	if (options.outputDir) {
		const theme = /^[./]/.test(options.theme ?? "")
			? `./${pathRelative(options.outputDir, options.theme)}`
			: options.theme;
		const { imports, header } = buildCSS(indexes, theme);
		const { app, above, below } = splitCSS(imports, header);
		saveFileSync(pathJoin(options.outputDir, "app.css"), app);
		saveFileSync(pathJoin(options.outputDir, "above.css"), above);
		saveFileSync(pathJoin(options.outputDir, "below.css"), below);
		if (options.debug) {
			console.log("Saved", options.outputDir);
		}
	}
	if (options.debug) {
		console.log("Done!");
	}
};

export default extract;
