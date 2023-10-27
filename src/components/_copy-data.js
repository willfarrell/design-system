/* eslint-env browser */
customElements.define(
  'copy-data',
  class extends HTMLButtonElement {
    constructor () {
      super()
      const data = this.getAttribute('data-data')
      this.addEventListener('click', async (event) => {
        await navigator.clipboard.writeText(data)
        this.innerText = this.getAttribute('data-text-copied')
      })
    }
  },
  { extends: 'button' }
)
