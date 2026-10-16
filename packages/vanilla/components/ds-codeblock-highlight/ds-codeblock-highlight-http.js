/* global Prism */
// The core is loaded by ds-codeblock-highlight.js and reaches this file through
// the global, the same way Prism's own component files find it. Importing
// "prismjs" here would bundle a second core into this chunk and register the
// grammar on a Prism the component never reads.

// Replaces prism-http, which only tokenizes a whole request or response: a bare
// `Permissions-Policy` value came through as one flat string. A directive opens
// the value or follows a separator, and what follows is a bare keyword, an
// origin or a quoted string.
Prism.languages.http = {
	// Optional "Name:" prefix, so the same grammar highlights a bare value and a
	// whole header line. First, or the name tokenizes as a leading directive.
	// alias keyword is what prism-http named it, so no new token colour.
	"header-name": { pattern: /^[\w-]+(?=:)/, alias: "keyword" },
	string: /"[^"]*"|'[^']*'/,
	// Only what the structured field syntax itself defines. A header's own
	// vocabulary belongs to the header, so `http-coop` and its siblings add
	// theirs and a value this grammar cannot vouch for stays plain.
	keyword: /\*|\?[01]|\b(?:self|none)\b/,
	// The colon is a separator too, so the first directive after a name prefix
	// still reads as a directive.
	property: { pattern: /(^|[;,:]\s*)[a-z][\w-]*(?=\s*=)/i, lookbehind: true },
	// After the rules above, so a name that carries digits stays whole. Numbers
	// read the same here as in dns and json, where a grammar already had one.
	number: /\b\d+\b/,
	punctuation: /[=(),;:]/,
};
