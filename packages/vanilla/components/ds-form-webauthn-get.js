/* eslint-env browser */

import { startAuthentication } from "@simplewebauthn/browser";

const is = "ds-form-webauthn-get";
customElements.define(
	is,
	class extends HTMLFormElement {
		$submitted = false;
		$loader = null;
		constructor() {
			super();

			this.$input = this.querySelector("[data-options]");
			this.$options = JSON.parse(this.$input.getAttribute("data-options"));
			this.$loader = this.querySelector('[data-loader="false"]');

			if (this.$input.getAttribute("autocomplete").includes("webauthn")) {
				this.handleSubmit();
			}
		}

		async handleSubmit(event) {
			event?.preventDefault();
			try {
				const credential = await startAuthentication({
					optionsJSON: this.$options,
				});
				const value = JSON.stringify(credential);
				this.$input.value = value;
				this.$input.setAttribute("value", value); // optional: set attribute if you need markup to reflect it

				this.$submitted = true;
				this.submit();
				this.$loader?.setAttribute("data-loader", "true");
			} catch (e) {
				// clicking `Cancel` triggers error
				console.error(e);
			}
		}

		connectedCallback() {
			this.addEventListener("submit", this.handleSubmit);
		}

		disconnectedCallback() {
			this.removeEventListener("submit", this.handleSubmit);
		}
	},
	{ extends: "form" },
);
