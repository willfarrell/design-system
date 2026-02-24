/* eslint-env browser */
import { createKeybindingsHandler } from "tinykeys";

const is = "ds-input-focus";

customElements.define(
	is,
	class extends HTMLInputElement {
		constructor() {
			super();
			const keys = this.getAttribute("data-keys") ?? ""; // $mod+k

			this.handler = createKeybindingsHandler({
				[keys]: () => {
					this.focus();
				},
			});
		}

		handleKeyDown(event) {
			if (!(event instanceof KeyboardEvent)) {
				return;
			}
			this.handler(event);
		}
		connectedCallback() {
			window.addEventListener("keydown", this.handleKeyDown.bind(this));
		}

		disconnectedCallback() {
			window.removeEventListener("keydown", this.handleKeyDown.bind(this));
		}
	},
	{ extends: "input" },
);

// const parseKeys = (keys) => {

// }
