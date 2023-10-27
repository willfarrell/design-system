/* eslint-env browser */

/* 
Ref: https://adrianroselli.com/2023/08/progressively-enhanced-html-accordion.html
exclusive accordion: https://github.com/openui/open-ui/issues/812

<details is="ds-accordian">
<div role="group">
<details name="group" is="ds-accordian"/>
<details name="group" is="ds-accordian"/>
<details name="group" is="ds-accordian"/>
</div>
*/

const is = 'ds-accordion'
customElements.define(
  is,
  class extends HTMLDetailsElement {
    constructor() {
      super()

      const group = this.parentNode
      const summary = this.firstChild
      const name = this.getAttribute('name')

      const closeAllDisclosures = () => {
        const openDetails = group.querySelectorAll(
          `details[name='${name}'][open]`
        )
        // If more than one is open, probably from an
        // in-page search (Chromium browsers), skip
        if (openDetails.length === 1) {
          openDetails[0].open = false
        }
      }

      summary.addEventListener('click', (event) => {
        const open = this.open
        if (name) {
          closeAllDisclosures()
        }
        if (open) {
          this.open = true
        }
      })

      // Handling expanding all, restoring for printing
      let open
      window.addEventListener('beforeprint', (event) => {
        open = this.open
        this.open = true
      })
      window.addEventListener('afterprint', (event) => {
        this.open = open
      })
    }
  },
  { extends: 'details' }
)
