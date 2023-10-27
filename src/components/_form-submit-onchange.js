/* eslint-env browser */

customElements.define(
  'form-submit-onchange',
  class extends HTMLFormElement {
    constructor () {
      super()

      this.addEventListener('change', async (event) => {
        this.submit()
      })

      // remove apply button
      this.removeChild(this.lastChild)
    }
  },
  { extends: 'form' }
)
