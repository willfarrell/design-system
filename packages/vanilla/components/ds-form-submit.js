/* eslint-env browser */

const is = "ds-form-submit";
customElements.define(
	is,
	class extends HTMLFormElement {
		$submitted = false;
		$loader = null;
		$onChange = false;
		$reset = () => {
			this.$submitted = false;
			this.removeAttribute("aria-busy");
			this.$loader?.setAttribute("data-loader", "false");
		};
		constructor() {
			super();

			this.$loader = this.querySelector('[data-loader="false"]');
			this.$onChange = this.getAttribute("data-onchange") === "true";
			if (this.$onChange) {
				// remove primary submit button, skip search
				const submitButtons = this.querySelectorAll('[type="submit"]');
				submitButtons[submitButtons.length - 1].remove();
			}
		}

		handleSubmit(event) {
			event.preventDefault();
			if (!this.$submitted) {
				this.$submitted = true;
				this.setAttribute("aria-busy", "true");
				this.submit();
				this.$loader?.setAttribute("data-loader", "true");
			}
		}

		connectedCallback() {
			this.addEventListener("submit", this.handleSubmit);
			window.addEventListener("pageshow", this.$reset);
			if (this.$onChange) {
				this.addEventListener("change", this.handleSubmit);
			}
		}

		disconnectedCallback() {
			this.removeEventListener("submit", this.handleSubmit);
			window.removeEventListener("pageshow", this.$reset);
			if (this.$onChange) {
				this.removeEventListener("change", this.handleSubmit);
			}
		}
	},
	{ extends: "form" },
);
