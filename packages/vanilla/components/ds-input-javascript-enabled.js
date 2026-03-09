/* eslint-env browser */

const is = "ds-input-javascript-enabled";
customElements.define(
	is,
	class extends HTMLInputElement {
		connectedCallback() {
			this.removeAttribute("value");
			this.value = "true";
			this.setAttribute("value", "true"); // optional: set attribute if you need markup to reflect it
			this.dispatchEvent(new Event("input", { bubbles: true })); // make frameworks notice
		}
	},
	{ extends: "input" },
);
