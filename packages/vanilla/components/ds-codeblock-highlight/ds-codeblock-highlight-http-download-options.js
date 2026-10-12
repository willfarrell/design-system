/* global Prism */
// X-Download-Options values, Internet Explorer 8 download options. The base grammar carries the shape; this adds the
// vocabulary, so a value the spec does not define stays plain and reads as
// suspect rather than as a value that happens to be spelled differently.
import "./ds-codeblock-highlight-http.js";

Prism.languages["http-download-options"] = {
	...Prism.languages.http,
	keyword: [/noopen(?![\w-])/, ...[Prism.languages.http.keyword].flat()],
};
