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
		$handleRestore = (event) => {
			if (event.persisted) location.reload();
		};
		constructor() {
			super();

			this.$input = this.querySelector("[data-options]");
			this.$options = JSON.parse(this.$input.getAttribute("data-options"));
			this.$loader = this.querySelector('[data-loader="false"]');
		}

		async authenticate(useBrowserAutofill) {
			try {
				const credential = await startAuthentication({
					optionsJSON: this.$options,
					useBrowserAutofill,
				});
				this.complete(JSON.stringify(credential));
			} catch (e) {
				if (
					useBrowserAutofill ||
					e.name === "NotAllowedError" ||
					e.name === "AbortError"
				) {
					return;
				}
				this.complete(e.name);
			}
		}

		complete(value) {
			if (this.$submitted) return;
			this.$input.value = value;
			this.$input.setAttribute("value", value);
			this.$submitted = true;
			this.submit();
			this.$loader?.setAttribute("data-loader", "true");
		}

		async handleSubmit(event) {
			event?.preventDefault();
			if (this.$pending || this.$submitted) return;
			this.$pending = true;
			try {
				await this.authenticate(false);
			} finally {
				this.$pending = false;
			}
		}

		connectedCallback() {
			this.addEventListener("submit", this.$handleSubmit);
			window.addEventListener("pageshow", this.$handleRestore);

			if (this.$input.getAttribute("autocomplete")?.includes("webauthn")) {
				this.authenticate(true);
			}
		}

		disconnectedCallback() {
			this.removeEventListener("submit", this.$handleSubmit);
			window.removeEventListener("pageshow", this.$handleRestore);
		}
	},
	{ extends: "form" },
);
