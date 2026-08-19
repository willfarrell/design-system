/* eslint-env browser */

const is = "ds-input-timezone";
customElements.define(
	is,
	class extends HTMLInputElement {
		connectedCallback() {
			const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
			if (!timezone) return;
			this.value = timezone;
			this.setAttribute("value", timezone); // reflect for markup that reads it
			this.dispatchEvent(new Event("input", { bubbles: true }));
		}
	},
	{ extends: "input" },
);
