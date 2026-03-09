/* eslint-env browser */

const d = document;
const is = "ds-select";

customElements.define(
	is,
	class extends HTMLSelectElement {
		#input;
		#menu;
		#status;
		#options = [];
		#activeIndex = -1;
		#cleanup = [];

		getOptions() {
			const options = [];
			for (const option of this.querySelectorAll("option")) {
				const alt = option.dataset.alt ?? "";
				options.push({
					value: option.value,
					text: option.textContent,
					textLowercase: option.textContent.toLowerCase(),
					alt,
					altLowercase: alt.toLowerCase(),
				});
			}
			this.#options = options;
		}

		connectedCallback() {
			const parentNode = this.parentNode;

			this.getOptions();

			// Hide native select
			this.setAttribute("aria-hidden", "true");
			this.setAttribute("tabindex", "-1");
			this.classList.add("visually-hidden");

			// Create text input
			const input = d.createElement("input");
			input.type = "text";
			input.setAttribute("aria-autocomplete", "list");
			input.setAttribute("aria-owns", `${this.id}-options`);
			input.setAttribute("aria-expanded", "false");
			input.setAttribute("role", "combobox");
			input.setAttribute("autocapitalize", "none");
			input.setAttribute("autocomplete", "off");
			input.setAttribute("spellcheck", "false");
			if (this.id) {
				input.id = `${this.id}-input`;
			}

			// Copy label association
			const label = parentNode.querySelector(`label[for="${this.id}"]`);
			if (label) {
				label.setAttribute("for", input.id);
			}

			const onInput = () => {
				const value = input.value.toLowerCase();
				this.#buildMenu(value);
				this.#showMenu();
			};

			const onClick = () => {
				if (this.#menu.children.length === 0) {
					this.#buildMenu("");
				}
				this.#showMenu();
				input.select();
			};

			const onKeydown = (event) => {
				switch (event.key) {
					case "ArrowDown":
						event.preventDefault();
						if (input.getAttribute("aria-expanded") === "false") {
							this.#buildMenu("");
							this.#showMenu();
						}
						this.#setActiveOption(this.#activeIndex + 1);
						break;
					case "ArrowUp":
						event.preventDefault();
						this.#setActiveOption(this.#activeIndex - 1);
						break;
					case "Enter":
						event.preventDefault();
						if (this.#activeIndex >= 0) {
							this.#selectOption(this.#activeIndex);
						}
						break;
					case "Escape":
						this.#hideMenu();
						input.value = this.#getSelectedText();
						break;
					case "Tab":
						this.#hideMenu();
						break;
				}
			};

			const onBlur = (event) => {
				// Delay to allow click on option
				setTimeout(() => {
					if (!this.#menu.contains(d.activeElement)) {
						this.#hideMenu();
						input.value = this.#getSelectedText();
					}
				}, 150);
			};

			input.addEventListener("input", onInput);
			input.addEventListener("click", onClick);
			input.addEventListener("keydown", onKeydown);
			input.addEventListener("blur", onBlur);
			this.#cleanup.push(
				() => input.removeEventListener("input", onInput),
				() => input.removeEventListener("click", onClick),
				() => input.removeEventListener("keydown", onKeydown),
				() => input.removeEventListener("blur", onBlur),
			);

			this.#input = input;
			this.after(input);

			// Create listbox
			const menu = d.createElement("ul");
			menu.id = `${this.id}-options`;
			menu.setAttribute("role", "listbox");
			menu.style.cssText =
				"position:absolute;z-index:1;max-block-size:15rem;overflow:auto;";
			menu.hidden = true;
			this.#menu = menu;
			input.after(menu);

			// Create status region
			const status = d.createElement("div");
			status.setAttribute("aria-live", "polite");
			status.setAttribute("role", "status");
			status.classList.add("visually-hidden");
			this.#status = status;
			menu.after(status);

			// Set initial value
			if (this.selectedIndex >= 0) {
				const selected = this.options[this.selectedIndex];
				if (selected?.value) {
					input.value = selected.textContent;
				}
			}
		}

		disconnectedCallback() {
			for (const fn of this.#cleanup) fn();
			this.#cleanup = [];
			this.#input?.remove();
			this.#menu?.remove();
			this.#status?.remove();
		}

		#getSelectedText() {
			const selected = this.options[this.selectedIndex];
			return selected?.value ? selected.textContent : "";
		}

		#buildMenu(filter) {
			this.#menu.innerHTML = "";
			this.#activeIndex = -1;

			const matches = filter
				? this.#options.filter(
						(o) =>
							o.textLowercase.includes(filter) ||
							o.altLowercase.includes(filter),
					)
				: this.#options.filter((o) => o.value);

			if (matches.length === 0) {
				const item = d.createElement("li");
				item.setAttribute("role", "option");
				item.setAttribute("aria-disabled", "true");
				item.textContent = this.dataset.i18nNoResults ?? "No results.";
				this.#menu.append(item);
				this.#updateStatus(0);
				return;
			}

			for (const option of matches) {
				const item = d.createElement("li");
				item.setAttribute("role", "option");
				item.setAttribute("aria-selected", "false");
				item.setAttribute("tabindex", "-1");
				item.dataset.value = option.value;
				item.textContent = option.text;

				const onOptionClick = () => {
					const idx = [...this.#menu.children].indexOf(item);
					this.#selectOption(idx);
				};
				item.addEventListener("click", onOptionClick);
				this.#menu.append(item);
			}

			this.#updateStatus(matches.length);
		}

		#showMenu() {
			this.#menu.hidden = false;
			this.#input.setAttribute("aria-expanded", "true");
		}

		#hideMenu() {
			this.#menu.hidden = true;
			this.#input.setAttribute("aria-expanded", "false");
			this.#input.removeAttribute("aria-activedescendant");
			this.#activeIndex = -1;
		}

		#setActiveOption(index) {
			const items = this.#menu.querySelectorAll(
				'[role="option"]:not([aria-disabled])',
			);
			if (items.length === 0) return;

			// Clamp
			if (index < 0) index = 0;
			if (index >= items.length) index = items.length - 1;

			// Deactivate previous
			for (const item of items) {
				item.classList.remove("active");
			}

			this.#activeIndex = index;
			const active = items[index];
			active.classList.add("active");

			// Ensure ID for activedescendant
			if (!active.id) {
				active.id = `${this.id}-option-${index}`;
			}
			this.#input.setAttribute("aria-activedescendant", active.id);

			// Scroll into view
			active.scrollIntoView({ block: "nearest" });
		}

		#selectOption(index) {
			const items = this.#menu.querySelectorAll(
				'[role="option"]:not([aria-disabled])',
			);
			if (index < 0 || index >= items.length) return;

			const item = items[index];
			const value = item.dataset.value;
			const label = item.textContent;

			// Update native select
			this.value = value;
			this.dispatchEvent(new Event("change", { bubbles: true }));

			// Update input
			this.#input.value = label;
			this.#hideMenu();
			this.#input.focus();
		}

		#updateStatus(count) {
			switch (count) {
				case 0:
					this.#status.textContent = "No results.";
					break;
				case 1:
					this.#status.textContent = "1 result available.";
					break;
				default:
					this.#status.textContent = `${count} results available.`;
			}
		}
	},
	{ extends: "select" },
);
