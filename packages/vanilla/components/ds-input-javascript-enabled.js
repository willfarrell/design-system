/* eslint-env browser */

const is = "ds-input-javascript-enabled";
if (!customElements.get(is)) {
	customElements.define(
		is,
		class extends HTMLInputElement {
			connectedCallback() {
				this.value = "true";
				this.setAttribute("value", "true"); // optional: set attribute if you need markup to reflect it
				this.dispatchEvent(new Event("input", { bubbles: true })); // make frameworks notice
			}
		},
		{ extends: "input" },
	);
}
