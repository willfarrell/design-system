/* eslint-env browser */
/* global v */
// Load WebComponent custom builtins on demand
// https://github.com/ungap/custom-elements
// https://github.com/WebKit/standards-positions/issues/97

import '@ungap/custom-elements' // For Safari polyfill, ~2kb

const d = document
const lazyLoad = new IntersectionObserver(async (entries, observer) => {
  for (const { target, isIntersecting } of entries) {
    if (isIntersecting) {
      // don't `await` to ensure non-blocking
      import(`/js/is/${target.getAttribute('is')}.js?v=${v}`)
    }
  }
})
d.querySelectorAll('[is]').forEach((el) => lazyLoad.observe(el))
