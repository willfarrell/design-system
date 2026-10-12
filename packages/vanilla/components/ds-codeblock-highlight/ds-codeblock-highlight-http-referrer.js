/* global Prism */
// Referrer-Policy values, Referrer Policy. The base grammar carries the shape; this adds the
// vocabulary, so a value the spec does not define stays plain and reads as
// suspect rather than as a value that happens to be spelled differently.
import "./ds-codeblock-highlight-http.js";

Prism.languages["http-referrer"] = {
	...Prism.languages.http,
	keyword: [
		/(?:strict-origin-when-cross-origin|no-referrer-when-downgrade|origin-when-cross-origin|strict-origin|same-origin|unsafe-url|no-referrer|origin)(?![\w-])/,
		...[Prism.languages.http.keyword].flat(),
	],
};
