/* global Prism */
// MTA-STS values, RFC 8461. The base grammar carries the shape; this adds the
// vocabulary, so a value the spec does not define stays plain and reads as
// suspect rather than as a value that happens to be spelled differently.
import "./ds-codeblock-highlight-dns.js";

Prism.languages["dns-mta-sts"] = {
	...Prism.languages.dns,
	keyword: [
		/\bSTSv1\b|(?<==)(?:enforce|testing|none)(?![\w-])/,
		...[Prism.languages.dns.keyword].flat(),
	],
};
