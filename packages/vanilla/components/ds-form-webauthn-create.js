/* eslint-env browser */

// https://www.w3.org/TR/webauthn-2
// Source: https://github.com/joostd/passkey-demo/blob/main/index.html
import { startRegistration } from "@simplewebauthn/browser";

const is = "ds-form-webauthn-create";
customElements.define(
	is,
	class extends HTMLFormElement {
		$pending = false;
		$submitted = false;
		$loader = null;
		$handleSubmit = (event) => this.handleSubmit(event);
		$handleRestore = (event) => {
			if (event.persisted) location.reload();
		};
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
				const credential = await startRegistration({
					optionsJSON: this.$options,
				});
				const value = JSON.stringify(credential);
				this.$input.value = value;
				this.$input.setAttribute("value", value); // optional: set attribute if you need markup to reflect it

				this.$submitted = true;
				this.submit();
				this.$loader?.setAttribute("data-loader", "true");
			} catch (e) {
				console.error(e);
				if (e.name === "NotAllowedError" || e.name === "AbortError") return;
				this.$input.value = e.name;
				this.$submitted = true;
				this.submit();
			} finally {
				this.$pending = false;
			}
		}

		connectedCallback() {
			this.addEventListener("submit", this.$handleSubmit);
			window.addEventListener("pageshow", this.$handleRestore);
		}

		disconnectedCallback() {
			this.removeEventListener("submit", this.$handleSubmit);
			window.removeEventListener("pageshow", this.$handleRestore);
		}
	},
	{ extends: "form" },
);
