/* eslint-env browser */

import { startAuthentication } from "@simplewebauthn/browser";

const is = "ds-input-webauthn-get";
if (!customElements.get(is)) {
	customElements.define(
		is,
		class extends HTMLInputElement {
			$form = null;
			$options;
			$pending = false;
			$submitted = false;
			$handleSubmit = (event) => this.handleSubmit(event);
			$handleRestore = (event) => {
				if (event.persisted) location.reload();
			};
			constructor() {
				super();
				this.$options = JSON.parse(this.getAttribute("data-options"));
			}

			async authenticate() {
				try {
					const credential = await startAuthentication({
						optionsJSON: this.$options,
					});
					this.complete(JSON.stringify(credential));
				} catch (e) {
					if (e.name === "NotAllowedError" || e.name === "AbortError") {
						return;
					}
					this.complete(e.name);
				}
			}

			complete(value) {
				if (this.$submitted) return;
				this.value = value;
				this.$submitted = true;
				this.$form.submit();
			}

			async handleSubmit(event) {
				event?.preventDefault();
				if (this.$pending || this.$submitted) return;
				this.$pending = true;
				try {
					await this.authenticate();
				} finally {
					this.$pending = false;
				}
			}

			connectedCallback() {
				this.$form = this.closest("form");
				this.$form?.addEventListener("submit", this.$handleSubmit);
				window.addEventListener("pageshow", this.$handleRestore);
				if (!this.getAttribute("autocomplete")?.includes("webauthn")) return;
				if (document.hasFocus()) {
					this.$handleSubmit();
				} else {
					window.addEventListener("focus", this.$handleSubmit, { once: true });
				}
			}

			disconnectedCallback() {
				this.$form?.removeEventListener("submit", this.$handleSubmit);
				window.removeEventListener("focus", this.$handleSubmit);
				window.removeEventListener("pageshow", this.$handleRestore);
			}
		},
		{ extends: "input" },
	);
}
