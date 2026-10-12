/* global Prism */
// Integrity-Policy values, Integrity Policy. The base grammar carries the shape; this adds the
// vocabulary, so a value the spec does not define stays plain and reads as
// suspect rather than as a value that happens to be spelled differently.
import "./ds-codeblock-highlight-http.js";

Prism.languages["http-integrity-policy"] = {
	...Prism.languages.http,
	keyword: [
		/(?<=[\s(])(?:script|style)(?![\w-])/,
		...[Prism.languages.http.keyword].flat(),
	],
};
