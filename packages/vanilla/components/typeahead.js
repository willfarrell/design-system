/* eslint-env browser */

const d = document;

export const defaultStatusText = (n) => {
	switch (n) {
		case 0:
			return "No results.";
		case 1:
			return "1 result available.";
		default:
			return `${n} results available.`;
	}
};

const setAttributes = (element, attributes) => {
	for (const key in attributes) {
		element.setAttribute(key, attributes[key]);
	}
};

export const createCombobox = ({
	input,
	id,
	onQuery,
	onConfirm,
	onCancel,
	noResults = () => "No results found.",
	statusText = defaultStatusText,
	showAllOnClick = false,
}) => {
	const listboxId = `${id}-listbox`;
	let items = [];
	let activeIndex = -1;
	let open = false;

	const wrapper = d.createElement("div");
	wrapper.className = "autocomplete__wrapper";
	input.replaceWith(wrapper);
	wrapper.append(input);
	input.classList.add("autocomplete__input");

	const menu = d.createElement("ul");
	menu.id = listboxId;
	menu.className =
		"autocomplete__menu autocomplete__menu--overlay autocomplete__menu--hidden";
	menu.setAttribute("role", "listbox");
	wrapper.append(menu);

	const live = d.createElement("div");
	live.className = "visually-hidden";
	setAttributes(live, { "aria-live": "polite", role: "status" });
	wrapper.append(live);

	setAttributes(input, {
		role: "combobox",
		"aria-autocomplete": "list",
		"aria-expanded": "false",
		"aria-controls": listboxId,
		autocomplete: "off",
		autocapitalize: "none",
		autocorrect: "off",
		spellcheck: "false",
	});

	const show = () => {
		menu.classList.replace(
			"autocomplete__menu--hidden",
			"autocomplete__menu--visible",
		);
		input.setAttribute("aria-expanded", "true");
		open = true;
	};

	const close = () => {
		menu.classList.replace(
			"autocomplete__menu--visible",
			"autocomplete__menu--hidden",
		);
		input.setAttribute("aria-expanded", "false");
		input.removeAttribute("aria-activedescendant");
		activeIndex = -1;
		open = false;
	};

	const appendGroup = (label, index) => {
		const group = d.createElement("li");
		const heading = d.createElement("div");
		const list = d.createElement("ul");
		heading.id = `${listboxId}-group-${index}`;
		heading.textContent = label;
		setAttributes(group, { role: "group", "aria-labelledby": heading.id });
		list.setAttribute("role", "none");
		group.append(heading, list);
		menu.append(group);
		return list;
	};

	const render = (nextItems) => {
		items = nextItems;
		activeIndex = -1;
		input.removeAttribute("aria-activedescendant");
		if (items.length) {
			menu.replaceChildren();
			let group;
			let list = menu;
			items.forEach((item, index) => {
				if (item.group !== group) {
					group = item.group;
					list = group ? appendGroup(group, index) : menu;
				}
				const option = d.createElement("li");
				option.id = `${listboxId}-${index}`;
				option.className = `autocomplete__option${index % 2 ? " autocomplete__option--odd" : ""}`;
				setAttributes(option, {
					role: "option",
					"aria-selected": "false",
					"data-index": index,
				});
				option.textContent = item.label;
				list.append(option);
			});
		} else {
			const option = d.createElement("li");
			option.className =
				"autocomplete__option autocomplete__option--no-results";
			setAttributes(option, { role: "option", "aria-disabled": "true" });
			option.textContent = noResults();
			menu.replaceChildren(option);
		}
		live.textContent = statusText(items.length);
		show();
	};

	const setActive = (index) => {
		const options = menu.querySelectorAll(
			'[role="option"]:not([aria-disabled])',
		);
		if (!options.length) return;
		const next = Math.max(0, Math.min(index, options.length - 1));
		for (const option of options) {
			option.classList.remove("autocomplete__option--focused");
			option.setAttribute("aria-selected", "false");
		}
		activeIndex = next;
		const active = options[next];
		active.classList.add("autocomplete__option--focused");
		active.setAttribute("aria-selected", "true");
		input.setAttribute("aria-activedescendant", active.id);
		active.scrollIntoView({ block: "nearest" });
	};

	const confirm = (index) => {
		const item = items[index];
		if (!item) return;
		close();
		onConfirm(item);
	};

	const cancel = () => {
		close();
		onCancel?.();
	};

	input.addEventListener("input", () => {
		onQuery(input.value);
	});
	input.addEventListener("click", () => {
		if (showAllOnClick && !open) {
			onQuery("");
			input.select();
		}
	});
	input.addEventListener("keydown", (event) => {
		switch (event.key) {
			case "ArrowDown":
				event.preventDefault();
				if (open) {
					setActive(activeIndex + 1);
				} else {
					onQuery(showAllOnClick ? "" : input.value);
				}
				break;
			case "ArrowUp":
				event.preventDefault();
				if (open) {
					setActive(activeIndex - 1);
				}
				break;
			case "Enter":
				if (open && activeIndex >= 0) {
					event.preventDefault();
					confirm(activeIndex);
				}
				break;
			case "Escape":
				cancel();
				break;
			case "Tab":
				if (open) {
					cancel();
				}
				break;
		}
	});
	input.addEventListener("blur", () => {
		if (open) {
			cancel();
		}
	});
	menu.addEventListener("pointerdown", (event) => {
		event.preventDefault();
	});
	menu.addEventListener("click", (event) => {
		const option = event.target.closest("[data-index]");
		if (option) {
			confirm(Number(option.dataset.index));
		}
	});

	return { wrapper, render, close };
};
