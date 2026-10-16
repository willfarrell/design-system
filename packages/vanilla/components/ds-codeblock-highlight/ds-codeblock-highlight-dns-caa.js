/* global Prism */
// CAA values, RFC 8659. The base grammar carries the shape; this adds the
// vocabulary, so a value the spec does not define stays plain and reads as
// suspect rather than as a value that happens to be spelled differently.
import "./ds-codeblock-highlight-dns.js";

Prism.languages["dns-caa"] = {
	...Prism.languages.dns,
	keyword: [
		/(?<=[\s])(?:contactemail|contactphone|issuewild|issuemail|issue|iodef)(?![\w-])/,
		...[Prism.languages.dns.keyword].flat(),
	],
};
