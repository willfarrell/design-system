/* eslint-env browser */

const is = "ds-task-sortable";

const collator = new Intl.Collator(undefined, {
	numeric: true,
	sensitivity: "base",
});

customElements.define(
	is,
	class extends HTMLDivElement {
		handleChange = () => {
			const value = this.select.value;
			const descending = value.startsWith("-");
			const attribute = `data-sort-${descending ? value.slice(1) : value}`;
			const order = descending ? -1 : 1;
			const tasks = [...this.list.children].sort(
				(a, b) =>
					order *
					collator.compare(
						a.getAttribute(attribute) ?? "",
						b.getAttribute(attribute) ?? "",
					),
			);
			this.list.append(...tasks);
		};

		connectedCallback() {
			this.list = this.querySelector("ul");
			this.select = this.querySelector("select");
			this.select?.addEventListener("change", this.handleChange);
		}

		disconnectedCallback() {
			this.select?.removeEventListener("change", this.handleChange);
		}
	},
	{ extends: "div" },
);
