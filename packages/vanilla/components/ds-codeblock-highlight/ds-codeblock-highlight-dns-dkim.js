/* global Prism */
// DKIM values, RFC 6376. The base grammar carries the shape; this adds the
// vocabulary, so a value the spec does not define stays plain and reads as
// suspect rather than as a value that happens to be spelled differently.
import "./ds-codeblock-highlight-dns.js";

Prism.languages["dns-dkim"] = {
	...Prism.languages.dns,
	keyword: [
		/\bDKIM1\b|(?<==)(?:ed25519|sha256|sha1|email|rsa|[ys])(?![\w-])/,
		...[Prism.languages.dns.keyword].flat(),
	],
};
