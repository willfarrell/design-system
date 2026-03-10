/* eslint-env browser */
/* global trustedTypes */

const d = document;
const w = window;
const n = navigator;

w.addEventListener("load", async () => {
	if ("serviceWorker" in n) {
		const sw = n.serviceWorker;
		const link = d.querySelector(`link[href*="/sw-"][href$=".js"]`);
		let scriptURL = link?.href ?? `/sw.js`;
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
		const reg = await sw.register(scriptURL, {
			scope: "/",
		});

		const swResponseEvents = {};
		const defaultResponseEvent = (event) => {
			console.warn("Unhandled ServiceWorker.message", event);
		};

		sw.addEventListener("message", async (event) => {
			if (!reg.active) {
				return;
			}
			if (event.origin !== location.origin) {
				return;
			}
			const eventHandler = swResponseEvents[event.type] ?? defaultResponseEvent;
			await eventHandler(event);
		});
	}
});

// move to @work-bee/offline - {client}
document.addEventListener("ononline", () => {
	navigator?.serviceWorker.controller?.postMessage?.({
		type: "online",
	});
});
