/* eslint-env browser */
/* global trustedTypes */

const d = document;
const w = window;
const n = navigator;

w.addEventListener("load", async () => {
	if ("serviceWorker" in n) {
		const sw = n.serviceWorker;
		const link = d.querySelector(`link[href*="/sw-"][href$=".js"]`);
		let scriptURL = link?.href ?? `/service-worker.js`;
		if (w.trustedTypes) {
			const swPolicy = trustedTypes.createPolicy("sw", {
				createScriptURL: (scriptURL) => {
					const url = new URL(scriptURL, window.location.origin);
					if (url.origin !== window.location.origin) {
						throw new TypeError("Service Worker must be same-origin");
					}
					return url.href;
				},
			});
			scriptURL = swPolicy.createScriptURL(scriptURL);
		}
		await sw.register(scriptURL, {
			scope: "/",
		});
	}
});
