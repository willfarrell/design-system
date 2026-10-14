/* eslint-env browser */

const releases = {
	edge: { pattern: /Edg\/(\d+(?:\.\d+)?)/, version: 155 },
	firefox: { pattern: /Firefox\/(\d+(?:\.\d+)?)/, version: 158 },
	chrome: { pattern: /Chrome\/(\d+(?:\.\d+)?)/, version: 155 },
	safari: { pattern: /Version\/(\d+(?:\.\d+)?).*Safari\//, version: 27 },
};

const detect = (ua) => {
	for (const release of Object.values(releases)) {
		const match = ua.match(release.pattern);
		if (match) return { release, version: Number.parseFloat(match[1]) };
	}
};

const browser = detect(navigator.userAgent);
const is = "ds-input-browser-up-to-date";
if (!customElements.get(is)) {
	customElements.define(
		is,
		class extends HTMLInputElement {
			connectedCallback() {
				if (!browser || browser.version >= browser.release.version) return;
				this.value = "false";
				this.setAttribute("value", "false");
				this.dispatchEvent(new Event("input", { bubbles: true }));
			}
		},
		{ extends: "input" },
	);
}
