/* global Prism */
// Strict-Transport-Security values. Prism registers the grammar as `hsts`; the id a call site writes
// is `http-hsts`, so it reads as the header it belongs to next to plain `http`.
import "prismjs/components/prism-hsts.js";

// prism-hsts calls every token a directive, so the flags that are the policy
// read the same as `max-age`, which only names one. Keyword first, matching the
// split `http` and prism-csp draw between a value and the name of a parameter.
Prism.languages["http-hsts"] = {
	keyword: /\b(?:includeSubDomains|preload)\b/i,
	...Prism.languages.hsts,
	// Last, so `max-age` keeps its digits rather than splitting on them. Numbers
	// read the same here as in dns and json.
	number: /\b\d+\b/,
};
