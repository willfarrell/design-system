const allowedSchemes = new Set(["http", "https", "mailto", "tel"]);

const safeHref = (href) => {
	if (typeof href !== "string") return href;
	const scheme = href
		.trim()
		.replace(/[\t\n\r]/g, "")
		.match(/^([a-z][a-z\d+.-]*):/i)?.[1];
	if (scheme && !allowedSchemes.has(scheme.toLowerCase())) return undefined;
	return href;
};

export default safeHref;
