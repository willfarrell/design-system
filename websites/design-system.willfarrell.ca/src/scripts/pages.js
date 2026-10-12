export default Object.keys(import.meta.glob("../routes/**/+page.svelte"))
	.map(
		(path) =>
			path
				.replace(/^\.\.\/routes/, "")
				.replace(/\/\+page\.svelte$/, "")
				.replace(/\/\([^/]+\)/g, "") || "/",
	)
	.filter((loc) => !loc.includes("["))
	.sort();
