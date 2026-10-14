/* eslint-env browser */

const is = "ds-card";
// mousedown/mouseup with delay guard is intentional — prevents navigation
// during text selection (holding >200ms). The internal <a> handles keyboard
// access (Tab + Enter). Do not replace with a click listener. (a11y audit C3)
const delayInMiliSeconds = 200;
if (!customElements.get(is)) {
	customElements.define(
		is,
		class extends HTMLElement {
			handleMouseDown() {
				this.down = +Date.now();
			}

			handleMouseUp(event) {
				if (
					event.button !== 0 ||
					event.ctrlKey ||
					event.metaKey ||
					event.shiftKey ||
					event.altKey
				) {
					return;
				}
				// Looked up here, not in the constructor: children aren't parsed yet there,
				// and a card with no link (a metric, a stat) has nothing to activate.
				const link = this.querySelector("a:first-of-type");
				if (!link || link.contains(event.target)) {
					return;
				}
				this.up = +Date.now();
				if (this.up - this.down < delayInMiliSeconds) {
					link.click();
				}
			}

			connectedCallback() {
				this.addEventListener("mousedown", this.handleMouseDown);
				this.addEventListener("mouseup", this.handleMouseUp);
			}

			disconnectedCallback() {
				this.removeEventListener("mousedown", this.handleMouseDown);
				this.removeEventListener("mouseup", this.handleMouseUp);
			}
		},
		{ extends: "article" },
	);
}
