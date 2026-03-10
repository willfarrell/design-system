/* eslint-env browser */
/* global trustedTypes */
// Load WebComponent custom builtins on demand
// https://github.com/ungap/custom-elements
// https://github.com/WebKit/standards-positions/issues/97

import "@ungap/custom-elements"; // For Safari polyfill, ~2kb

const d = document;

const lazyLoad = new IntersectionObserver(async (entries, observer) => {
	for (const { target, isIntersecting } of entries) {
		if (isIntersecting) {
			// don't `await` to ensure non-blocking
			const name = target.getAttribute("is");
			const link = d.querySelector(`link[href*="/${name}-"][href$=".js"]`);
			const scriptURL = link?.href ?? `/js/pewc/${name}.js`;
			import(scriptURL);
		}
	}
});
d.querySelectorAll("[is]").forEach((el) => {
	lazyLoad.observe(el);
});
