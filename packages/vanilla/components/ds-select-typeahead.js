/* eslint-env browser */
import { createCombobox } from "./typeahead.js";

const d = document;
const is = "ds-select-typeahead";

customElements.define(
	is,
	class extends HTMLSelectElement {
		#combobox;

		connectedCallback() {
			if (this.#combobox) return;
			const id = this.id;

			const options = [];
			for (const option of this.options) {
				if (!option.value) continue;
				const alt = option.dataset.alt ?? "";
				options.push({
					value: option.value,
					label: option.label,
					search: `${option.label} ${alt}`.toLowerCase(),
				});
			}

			const input = d.createElement("input");
			input.type = "text";
			input.id = id;
			this.id = `${id}-select`;
			this.setAttribute("aria-hidden", "true");
			this.setAttribute("tabindex", "-1");
			this.classList.add("visually-hidden");

			const selected = this.options[this.selectedIndex];
			if (selected?.value) {
				input.value = selected.label;
			}
			this.after(input);

			const filter = (query) => {
				const match = query.trim().toLowerCase();
				return match
					? options.filter((option) => option.search.includes(match))
					: options;
			};

			const combobox = createCombobox({
				input,
				id,
				showAllOnClick: true,
				noResults: () => this.dataset.i18nNoResults ?? "No results found.",
				onQuery: (query) => {
					combobox.render(filter(query));
				},
				onConfirm: (item) => {
					this.value = item.value;
					this.dispatchEvent(new Event("change", { bubbles: true }));
					input.value = item.label;
				},
				onCancel: () => {
					const current = this.options[this.selectedIndex];
					input.value = current?.value ? current.label : "";
				},
			});

			input.classList.add("autocomplete__input--show-all-values");
			const svg = d.createElementNS("http://www.w3.org/2000/svg", "svg");
			svg.setAttribute("class", "autocomplete__dropdown-arrow-down");
			svg.setAttribute("viewBox", "0 0 512 512");
			svg.setAttribute("aria-hidden", "true");
			svg.setAttribute("focusable", "false");
			const path = d.createElementNS("http://www.w3.org/2000/svg", "path");
			path.setAttribute(
				"d",
				"M256,298.3L512,131.1l-37.5-36.1L256,226.8L37.5,95L0,131.1L256,298.3z",
			);
			svg.append(path);
			combobox.wrapper.append(svg);

			this.#combobox = combobox;
		}
	},
	{ extends: "select" },
);
