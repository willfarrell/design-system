/* eslint-env browser */

const svgNS = "http://www.w3.org/2000/svg";

export const icon = (href) => {
	const svg = document.createElementNS(svgNS, "svg");
	svg.setAttribute("class", "icon");
	svg.setAttribute("aria-hidden", "true");
	svg.setAttribute("focusable", "false");
	const use = document.createElementNS(svgNS, "use");
	use.setAttribute("href", href);
	svg.append(use);
	return svg;
};

export const iconHref = (src, name) =>
	(src ?? `/img/icons.svg#${name}`).replace(/#.*$/, `#${name}`);
