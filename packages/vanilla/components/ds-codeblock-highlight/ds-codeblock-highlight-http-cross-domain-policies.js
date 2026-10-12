/* global Prism */
// X-Permitted-Cross-Domain-Policies values, Adobe cross-domain policy. The base grammar carries the shape; this adds the
// vocabulary, so a value the spec does not define stays plain and reads as
// suspect rather than as a value that happens to be spelled differently.
import "./ds-codeblock-highlight-http.js";

Prism.languages["http-cross-domain-policies"] = {
	...Prism.languages.http,
	keyword: [
		/(?:by-content-type|by-ftp-filename|master-only|none|all)(?![\w-])/,
		...[Prism.languages.http.keyword].flat(),
	],
};
