/* global Prism */
// Public-Key-Pins values. Prism registers the grammar as `hpkp`; the id a call site writes
// is `http-hpkp`, so it reads as the header it belongs to next to plain `http`.
import "prismjs/components/prism-hpkp.js";

// A pin and a report URI are quoted, and prism-hpkp has no rule for a string, so
// both came through plain while every other grammar here colours a quoted value.
// First, so the quotes close before `directive` reads inside them.
Prism.languages["http-hpkp"] = {
	string: /"[^"]*"/,
	// The flags are the policy; the rest name a parameter. Same split as `http`.
	keyword: /\b(?:includeSubDomains|preload|strict)\b/i,
	...Prism.languages.hpkp,
	// Last, so `pin-sha256` keeps its digits rather than splitting on them. Numbers
	// read the same here as in dns and json.
	number: /\b\d+\b/,
};
