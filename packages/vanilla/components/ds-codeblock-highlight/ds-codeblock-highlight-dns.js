/* global Prism */
// The core is loaded by ds-codeblock-highlight.js and reaches this file through
// the global, the same way Prism's own component files find it. Importing
// "prismjs" here would bundle a second core into this chunk and register the
// grammar on a Prism the component never reads.

// Zone-file lines, the form every DNS provider accepts on paste:
//   example.com.	IN	TXT	"example-verification=..."
// and the RDATA on its own, the form a provider's "value" field takes:
//   v=DMARC1; p=reject; rua=mailto:dmarc@example.com
// Prism ships no DNS grammar, so these rendered as one flat string.
Prism.languages.dns = {
	// String before comment: a DMARC or SPF value is full of semicolons, and a
	// `;` rule that runs first swallows the rest of the record as a comment.
	string: /"(?:[^"\\]|\\.)*"/,
	// A zone comment opens the line or follows whitespace. The `;` that separates
	// value tags hangs off the tag before it, so it is not one.
	comment: { pattern: /(^|[ \t]);.*/, lookbehind: true },
	// Before `keyword`, so the lookbehind still sees the class it anchors to.
	// Anchored rather than listing RR types: new ones keep arriving (SVCB, HTTPS)
	// and an unlisted type would silently lose its colour.
	"record-type": {
		pattern: /(\b(?:IN|CH|HS)[ \t]+)[A-Z][A-Z0-9-]*/,
		lookbehind: true,
		alias: "function",
	},
	// Only the class, which is structure. A value's vocabulary belongs to the
	// record that defines it, so `dns-dmarc` and its siblings add theirs and a
	// value this grammar cannot vouch for stays plain.
	keyword: /\b(?:IN|CH|HS)\b/,
	property: [
		// The owner name opens the line. Multiline: a block may hold several
		// records. No `=`, so a bare value's first tag is left to the rule below
		// rather than swallowed whole.
		{ pattern: /^[^\s;=]+/m, greedy: true },
		// A value tag: opens the value or follows a separator, as in DMARC, SPF,
		// MTA-STS and CAA.
		{ pattern: /(^|[;,]\s*)[a-z][\w-]*(?==)/i, lookbehind: true },
	],
	// TTL, and the numeric fields RDATA opens with (MX priority, CAA flags).
	number: /\b\d+\b/,
	punctuation: /[=;]/,
};
