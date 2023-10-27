/* eslint-env browser */
/* global trustedTypePolicy */
// https://www.w3.org/WAI/ARIA/apg/patterns/disclosure/examples/disclosure-navigation/
const d = document
customElements.define(
  'nav-dropdown',
  class extends HTMLAnchorElement {
    constructor () {
      super()
      const id = this.nextElementSibling.getAttribute('id')
      const parent = this.parentElement

      const toggle = function (elem, forceState) {
        if (elem.target) {
          elem = elem.target
        }
        while (!elem.ariaControls) {
          elem = elem.parentElement
        }
        const state =
          forceState ?? !(btn.getAttribute('aria-expanded') === 'true') // !(elem.ariaExpanded === 'true')
        // Managed by click off monitoring
        // const dropdowns = document.querySelectorAll('[aria-controls^=nav-]')
        // for (const dropdown of dropdowns) {
        //   dropdown.setAttribute(expanded, 'false')
        // }

        // elem.ariaExpanded = String(state)
        btn.setAttribute('aria-expanded', String(state)) // For FireFox, deprecate later
      }

      /* <button aria-controls="nav-about" aria-expanded="true" /> */
      const btn = d.createElement('button')
      btn.ariaControls = id // .setAttribute('aria-controls', id)
      // btn.ariaExpanded = 'false' // .setAttribute(expanded, 'false')
      btn.setAttribute('aria-expanded', 'false') // For FireFox, deprecate later
      btn.className = this.className
      btn.innerHTML = trustedTypePolicy.createHTML(this.innerHTML) // innerText
      btn.addEventListener('click', toggle)
      this.parentNode.replaceChild(btn, this)
      // this.insertAdjacentElement('afterend', btn)
      // this.remove()

      // TODO CPU heavy, refactor
      d.addEventListener('keyup', (event) => {
        if (event.key === 'Escape') {
          toggle(btn, false)
        }
      })
      d.addEventListener('click', (event) => {
        if (!parent.contains(event.target)) {
          toggle(btn, false)
        }
      })
    }
  },
  { extends: 'a' }
)
