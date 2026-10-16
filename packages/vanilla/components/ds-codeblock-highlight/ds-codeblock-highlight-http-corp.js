/* global Prism */
// Cross-Origin-Resource-Policy values, Fetch, cross-origin resource policy. The base grammar carries the shape; this adds the
// vocabulary, so a value the spec does not define stays plain and reads as
// suspect rather than as a value that happens to be spelled differently.
import "./ds-codeblock-highlight-http.js";

Prism.languages["http-corp"] = {
	...Prism.languages.http,
	keyword: [
		/(?:cross-origin|same-origin|same-site)(?![\w-])/,
		...[Prism.languages.http.keyword].flat(),
	],
};
