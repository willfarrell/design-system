import "@design-system/core/config.js";
// import '@design-system/core/trustedtypes.js';
import "@design-system/core/webcomponents.js";
import designTokens from "@design-system/style/index.tokens.json" with {
	type: "json",
};

// code to pull saved style changes

// Override design system from localStorage
const style = document.createElement("style");
style.type = "text/css";

const allowedOverrides = {
	// body
	"--font-family": "system-ui, sans-serif",
	"--font-size": "100%",
	"--font-weight": "300",

	// headings

	"--border-width": "0.125rem",
	"--border-radius": "0",
	"--gap": "1rem",
	"--grid-gap": "1.5rem",
	"--grid-min-width": "20ch",
	"--padding-fixed": "1rem",

	// new
	"--ds-border-width": "0.125rem",
	"--ds-border-radius": "0",
	"--ds-gap": "1rem",
	"--ds-grid-gap": "1.5rem",
	"--ds-grid-min-width": "15em",
	"--ds-padding-fixed": "1rem",
	"--ds-font-family": "system-ui, sans-serif",
	"--ds-h1-size": "200%",
	"--ds-h2-size": "175%",
	"--ds-h3-size": "150%",
	"--ds-h4-size": "125%",
	"--ds-h5-size": "118.75%",
	"--ds-h6-size": "112.5%",
	"--ds-font-size": "100%",
	"--ds-small-size": "80%",
	"--ds-color-primary": "#522e9a", // TODO convert into shades
	"--ds-color-layer": "#000000", // TODO convert into shades
};
const urlSearchParams = new URLSearchParams(window.location.search);
const searchParams = Object.fromEntries(urlSearchParams.entries());

let root = ``;
for (const key in allowedOverrides) {
	if (searchParams[key]) {
		localStorage.setItem(key, searchParams[key]);
	}
	const value = localStorage.getItem(key) ?? allowedOverrides[key];
	root += `${key}: ${value};
	`;
	const input = document.getElementById(key);
	if (input) {
		input.value = value;
	}
}
let textContent = "";
if (root) {
	textContent += `:root {${root}}`;
}
style.textContent = textContent;
document.body.appendChild(style);
