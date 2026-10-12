/* eslint-env browser */

const d = document;

// Anchor positioning and popover are the whole mechanism. Where either is
// missing the browser keeps rendering its own `title` tooltip, so nothing is lost.
if (CSS.supports("anchor-name: --a") && HTMLElement.prototype.showPopover) {
	const sheet = new CSSStyleSheet();
	d.adoptedStyleSheets.push(sheet);

	let count = 0;
	for (const el of d.body.querySelectorAll("[title]:not(iframe)")) {
		const title = el.getAttribute("title");
		if (!title) continue;

		count += 1;
		const key = `ds-tooltip-${count}`;
		sheet.insertRule(`[data-ds-anchor="${key}"]{anchor-name:--${key}}`);
		sheet.insertRule(`#${key},#${key}-arrow{position-anchor:--${key}}`);

		const tip = d.createElement("span");
		tip.id = key;
		tip.className = "ds-tooltip";
		tip.popover = "manual";
		tip.ariaHidden = "true";
		tip.textContent = title;

		const arrow = d.createElement("span");
		arrow.id = `${key}-arrow`;
		arrow.className = "ds-tooltip-arrow";
		arrow.popover = "manual";
		arrow.ariaHidden = "true";

		if (el.matches(":dir(rtl)")) tip.dir = arrow.dir = "rtl";
		d.body.append(tip, arrow);

		if (el.localName === "abbr") el.tabIndex = 0;
		el.dataset.dsAnchor = key;
	}

	const parts = (el) => {
		const key = el?.dataset.dsAnchor;
		if (!key) return [];
		return [d.getElementById(key), d.getElementById(`${key}-arrow`)];
	};

	// the arrow enters the top layer last so it paints over the tooltip border
	const toggle = (el, force) => {
		const [tip, arrow] = parts(el);
		if (!tip?.isConnected) return;
		tip.togglePopover(force);
		arrow?.togglePopover(force);
	};

	let anchor;

	// CSS cannot expose which position-try fallback won, so the arrow is told
	const side = () => {
		const [tip, arrow] = parts(anchor);
		if (!tip) return;
		const value =
			tip.getBoundingClientRect().top < anchor.getBoundingClientRect().top
				? "above"
				: "below";
		tip.dataset.dsSide = value;
		if (arrow) arrow.dataset.dsSide = value;
	};

	const hide = () => {
		if (!anchor) return;
		const title = parts(anchor)[0]?.textContent;
		if (title && !anchor.getAttribute("title")) {
			anchor.setAttribute("title", title);
		}
		toggle(anchor, false);
		anchor = undefined;
	};
	const show = ({ type, target }) => {
		if (target.closest?.(".ds-tooltip, .ds-tooltip-arrow")) return;
		const el = target.closest?.("[data-ds-anchor]");
		if (el !== anchor) hide();
		anchor = el ?? undefined;
		if (!el) return;
		if (type === "pointerover") el.setAttribute("title", "");
		toggle(el, true);
		side();
	};

	d.addEventListener("scroll", side, true);
	d.addEventListener("pointerover", show);
	d.addEventListener("focusin", show);
	d.addEventListener("focusout", hide);
	d.addEventListener("pointerleave", hide);
	d.addEventListener("keydown", (e) => {
		if (e.key === "Escape") hide();
	});
}
