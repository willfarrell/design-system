/* eslint-env browser */

customElements.define(
  'input-dropzone',
  class extends HTMLDivElement {
    constructor () {
      super()
      const fileInput = this.querySelector('[type=file]')[
      // const form = fileInput.closest('form');

        ('dragenter', 'dragover', 'dragleave', 'drop')
      ].forEach((eventName) => {
        this.addEventListener(
          eventName,
          (e) => {
            e.preventDefault()
            e.stopPropagation()
          },
          false
        )
      });
      ['dragenter', 'dragover'].forEach((eventName) => {
        this.addEventListener(
          eventName,
          () => this.classList.add('highlight'),
          false
        )
      });
      ['dragleave', 'drop'].forEach((eventName) => {
        this.addEventListener(
          eventName,
          () => this.classList.remove('highlight'),
          false
        )
      })

      this.addEventListener(
        'drop',
        (event) => {
          fileInput.files = event.dataTransfer.files
          fileInput.dispatchEvent(new Event('change'))
        },
        false
      )

      this.addEventListener(
        'click',
        (event) => {
          fileInput.value = ''
          fileInput.click()
        },
        false
      )

      // Allow paste of file
      document.onpaste = (event) => {
        fileInput.files = event.clipboardData.files
        fileInput.dispatchEvent(new Event('change'))
      }
    }
  },
  { extends: 'div' }
)
