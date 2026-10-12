/* global Prism */
// The core is loaded by ds-codeblock-highlight.js and reaches this file through
// the global, the same way Prism's own component files find it. Importing
// "prismjs" here would bundle a second core into this chunk and register the
// grammar on a Prism the component never reads.
import "prismjs/components/prism-apacheconf.js";

// Prism registers this as apacheconf with no alias, but every fence and every
// call site writes `apache`, so an unaliased id renders unhighlighted.
Prism.languages.apache = Prism.languages.apacheconf;
