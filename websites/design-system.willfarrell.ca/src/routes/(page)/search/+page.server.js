import pages from "#scripts/pages.js";

export const load = ({ url }) => {
	const q = (url.searchParams.get("q") ?? "").trim().slice(0, 100);
	const terms = q
		.toLowerCase()
		.split(/[\s/-]+/)
		.filter(Boolean);
	return {
		q,
		results: terms.length
			? pages.filter((loc) => terms.every((term) => loc.includes(term)))
			: [],
	};
};
