/* global Prism */
// Document-Isolation-Policy values, HTML, document isolation policy. The base grammar carries the shape; this adds the
// vocabulary, so a value the spec does not define stays plain and reads as
// suspect rather than as a value that happens to be spelled differently.
import "./ds-codeblock-highlight-http.js";

Prism.languages["http-dip"] = {
	...Prism.languages.http,
	keyword: [
		/(?:isolate-and-credentialless|isolate-and-require-corp|none)(?![\w-])/,
		...[Prism.languages.http.keyword].flat(),
	],
};
