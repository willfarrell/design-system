/* eslint-env browser */

import { startAuthentication } from "@simplewebauthn/browser";

const is = "ds-form-webauthn-get";
customElements.define(
	is,
	class extends HTMLFormElement {
		$pending = false;
		$submitted = false;
		$loader = null;
		$handleSubmit = (event) => this.handleSubmit(event);
		constructor() {
			super();

			this.$input = this.querySelector("[data-options]");
			this.$options = JSON.parse(this.$input.getAttribute("data-options"));
			this.$loader = this.querySelector('[data-loader="false"]');
		}

		async handleSubmit(event) {
			event?.preventDefault();
			if (this.$pending || this.$submitted) return;
			this.$pending = true;
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
			} finally {
				this.$pending = false;
			}
		}

		connectedCallback() {
			this.addEventListener("submit", this.$handleSubmit);

			if (this.$input.getAttribute("autocomplete").includes("webauthn")) {
				if (document.hasFocus()) {
					this.$handleSubmit();
				} else {
					window.addEventListener("focus", this.$handleSubmit, { once: true });
				}
			}
		}

		disconnectedCallback() {
			this.removeEventListener("submit", this.$handleSubmit);
			window.removeEventListener("focus", this.$handleSubmit);
		}
	},
	{ extends: "form" },
);
