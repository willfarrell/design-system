/* global Prism */
// X-Frame-Options values, RFC 7034. The base grammar carries the shape; this adds the
// vocabulary, so a value the spec does not define stays plain and reads as
// suspect rather than as a value that happens to be spelled differently.
import "./ds-codeblock-highlight-http.js";

Prism.languages["http-frame-options"] = {
	...Prism.languages.http,
	keyword: [
		/(?:SAMEORIGIN|ALLOW-FROM|DENY)(?![\w-])/,
		...[Prism.languages.http.keyword].flat(),
	],
};
