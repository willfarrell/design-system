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

			handleHashChange = () => {
				this.setActiveHash();
			};

			connectedCallback() {
				this.setActiveHash();
				window.addEventListener("hashchange", this.handleHashChange);
				this.links.forEach((elem) => {
					const id = CSS.escape(elem.hash.substring(1));
					const observable =
						d.querySelector(`section:has(h2#${id})`) ??
						d.querySelector(`#${id}`);
					if (observable) {
						this.observer.observe(observable);
					}
				});
			}

			disconnectedCallback() {
				window.removeEventListener("hashchange", this.handleHashChange);
				this.observer.disconnect();
			}
		},
		{ extends: "nav" },
	);
}
