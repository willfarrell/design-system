/* eslint-env browser */

const is = "ds-card";
// mousedown/mouseup with delay guard is intentional — prevents navigation
// during text selection (holding >200ms). The internal <a> handles keyboard
// access (Tab + Enter). Do not replace with a click listener. (a11y audit C3)
const delayInMiliSeconds = 200;
customElements.define(
	is,
	class extends HTMLElement {
		constructor() {
			super();
			this.link = this.querySelector("a:first-of-type");
		}

		handleMouseDown() {
			this.down = +Date.now();
		}

		handleMouseUp() {
			this.up = +Date.now();
			if (this.up - this.down < delayInMiliSeconds) {
				this.link.click();
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
