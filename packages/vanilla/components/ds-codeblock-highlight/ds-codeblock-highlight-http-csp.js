/* global Prism */
// Content-Security-Policy values. Prism registers the grammar as `csp`; the id a call site writes
// is `http-csp`, so it reads as the header it belongs to next to plain `http`.
import "prismjs/components/prism-csp.js";

Prism.languages["http-csp"] = Prism.languages.csp;
