/* eslint-env browser */
/**
 * Detect browser and version
 * alert if out of date
 *
 * Requires: none
 */
// https://www.browsers.fyi/api/
/*eslint-disable */
//import releases from '../browsers.json' assert { type: 'json' }
/* eslint-enable */
const releases = {
	chrome: {
		version: 109,
	},
	edge: {
		version: 108,
	},
	safari: {
		version: 16.3,
	},
	firefox: {
		version: 108,
	},
};

/* const update = [
  {
    name: 'Chrome',
    version: 108,
    regexp: /Chrome\/([0-9]+)/,
    url: 'https://www.google.com/chrome/update/'
  },
  {
    name: 'Edge',
    version: 100,
    regexp: /Edge\/([0-9]+)/,
    url: 'https://support.microsoft.com/en-us/topic/update-to-the-new-microsoft-edge-182d0668-e3f0-49da-b8bb-db5675245dc2'
  },
  {
    name: 'Firefox',
    version: 100,
    regexp: /Firefox\/([0-9]+)/,
    url: 'https://support.mozilla.org/kb/update-firefox-latest-release'
  },
  {
    name: 'Safari',
    version: 16,
    regexp: /Safari\/([0-9]+\.[0-9]+)/,
    url: 'https://support.apple.com/en-us/HT204416'
  }
] */

const detect = () => {
	let app = navigator.appName;
	let version = navigator.appVersion;
	const ua = navigator.userAgent;
	const os = navigator.platform;
	const matchBrowser = ua.match(
		/(opera|edg|chrome|safari|firefox|msie)\/?\s*(\.?\d+(\.\d+)*)/i,
	);
	if (matchBrowser) {
		app = matchBrowser[1];
		version = matchBrowser[2];
		const matchVersion = ua.match(/version\/([.\d]+)/i);
		if (matchVersion) {
			version = matchVersion[1];
		}
	}
	app = app.toLowerCase();
	version = parseVersion(version);
	return { os, app, version };
};

const parseVersion = (value) => {
	const version = value.split(".");
	version.splice(2);
	return Number.parseFloat(version.join("."));
};

const { app, version } = detect();
const is = "ds-input-browser-up-to-date";
customElements.define(
	is,
	class extends HTMLInputElement {
		connectedCallback() {
			if (releases[app]) {
				if (version < releases[app].version) {
					// for (const browser of ['chrome', 'edge', 'firefox', 'safari']) {
					//   if (app !== browser) {
					//     const elem = document.getElementById(browser)
					//     elem.parentNode.removeChild(elem)
					//   }
					// }
					this.value = "false";
					this.setAttribute("value", "false"); // optional: set attribute if you need markup to reflect it
					this.dispatchEvent(new Event("input", { bubbles: true })); // make frameworks notice
				}
			}
		}
	},
	{ extends: "input" },
);
