/* eslint-env browser */
// https://www.nngroup.com/articles/table-of-contents/
const d = document;

/* <nav is="ds-scrollspy"><ul><li><a href="#id">heading</a></li></ul></nav> */
const anchors = [...d.querySelectorAll("[id]")];
customElements.define(
  "ds-scrollspy",
  class extends HTMLElement {
    constructor() {
      super();

      this.links = this.querySelectorAll('[href^="#"]');
      this.previousY = 0;
      this.observer = new IntersectionObserver(
        (entries) => {
          for (const entry of entries) {
            const currentY = entry.boundingClientRect.y;
            if (entry.isIntersecting) {
              if (this.previousY < currentY) {
                // next
                this.setActive(entry.target.id);
              } else {
                // previous
                for (let i = this.links.length; i--; ) {
                  const id = this.links[i].hash.substring(1);
                  if (id === entry.target.id) {
                    this.setActive(this.links[i - 1].hash.substring(1));
                    break;
                  }
                }
              }
              this.previousY = currentY;
            }
          }
        },
        {
          rootMargin: "-50% 0px",
        },
      );
    }

    setActiveHash() {
      const id = window.location.hash.substring(1);
      this.previousY = window.pageYOffset;
      this.setActive(id);
    }
    setActive(id) {
      const item = this.querySelector(`[href="#${id}"]`);
      if (item) {
        this.links.forEach((elem) => {
          elem?.removeAttribute("aria-current");
        });
        item.setAttribute("aria-current", "page");
      }
    }

    connectedCallback() {
      this.setActiveHash();
      window.addEventListener("hashchange", () => {
        this.setActiveHash();
      });
      this.links.forEach((elem) => {
        const id = elem.hash.substring(1);
        const anchor = d.querySelector(`[id="${id}"]`);
        this.observer.observe(anchor);
      });
    }

    disconnectedCallback() {
      this.links.forEach((elem) => {
        const id = elem.hash.substring(1);
        const anchor = d.querySelector(`[id="${id}"]`);
        this.observer.unobserve(anchor);
      });
    }
  },
  { extends: "nav" },
);
