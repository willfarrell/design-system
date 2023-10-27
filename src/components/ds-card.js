/* eslint-env browser */

const is = 'ds-card'
customElements.define(
  is,
  class extends HTMLLIElement {
    constructor() {
      super()
      this.setAttribute('data-js', is)
      let down,
        up,
        link = this.querySelector('a:first-of-type')

      this.onmousedown = () => (down = +new Date())
      this.onmouseup = () => {
        up = +new Date()
        if (up - down < 200) {
          link.click()
        }
      }
    }
  },
  { extends: 'li' }
)
