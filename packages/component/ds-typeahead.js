/* eslint-env browser */
import accessibleAutocomplete from "accessible-autocomplete";

const values = [""];
const source = (query, syncResults) => {
	const matches = values.filter(
		(r) => r.toLowerCase().indexOf(query.toLowerCase()) !== -1,
	);
	syncResults(matches);
};

const is = "ds-typeahead";
customElements.define(
	is,
	class extends HTMLInputElement {
		constructor() {
			super();
			accessibleAutocomplete({
				element: this,
				id: this.id,
				source,
			});
		}
	},
	{ extends: "input" },
);
