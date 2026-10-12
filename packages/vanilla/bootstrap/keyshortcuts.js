/* eslint-env browser */
import { tinykeys } from "tinykeys";

const d = document;

const apple = /Mac|iPod|iPhone|iPad/.test(navigator.platform);
const symbols = apple
	? { Meta: "⌘", Control: "⌃", Alt: "⌥", Shift: "⇧" }
	: { Meta: "Meta", Control: "Ctrl", Alt: "Alt", Shift: "Shift" };
const field = "input,select,textarea,[contenteditable]";

const label = (shortcut) =>
	shortcut
		.split("+")
		.map((key) => symbols[key] ?? (key.length === 1 ? key.toUpperCase() : key))
		.join(apple ? "" : "+");

const ignore = (event) =>
	event.repeat ||
	event.isComposing ||
	(event.target.matches?.(field) &&
		!["Control", "Meta", "Alt"].some((mod) => event.getModifierState(mod)));

const bindings = {};
for (const el of d.querySelectorAll("[aria-keyshortcuts]")) {
	const shortcuts = el.getAttribute("aria-keyshortcuts").trim().split(/\s+/);
	for (const shortcut of shortcuts) {
		bindings[shortcut] = (event) => {
			event.preventDefault();
			if (el.matches(field)) el.focus();
			else el.click();
		};
	}

	const kbd = d.createElement("kbd");
	kbd.className = "ds-keyshortcut";
	kbd.ariaHidden = "true";
	kbd.textContent = label(
		shortcuts.find((shortcut) => shortcut.includes("Meta+") === apple) ??
			shortcuts[0],
	);
	if (el.matches("input,select,textarea")) el.after(kbd);
	else el.append(kbd);
}

tinykeys(window, bindings, { ignore });
