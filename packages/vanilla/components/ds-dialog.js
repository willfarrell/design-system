/* eslint-env browser */
// const d = document
// const body = d.querySelector('body')

/* <dialog id="dialog" is="ds-dialog" inert /> */
if (!customElements.get("ds-dialog")) {
	customElements.define(
		"ds-dialog",
		class extends HTMLDialogElement {
			// constructor() {
			//   super()
			// }

			handleClose(event) {
				this.inert = true;
				const trigger = document.querySelector(
					`[data-dialog="${CSS.escape(this.id)}"]`,
				);
				trigger?.setAttribute("aria-expanded", "false");
				trigger?.focus();
			}

			handleClick(e) {
				if (e.target.nodeName === "DIALOG" && e.target.hasAttribute("open")) {
					this.close();
				}
			}

			connectedCallback() {
				this.addEventListener("close", this.handleClose);
				this.addEventListener("click", this.handleClick);
			}

			disconnectedCallback() {
				this.removeEventListener("close", this.handleClose);
				this.removeEventListener("click", this.handleClick);
			}
		},
		{ extends: "dialog" },
	);
}
