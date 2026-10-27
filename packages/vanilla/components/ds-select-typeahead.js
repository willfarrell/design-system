/* eslint-env browser */
import { createCombobox } from "./typeahead.js";

const d = document;
const is = "ds-select-typeahead";
const moved = ["aria-describedby", "aria-invalid", "required", "disabled"];

if (!customElements.get(is)) {
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
						group: option.closest("optgroup")?.label,
						search: `${option.label} ${alt}`.toLowerCase(),
					});
				}

				const input = d.createElement("input");
				input.type = "text";
				input.id = id;
				for (const name of moved) {
					if (!this.hasAttribute(name)) continue;
					input.setAttribute(name, this.getAttribute(name));
					if (name !== "disabled") this.removeAttribute(name);
				}
				const autocomplete = this.getAttribute("autocomplete");
				this.removeAttribute("autocomplete");
				this.id = `${id}-select`;
				this.setAttribute("aria-hidden", "true");
				this.setAttribute("tabindex", "-1");
				this.classList.add("visually-hidden");

				const selected = this.options[this.selectedIndex];
				if (selected?.value) {
					input.value = selected.label;
				}
				this.after(input);

				const invalid =
					this.dataset.i18nInvalid ?? "Choose an option from the list.";
				const validate = () => {
					const query = input.value.trim().toLowerCase();
					const exact = options.find(
						(option) => option.label.toLowerCase() === query,
					);
					if (exact && exact.value !== this.value) {
						this.value = exact.value;
						this.dispatchEvent(new Event("change", { bubbles: true }));
					}
					input.setCustomValidity(!query || exact ? "" : invalid);
				};

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
						validate();
					},
					onCancel: () => {
						validate();
						const current = this.options[this.selectedIndex];
						input.value = current?.value ? current.label : "";
						validate();
					},
				});
				input.addEventListener("input", validate);
				if (autocomplete) input.setAttribute("autocomplete", autocomplete);

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
}
