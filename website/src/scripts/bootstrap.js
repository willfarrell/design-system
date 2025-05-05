import '@design-system/core/config.js';
// import '@design-system/core/trustedtypes.js';
import '@design-system/core/webcomponents.js';

// code to pull saved style changes

// Override design system from localStorage
const style = document.createElement('style');
style.type = 'text/css';

const allowedOverrides = {
	'--border-width': '0.125rem',
	'--border-radius': '0',
	'--gap': '1rem',
	'--grid-gap': '1.5rem',
	'--grid-min-width': '15em',
	'--padding-fixed': '1rem',
	'--font-family': 'system-ui, sans-serif',
	'--font-size': '100%'
};
const urlSearchParams = new URLSearchParams(window.location.search);
console.log(urlSearchParams.entries());
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
	console.log(key, input);
	if (input) {
		input.value = value;
	}
}
let textContent = '';
if (root) {
	textContent += `:root {${root}}`;
}
style.textContent = textContent;
console.log(style.textContent);
document.body.appendChild(style);
