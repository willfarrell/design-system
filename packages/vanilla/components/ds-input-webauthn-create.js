/* eslint-env browser */

// https://www.w3.org/TR/webauthn-2
// Source: https://github.com/joostd/passkey-demo/blob/main/index.html
import { startRegistration } from "@simplewebauthn/browser";

const is = "ds-input-webauthn-create";
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

			async handleSubmit(event) {
				event.preventDefault();
				if (this.$pending || this.$submitted) return;
				this.$pending = true;
				try {
					const credential = await startRegistration({
						optionsJSON: this.$options,
					});
					this.value = JSON.stringify(credential);
				} catch (e) {
					if (e.name === "NotAllowedError" || e.name === "AbortError") return;
					this.value = e.name;
				} finally {
					this.$pending = false;
				}
				this.$submitted = true;
				this.$form.submit();
			}

			connectedCallback() {
				this.$form = this.closest("form");
				this.$form?.addEventListener("submit", this.$handleSubmit);
				window.addEventListener("pageshow", this.$handleRestore);
			}

			disconnectedCallback() {
				this.$form?.removeEventListener("submit", this.$handleSubmit);
				window.removeEventListener("pageshow", this.$handleRestore);
			}
		},
		{ extends: "input" },
	);
}
