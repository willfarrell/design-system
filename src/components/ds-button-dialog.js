/* eslint-env browser */
const d = document
// const body = d.querySelector('body')

/* <button is="ds-button-dialog" data-dialog="dialog">Open</button> */
customElements.define(
  'ds-button-dialog',
  class extends HTMLButtonElement {
    constructor() {
      super()
      // const attr = (attr) => this.getAttribute(`data-${attr}`)
      this.$dialog = d.getElementById(this.getAttribute('data-dialog'))
    }

    async handleClick(event) {
      // body.firstElementChild.inert = true
      this.$dialog.showModal()
      this.$dialog.open = true
      this.$dialog.querySelector('button').focus()
      // this.$dialog.removeAttribute('inert')
      // this.$dialog.removeAttribute('loading')
      this.$dialog.inert = false
      // this.$dialog.loading = false
    }

    connectedCallback() {
      this.addEventListener('click', this.handleClick)
    }

    disconnectedCallback() {
      this.removeEventListener('click', this.handleClick)
    }
  },
  { extends: 'button' }
)
