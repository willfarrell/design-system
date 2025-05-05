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

    async handleShow(event) {
      if (event.type === 'click' || event.key === 'Enter') {
        // body.firstElementChild.inert = true
        this.$dialog?.showModal() // Causes it to show centered
        this.$dialog.open = true
        this.$dialog.querySelector('button').focus()
        // this.$dialog.removeAttribute('inert')
        // this.$dialog.removeAttribute('loading')
        this.$dialog.inert = false
        // this.$dialog.loading = false
      }
    }

    connectedCallback() {
      this.addEventListener('click', this.handleShow)
      this.addEventListener('keypress', this.handleShow)
    }

    disconnectedCallback() {
      this.removeEventListener('click', this.handleShow)
      this.addEventListener('keypress', this.handleShow)
    }
  },
  { extends: 'button' }
)
