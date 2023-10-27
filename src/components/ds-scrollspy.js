/* eslint-env browser */
// https://www.nngroup.com/articles/table-of-contents/
const d = document

/* <nav is="ds-scrollspy"><ul><li><a href="#id">heading</a></li></ul></nav> */
const anchors = [...d.querySelectorAll('[id]')]
customElements.define(
  'ds-scrollspy',
  class extends HTMLElement {
    constructor() {
      super()

      this.links = this.querySelectorAll('[href^="#"]')

      this.previousY = 0
      this.observer = new IntersectionObserver(
        (entries) => {
          for (const entry of entries) {
            const currentY = entry.boundingClientRect.y
            if (entry.isIntersecting) {
              if (this.previousY < currentY) {
                // next
                this.setActive(entry.target.id)
              } else {
                // previous
                const index = anchors.findIndex(
                  (elem) => elem.id === entry.target.id
                )
                this.setActive(anchors[index - 1]?.id)
              }
              this.previousY = currentY
            }
          }
        },
        {
          rootMargin: '-50% 0px'
        }
      )
    }

    setActiveHash() {
      this.previousY = window.pageYOffset
      this.setActive(window.location.hash.substring(1))
    }
    setActive(id) {
      const item = this.querySelector(`[href="#${id}"]`)
      this.links.forEach((elem) => elem?.removeAttribute('aria-current'))
      item.setAttribute('aria-current', 'true')
    }

    connectedCallback() {
      this.setActiveHash()
      window.addEventListener('hashchange', () => {
        this.setActiveHash()
      })
      this.links.forEach((elem) => {
        const id = elem.href.split('#')[1]
        const anchor = d.querySelector(`[id="${id}"]`)
        this.observer.observe(anchor)
      })
    }

    disconnectedCallback() {
      this.links.forEach((elem) => {
        const id = elem.href.substring(1)
        const anchor = d.querySelector(`[id="${id}"]`)
        this.observer.unobserve(anchor)
      })
    }
  },
  { extends: 'nav' }
)
