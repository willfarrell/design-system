/* eslint-env: serviceworker */
/* global addEventListener cookieStore */

import {
	// backgroundFetchFailEvent,
	// backgroundFetchSuccessEvent,
	compileConfig,
	// deleteMethod,
	eventActivate,
	eventFetch,
	eventInstall,
	// strategyIgnore,
	// strategyCacheFirstIgnore
	// strategyStatic,
	// strategyLocalDownload,
	// strategyPartition,
	// strategyHTMLPartition,
	getMethod,
	// patchMethod,
	pathPattern,
	// postMethod,
	// putMethod,
	// cacheOverrideEvent,
	// strategyNetworkOnly,
	// strategyNetworkFirst,
	// strategyCacheFirst,
	strategyStaleWhileRevalidate,
} from "@work-bee/core";

import offlineMiddleware from "@work-bee/offline";
import saveDataMiddleware from "@work-bee/save-data";

const offline = offlineMiddleware({
	pollDelay: 0, // Disabled in favour of `onlineEvent`
});

const config = compileConfig({
	precache: {
		routes: [{ path: "/img/logo.svg" }, { path: "/img/icons.svg" }],
	},
	routes: [
		{
			// methods: [getMethod],
			pathPattern: pathPattern("img/.+.(avif|webp|png|jpg|svg)$"),
			// strategy: strategyCacheFirst,
			middlewares: [saveDataMiddleware()],
		},
	],
	methods: [getMethod],
	strategy: strategyStaleWhileRevalidate,
	middlewares: [
		inactivity,

		// fallbackMiddleware({
		//   pathPattern: fallbackPathPattern,
		//   path: '$1/$2/offline'
		// }),
		// fallbackMiddleware({
		//   pathPattern: fallbackPathPattern,
		//   path: '$1/$2/{status}',
		//   statusCodes: Array.from(Array(200).keys(), (n) => n + 400) // 400 - 599
		// })
	],
});

addEventListener("install", (event) => {
	eventInstall(event, config);
});

addEventListener("activate", (event) => {
	eventActivate(event, config);
});

addEventListener("fetch", (event) => {
	eventFetch(event, config);
});

addEventListener("message", (event) => {
	const { data, origin } = event;

	if (origin !== globalThis.origin) {
		console.error("Origin not allowed", event);
		throw new Error("Origin not allowed", {
			cause: { addEventListener: "message", event },
		});
	}
	event.waitUntil(messageEvents[data.type](data));
});

const messageEvents = {
	// cache: cacheOverrideEvent(config),
	activity: inactivity.postMessageEvent,
	online: offline.postMessageEvent,
};
