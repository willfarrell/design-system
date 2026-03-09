/* eslint-env browser */
/* global trustedTypes */

// TODO https://caniuse.com/mdn-api_element_sethtml
import DOMPurify from "dompurify";

// polyfill
const trustedTypesAPI =
	typeof trustedTypes !== "undefined"
		? trustedTypes
		: { createPolicy: (_n, rules) => rules };

const trustedTypePolicyDefaults = {
	createHTML: (string) =>
		DOMPurify.sanitize(string, { RETURN_TRUSTED_TYPE: false }),
	createScript: (string) => {
		const url = new URL(string);
		// Only allow same-origin
		return url.pathname + url.hash + url.search;
	},
	createScriptURL: (string) => string,
};

const trustedTypePolicy = trustedTypesAPI.createPolicy("ds", {
	...trustedTypePolicyDefaults,
	// Disabled, only trusted sources used
	// createHTML: (string) => DOMPurify.sanitize(string, { RETURN_TRUSTED_TYPE: false }) // 9kb br :(
});

globalThis.trustedTypePolicy = trustedTypePolicy;
