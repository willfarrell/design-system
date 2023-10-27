/* eslint-env browser */
customElements.define(
  'print-page',
  class extends HTMLButtonElement {
    constructor () {
      super()
      this.addEventListener('click', async (event) => {
        window.print()
      })
    }
  },
  { extends: 'button' }
)
