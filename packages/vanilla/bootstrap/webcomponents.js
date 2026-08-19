/* eslint-env browser */
// Load WebComponent custom builtins on demand
// https://github.com/ungap/custom-elements
// https://github.com/WebKit/standards-positions/issues/97

import "@ungap/custom-elements"; // For Safari polyfill, ~2kb

const d = document;

// don't `await` to ensure non-blocking
const load = (target) => {
	const name = target.getAttribute("is");
	const link = d.querySelector(
		`link[rel="modulepreload"][href*="/${name}"][href*=".js"]`,
	);
	const scriptURL = link?.href ?? `/js/pewc/${name}.js`;
	import(scriptURL);
};

const lazyLoad = new IntersectionObserver((entries) => {
	for (const { target, isIntersecting } of entries) {
		if (isIntersecting) load(target);
	}
});
for (const el of d.querySelectorAll("[is]")) {
	if (!el.getClientRects().length) load(el);
	else lazyLoad.observe(el);
}
