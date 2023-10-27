/* eslint-env browser */
// https://stackoverflow.com/questions/71165953/intersectionobserver-with-multiple-isintersecting-headers-not-working-correctly
customElements.define(
  'on-this-page',
  class extends HTMLAsideElement {
    constructor() {
      super()

      const observer = new IntersectionObserver(async (entries, observer) => {
        for (const { target, isIntersecting } of entries) {
          if (isIntersecting) {
            console.log(target)
            const elem = this.querySelector(`a[href='#${target.id}']`)
            // TODO flag focus

            return
          }
        }
      })
      document
        .querySelectorAll('section:has(h1,h2,h3,h4,h5,h6)')
        .forEach((el) => observer.observe(el))
    }
  },
  { extends: 'aside' }
)
