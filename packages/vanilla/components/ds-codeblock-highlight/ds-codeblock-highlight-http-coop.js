/* global Prism */
// Cross-Origin-Opener-Policy values, HTML, cross-origin opener policy. The base grammar carries the shape; this adds the
// vocabulary, so a value the spec does not define stays plain and reads as
// suspect rather than as a value that happens to be spelled differently.
import "./ds-codeblock-highlight-http.js";

Prism.languages["http-coop"] = {
	...Prism.languages.http,
	keyword: [
		/(?:noopener-allow-popups|same-origin-allow-popups|unsafe-none|same-origin)(?![\w-])/,
		...[Prism.languages.http.keyword].flat(),
	],
};
