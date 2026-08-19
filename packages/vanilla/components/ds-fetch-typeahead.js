/* eslint-env browser */
import { createCombobox, defaultStatusText } from "./typeahead.js";

const is = "ds-fetch-typeahead";
const debounceWait = 250;
const criteriaPrefix = "data-criteria-";

customElements.define(
	is,
	class extends HTMLInputElement {
		#combobox;

		connectedCallback() {
			if (this.#combobox) return;
			const src = this.dataset.src;
			if (!src) return;
			this.#combobox = true;
			const param = this.dataset.param || "q";

			const criteria = [];
			for (const attribute of this.attributes) {
				if (attribute.name.startsWith(criteriaPrefix)) {
					criteria.push([
						attribute.name.slice(criteriaPrefix.length),
						attribute.value,
					]);
				}
			}

			const i18nLoading = this.dataset.i18nLoading || "Loading suggestions…";
			const i18nError =
				this.dataset.i18nError ||
				"Sorry, there is a problem loading suggestions.";
			const i18nNoResults = this.dataset.i18nNoResults || "No results found.";

			const fallback = [];
			const datalist = this.list;
			if (datalist) {
				for (const option of datalist.options) {
					fallback.push({
						value: option.value,
						label: option.label || option.value,
					});
				}
			}
			this.removeAttribute("list");

			const buildUrl = (query) => {
				const url = new URL(src, location.href);
				url.searchParams.set(param, query);
				for (const [key, value] of criteria) {
					url.searchParams.set(key, value);
				}
				return url;
			};

			let status = null;
			let abortController;

			const requestSuggestions = (query) => {
				if (abortController) {
					abortController.abort();
				}
				abortController = new AbortController();
				status = "loading";
				return fetch(buildUrl(query), {
					headers: { Accept: "application/json" },
					credentials: "same-origin",
					signal: abortController.signal,
				})
					.then((response) => {
						if (!response.ok) {
							throw new Error(`${response.status}`);
						}
						return response.json();
					})
					.then((items) => {
						status = null;
						return (Array.isArray(items) ? items : []).map((item) => ({
							value: item.value ?? item.label,
							label: item.label ?? item.value,
							href: item.href,
						}));
					})
					.catch((error) => {
						if (error.name === "AbortError") {
							return undefined;
						}
						status = "error";
						const match = query.toLowerCase();
						return fallback.filter((item) =>
							item.label.toLowerCase().includes(match),
						);
					});
			};

			let timeout;
			const combobox = createCombobox({
				input: this,
				id: this.id,
				noResults: () => {
					if (status === "loading") return i18nLoading;
					if (status === "error") return i18nError;
					return i18nNoResults;
				},
				statusText: (n) =>
					status === "loading" ? i18nLoading : defaultStatusText(n),
				onQuery: (query) => {
					clearTimeout(timeout);
					status = "loading";
					combobox.render([]);
					timeout = setTimeout(() => {
						requestSuggestions(query).then((items) => {
							if (items) {
								combobox.render(items);
							}
						});
					}, debounceWait);
				},
				onConfirm: (item) => {
					if (item.href) {
						location.href = item.href;
						return;
					}
					this.value = item.label;
				},
			});
		}
	},
	{ extends: "input" },
);
