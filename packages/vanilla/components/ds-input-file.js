/* eslint-env browser */

customElements.define(
	"ds-input-file",
	class extends HTMLInputElement {
		handleClick = () => {
			this.previous = [...(this.files ?? [])];
			this.value = "";
		};

		handleCancel = () => {
			if (!this.previous?.length) return;
			const data = new DataTransfer();
			for (const file of this.previous) data.items.add(file);
			this.files = data.files;
		};

		handleDrop = (event) => {
			if (!event.dataTransfer?.files?.length) return;
			event.preventDefault();
			this.assign(event.dataTransfer.files);
		};

		handlePaste = (event) => {
			this.assign(event.clipboardData?.files);
		};

		assign(files) {
			if (!files?.length) return;
			this.files = files;
			this.dispatchEvent(new Event("change", { bubbles: true }));
		}

		connectedCallback() {
			this.addEventListener("click", this.handleClick);
			this.addEventListener("cancel", this.handleCancel);
			this.addEventListener("drop", this.handleDrop);
			this.addEventListener("paste", this.handlePaste);
		}

		disconnectedCallback() {
			this.removeEventListener("click", this.handleClick);
			this.removeEventListener("cancel", this.handleCancel);
			this.removeEventListener("drop", this.handleDrop);
			this.removeEventListener("paste", this.handlePaste);
		}
	},
	{ extends: "input" },
);
