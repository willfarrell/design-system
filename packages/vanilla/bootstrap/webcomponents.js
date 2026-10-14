/* eslint-env browser */
// Load WebComponent custom builtins on demand
// https://github.com/ungap/custom-elements
// https://github.com/WebKit/standards-positions/issues/97

import "@ungap/custom-elements"; // For Safari polyfill, ~2kb

const d = document;

const valid = /^[a-z0-9-]+$/;

const basename = (link) => new URL(link.href).pathname.split("/").pop();

const preload = (name) => {
	const links = [
		...d.querySelectorAll('link[rel="modulepreload"]:not([data-lang])'),
	];
	const hashed = new RegExp(`^${name}-(?=[\\w-]*[A-Z0-9_])[\\w-]{8}\\.js$`);
	return (
		links.find((link) => basename(link) === `${name}.js`) ??
		links.find((link) => hashed.test(basename(link)))
	);
};

// don't `await` to ensure non-blocking
const load = (target) => {
	const name = target.getAttribute("is");
	const scriptURL = preload(name)?.href ?? `/js/pewc/${name}.js`;
	import(scriptURL);
};

const lazyLoad = new IntersectionObserver((entries) => {
	for (const { target, isIntersecting } of entries) {
		if (!isIntersecting) continue;
		lazyLoad.unobserve(target);
		load(target);
	}
});
const upgrade = (el) => {
	if (!valid.test(el.getAttribute("is"))) return;
	if (!el.getClientRects().length) load(el);
	else lazyLoad.observe(el);
};

const scan = (root) => {
	if (root.matches("[is]")) upgrade(root);
	for (const el of root.querySelectorAll("[is]")) upgrade(el);
};

scan(d.documentElement);
new MutationObserver((records) => {
	for (const { addedNodes } of records) {
		for (const node of addedNodes) {
			if (node.nodeType === Node.ELEMENT_NODE) scan(node);
		}
	}
}).observe(d.documentElement, { childList: true, subtree: true });
