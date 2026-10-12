/* global Prism */
// DMARC values, RFC 7489. The base grammar carries the shape; this adds the
// vocabulary, so a value the spec does not define stays plain and reads as
// suspect rather than as a value that happens to be spelled differently.
import "./ds-codeblock-highlight-dns.js";

Prism.languages["dns-dmarc"] = {
	...Prism.languages.dns,
	keyword: [
		/\bDMARC1\b|(?<==)(?:quarantine|reject|none|afrf|[rsd01])(?![\w-])/,
		...[Prism.languages.dns.keyword].flat(),
	],
};
