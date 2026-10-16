/* global Prism */
// Cross-Origin-Embedder-Policy values, HTML, cross-origin embedder policy. The base grammar carries the shape; this adds the
// vocabulary, so a value the spec does not define stays plain and reads as
// suspect rather than as a value that happens to be spelled differently.
import "./ds-codeblock-highlight-http.js";

Prism.languages["http-coep"] = {
	...Prism.languages.http,
	keyword: [
		/(?:credentialless|require-corp|unsafe-none)(?![\w-])/,
		...[Prism.languages.http.keyword].flat(),
	],
};
