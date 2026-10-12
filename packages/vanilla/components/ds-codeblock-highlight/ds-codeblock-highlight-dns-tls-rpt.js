/* global Prism */
// TLS-RPT values, RFC 8460. The base grammar carries the shape; this adds the
// vocabulary, so a value the spec does not define stays plain and reads as
// suspect rather than as a value that happens to be spelled differently.
import "./ds-codeblock-highlight-dns.js";

Prism.languages["dns-tls-rpt"] = {
	...Prism.languages.dns,
	keyword: [/\bTLSRPTv1\b/, ...[Prism.languages.dns.keyword].flat()],
};
