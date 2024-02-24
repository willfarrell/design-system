/* eslint-env browser */
// const d = document
// const body = d.querySelector('body')

/* <dialog id="dialog" is="ds-dialog" inert /> */
customElements.define(
  'ds-dialog',
  class extends HTMLDialogElement {
    // constructor() {
    //   super()
    // }

    handleClose(event) {
      this.open = false
      this.inert = true
      // this.loading = true
    }

    handleClick(e) {
      if (e.target.nodeName === 'DIALOG' && e.target.hasAttribute('open')) {
        this.close()
      }
    }

    connectedCallback() {
      this.addEventListener('close', this.handleClose)
      this.addEventListener('click', this.handleClick)
    }

    disconnectedCallback() {
      this.removeEventListener('close', this.handleClose)
      this.removeEventListener('click', this.handleClick)
    }
  },
  { extends: 'dialog' }
)
