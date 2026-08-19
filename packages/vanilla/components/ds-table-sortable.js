/* eslint-env browser */

const d = document;
const is = "ds-table-sortable";

const collator = new Intl.Collator(undefined, {
	numeric: true,
	sensitivity: "base",
});

// <data value> holds the unformatted value; textContent is localized, so "1,234"
// would numeric-collate as 1. <time datetime> likewise.
const machineSelector = "[data-value], data[value], time[datetime]";
const sortKey = (cell) => {
	const node = cell?.matches(machineSelector)
		? cell
		: cell?.querySelector(machineSelector);
	return (
		node?.dataset.value ??
		node?.getAttribute("value") ??
		node?.dateTime ??
		cell?.textContent.trim() ??
		""
	);
};

customElements.define(
	is,
	class extends HTMLTableElement {
		#buttons = [];

		handleClick = (event) => {
			const th = event.currentTarget.parentElement;
			const direction =
				th.getAttribute("aria-sort") === "ascending"
					? "descending"
					: "ascending";
			for (const header of this.querySelectorAll("thead th")) {
				header.removeAttribute("aria-sort");
			}
			th.setAttribute("aria-sort", direction);
			const index = th.cellIndex;
			const order = direction === "ascending" ? 1 : -1;
			for (const tbody of this.tBodies) {
				const rows = [...tbody.rows].sort(
					(a, b) =>
						order *
						collator.compare(sortKey(a.cells[index]), sortKey(b.cells[index])),
				);
				tbody.append(...rows);
			}
		};

		connectedCallback() {
			for (const th of this.querySelectorAll("thead th")) {
				const button = d.createElement("button");
				button.type = "button";
				button.append(...th.childNodes);
				button.addEventListener("click", this.handleClick);
				th.append(button);
				this.#buttons.push(button);
			}
		}

		disconnectedCallback() {
			for (const button of this.#buttons) {
				button.removeEventListener("click", this.handleClick);
				button.replaceWith(...button.childNodes);
			}
			this.#buttons = [];
		}
	},
	{ extends: "table" },
);
