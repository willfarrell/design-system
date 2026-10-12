/* global Prism */
// SPF values, RFC 7208. The base grammar carries the shape; this adds the
// vocabulary, so a value the spec does not define stays plain and reads as
// suspect rather than as a value that happens to be spelled differently.
import "./ds-codeblock-highlight-dns.js";

Prism.languages["dns-spf"] = {
	...Prism.languages.dns,
	keyword: [
		/\bspf1\b|(?<=[\s])[+~?-]?(?:include|redirect|exists|all|ip4|ip6|exp|ptr|mx|a)(?=[:=\s]|$)/,
		...[Prism.languages.dns.keyword].flat(),
	],
};
