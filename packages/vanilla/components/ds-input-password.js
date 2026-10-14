/* eslint-env browser */
import { icon, iconHref } from "./icon.js";

const d = document;
const is = "ds-input-password";
let count = 0;

if (!customElements.get(is)) {
	customElements.define(
		is,
		class extends HTMLInputElement {
			#button;
			#capslock;

			handleClick = () => {
				const show = this.type === "password";
				this.type = show ? "text" : "password";
				this.#button.setAttribute("aria-pressed", `${show}`);
			};

			handleKey = (event) => {
				if (!event.getModifierState?.("CapsLock")) {
					this.#capslock.replaceChildren();
					return;
				}
				if (this.#capslock.childNodes.length) return;
				this.#capslock.append(
					icon(iconHref(this.dataset.icon, "capslock")),
					this.dataset.i18nCapslock ?? "Caps Lock is on",
				);
			};

			handleBlur = () => {
				this.#capslock.replaceChildren();
			};

			#describedby(update) {
				const ids = update(
					(this.getAttribute("aria-describedby") ?? "")
						.split(/\s+/)
						.filter(Boolean),
				);
				if (ids.length) this.setAttribute("aria-describedby", ids.join(" "));
				else this.removeAttribute("aria-describedby");
			}

			connectedCallback() {
				const button = d.createElement("button");
				button.type = "button";
				button.textContent = this.dataset.i18nShow ?? "Show";
				button.setAttribute("aria-pressed", "false");
				if (this.id) {
					button.setAttribute("aria-controls", this.id);
				}
				button.addEventListener("click", this.handleClick);
				this.#button = button;
				this.after(button);

				const capslock = d.createElement("span");
				capslock.id = `${this.id || is}-capslock-${++count}`;
				capslock.setAttribute("role", "status");
				this.#capslock = capslock;
				button.after(capslock);
				this.#describedby((ids) => [...ids, capslock.id]);
				this.addEventListener("keydown", this.handleKey);
				this.addEventListener("keyup", this.handleKey);
				this.addEventListener("blur", this.handleBlur);
			}

			disconnectedCallback() {
				this.#button?.removeEventListener("click", this.handleClick);
				this.#button?.remove();
				this.removeEventListener("keydown", this.handleKey);
				this.removeEventListener("keyup", this.handleKey);
				this.removeEventListener("blur", this.handleBlur);
				const id = this.#capslock?.id;
				this.#describedby((ids) => ids.filter((value) => value !== id));
				this.#capslock?.remove();
			}
		},
		{ extends: "input" },
	);
}
