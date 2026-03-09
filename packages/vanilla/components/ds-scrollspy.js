/* eslint-env browser */
// https://www.nngroup.com/articles/table-of-contents/
// docs: https://www.sarasoueidan.com/blog/css-scrollspy/
const d = document;

/* <nav is="ds-scrollspy"><ol><li><a href="#id">heading</a></li></ol></nav> */

// TODO deprecate when baseline - https://caniuse.com/wf-scroll-target-group
const isScrollTargetGroupSupported = window.CSS?.supports(
	"scroll-target-group",
	"auto",
);

if (!isScrollTargetGroupSupported) {
	customElements.define(
		"ds-scrollspy",
		class extends HTMLElement {
			constructor() {
				super();

				this.links = this.querySelectorAll('[href^="#"]');
				this.active = {};
				this.observer = new IntersectionObserver(
					(entries) => {
						for (const entry of entries) {
							let id = entry.target.id;
							if (!id) {
								id = entry.target.querySelector("h2[id]")?.id;
							}
							if (id) {
								const hash = `#${id}`;
								this.active[hash] = entry.isIntersecting;
							}
						}
						this.updateActive();
					},
					{
						// Anything that appears in the top 50% of the page
						rootMargin: "0% 0% -50% 0%",
					},
				);
			}

			updateActive() {
				this.links.forEach((elem) => {
					if (this.active[elem.hash]) {
						elem.setAttribute("aria-current", "true");
					} else {
						elem.removeAttribute("aria-current");
					}
				});
			}

			setActiveHash() {
				const id = window.location.hash;
				if (id) {
					this.active = { [id]: true };
				}
				this.updateActive();
			}

			connectedCallback() {
				this.setActiveHash();
				window.addEventListener("hashchange", () => {
					this.setActiveHash();
				});
				this.links.forEach((elem) => {
					const id = elem.hash.substring(1);
					let observable = d.querySelector(`section:has(h2[id="${id}"])`);
					if (!observable) {
						observable = d.querySelector(`[id="${id}"]`);
					}
					this.observer.observe(observable);
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
}
