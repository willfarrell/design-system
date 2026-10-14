/* eslint-env browser */
import { controlValue } from "./control-value.js";

const d = document;
const is = "ds-download";

if (!customElements.get(is)) {
	customElements.define(
		is,
		class extends HTMLButtonElement {
			handleClick = () => {
				const url = URL.createObjectURL(
					new Blob([controlValue(this)], { type: "text/plain" }),
				);
				const link = d.createElement("a");
				link.href = url;
				link.download = this.dataset.filename || "download.txt";
				// In the document and revoked on a later tick: a detached anchor or an
				// object URL revoked in the same task drops the download in some browsers
				d.body.append(link);
				link.click();
				link.remove();
				setTimeout(() => URL.revokeObjectURL(url), 0);
			};

			connectedCallback() {
				this.addEventListener("click", this.handleClick);
			}

			disconnectedCallback() {
				this.removeEventListener("click", this.handleClick);
			}
		},
		{ extends: "button" },
	);
}
