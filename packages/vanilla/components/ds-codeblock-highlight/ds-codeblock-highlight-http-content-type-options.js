/* global Prism */
// X-Content-Type-Options values, Fetch, nosniff. The base grammar carries the shape; this adds the
// vocabulary, so a value the spec does not define stays plain and reads as
// suspect rather than as a value that happens to be spelled differently.
import "./ds-codeblock-highlight-http.js";

Prism.languages["http-content-type-options"] = {
	...Prism.languages.http,
	keyword: [/nosniff(?![\w-])/, ...[Prism.languages.http.keyword].flat()],
};
