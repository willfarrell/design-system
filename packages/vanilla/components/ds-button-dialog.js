/* eslint-env browser */
const d = document;
// const body = d.querySelector('body')

/* <button is="ds-button-dialog" data-dialog="dialog">Open</button> */
customElements.define(
	"ds-button-dialog",
	class extends HTMLButtonElement {
		constructor() {
			super();
			// const attr = (attr) => this.getAttribute(`data-${attr}`)
			this.$dialog = d.getElementById(this.getAttribute("data-dialog"));
		}

		handleShow() {
			this.setAttribute("aria-expanded", "true");
			this.$dialog.inert = false;
			this.$dialog?.showModal();
			this.$dialog.open = true;
		}

		connectedCallback() {
			this.setAttribute("aria-haspopup", "dialog");
			this.setAttribute("aria-expanded", "false");
			this.addEventListener("click", this.handleShow);
		}

		disconnectedCallback() {
			this.removeEventListener("click", this.handleShow);
		}
	},
	{ extends: "button" },
);
