/* eslint-env browser */

customElements.define(
  'ds-input-file',
  class extends HTMLInputElement {
    handleClick() {
      this.value = ''
      this.click()
    }
    // handleBubble(event) {
    //   event.preventDefault()
    //   event.stopPropagation()
    // }
    // handleAdd() {
    //   this.classList.add('focus')
    // }
    // handleRemove() {
    //   this.classList.remove('focus')
    // }
    handleChange(event) {
      this.files = event.dataTransfer.files
      this.dispatchEvent(new Event('change'))
    }
    handlePaste(event) {
      this.files = event.clipboardData.files
      this.dispatchEvent(new Event('change'))
    }

    constructor() {
      super()

      // Assume only one component on a page
      document.onpaste = this.handlePaste
    }
    connectedCallback() {
      const events = {
        // dragenter: [handleBubble, handleAdd],
        // dragover: [handleBubble, handleAdd],
        // dragleave: [handleBubble, handleRemove],
        // drop: [handleBubble, handleRemove, handleChange],
        drop: [this.handleChange],
        click: [this.handleClick]
      }

      for (const eventName in events) {
        this.addEventListener(
          eventName,
          (event) => {
            events[eventName].forEach((fct) => fct(event))
          },
          false
        )
      }
    }
    disconnectedCallback() {
      for (const eventName in events) {
        this.removeEventListener(eventName)
      }
    }
  },
  { extends: 'input' }
)
