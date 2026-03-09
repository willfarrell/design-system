/* eslint-env browser */

import { startAuthentication } from "@simplewebauthn/browser";

const is = "ds-input-webauthn-get";
customElements.define(
	is,
	class extends HTMLInputElement {
		$options;
		$input;
		constructor() {
			super();
			this.$form = this.closest("form");
			this.$options = JSON.parse(this.getAttribute("data-options"));

			if (this.getAttribute("autocomplete").includes("webauthn")) {
				this.handleFormdata();
			}
		}

		handleFormdata = async (event) => {
			try {
				const credential = await startAuthentication({
					optionsJSON: this.$options,
				});
				const value = JSON.stringify(credential);
				event.formData.append(this.name, value);
			} catch (e) {
				// clicking `Cancel` triggers error
				console.error(e);
			}
		};

		connectedCallback() {
			this.$form.addEventListener("formdata", this.handleFormdata);
		}

		disconnectedCallback() {
			this.$form.removeEventListener("formdata", this.handleFormdata);
		}
	},
	{ extends: "input" },
);
