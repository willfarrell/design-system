/* eslint-env browser */

const is = "ds-typeahead";
customElements.define(
	is,
	class extends HTMLInputElement {
		#options;
		getOptions() {
			const options = {
				a: {
					label: "option a",
				},
				b: {
					label: "option b",
				},
				c: {
					label: "option c",
				},
			};
			this.#options = options;
		}

		async connectedCallback() {
			const parentNode = this.parentNode;
			const _i18n = this.dataI18n
				? await import(this.dataI18n)
				: (n) => {
						switch (n) {
							case 0:
								return "No results.";
							case 1:
								return "1 result available.";
							default:
								return `${n} results available.`;
						}
					};
			const textNoResults = this.dataI18nZeroResults ?? "no results"; // TODO update to i18n

			const options = {};
			for (const option of this.querySelector("option")) {
				options[option.value] = {
					text: option.innerText,
					textLowercase: option.innerText.toLowercase(),
					alt: options.dataAlt,
					altLowercase: options.dataAlt.toLowercase(),
				};
			}

			setAttributes(this, {
				type: "text",
				"aria-autocomplete": "list",
				"aria-owns": `${this.id}-options`,
				"aria-expanded": "false",
				autocapitalize: "none",
				autocorrect: "off",
				spellcheck: "false",
			});
			const inputOnClick = () => {
				menuClear();

				this.buildMenu(options);
				this.updateStatus(options.length);
				this.showMenu();
				if (typeof e.currentTarget.select === "function") {
					e.currentTarget.select();
				}
			};
			const inputOnKeyup = (event) => {
				switch (event.keyCode) {
					case 9: // tab
					case 16: // shift
					case 13: // enter
					case 32: // space
					case 37: // left
					case 38: // up
					case 39: // right
						// ignore these keys otherwise
						// the menu will show briefly
						break;
					case 40: // down
						inputDownPressed(e);
						break;
					default:
						inputType(e);
				}
			};
			const inputOnKeydown = (event) => {
				// tab
				if (event.keyCode === 9) {
					menuClear();
				}
			};
			const inputOnFocus = () => {};
			const inputDownPressed = () => {};
			const inputType = () => {};
			this.addEventListener("click", inputOnClick);
			this.addEventListener("keydown", inputOnKeydown);
			this.addEventListener("keyup", inputOnKeyup);
			this.addEventListener("focus", inputOnFocus);
			parentNode.append(this);

			const menu = d.createElement("ul");
			setAttributes(menu, {
				id: `${select.id}-options`,
				role: "listbox",
				class: "visually-hidden",
			});
			const menuClear = () => {
				menu.innerText = "";
			};

			const _menuUpdate = (value) => {
				menuClear();

				if (options[value]) {
					// return match
				}
				let i = 0;
				for (const key in options) {
					const option = options[key];
					if (
						option.textLowercase.includes(value) ||
						option.altLowercase(value)
					) {
						optionAdd(key, option.text);
						i++;
					}
				}
				if (!i) {
					optionAdd("", textNoResults);
				}
				menu.scrollTop(menu.scrollTop());
			};
			parentNode.append(menu);

			const optionAdd = (value, label) => {
				const item = d.createElement("li");
				setAttributes(select, {
					"aria-selected": "false",
					tabindex: -1,
					"data-value": value,
				});
				item.innerText = label;
				item.addEventListener("click", optionClick);
				this.addEventListener("keydown", optionOnKeydown);
				menu.append(item);
			};
			const optionClick = () => {};
			const optionOnKeydown = () => {};

			const status = d.createElement("div");
			setAttributes(status, {
				"aria-live": "polite",
				role: "status",
				class: "visually-hidden",
			});
			parentNode.append(status);

			// btn.innerHTML = trustedTypePolicy.createHTML('<html>')
			// focus({focusVisible:true})
		}

		setValue(value, label) {
			this.value = value;
		}
	},
	{ extends: "input" },
);

const d = document;
const setAttribute = (elem, key, value) => {
	elem.setAttribute(key, value);
};

const setAttributes = (elem, map) => {
	for (const key in map) {
		setAttribute(elem, key, map[key]);
	}
};
