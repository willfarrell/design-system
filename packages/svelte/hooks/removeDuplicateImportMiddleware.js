const importRegExp =
	/<script\b[^>]*\bsrc=["'][^"']+["'][^>]*>\s*<\/script>|<link\b[^>]*\bhref=["'][^"']+["'][^>]*>/gi;
const removeDuplicateImportMiddleware = async ({ event, resolve }) => {
	const response = await resolve(event, {
		transformPageChunk: ({ html }) => {
			const seen = new Set();
			return html.replace(importRegExp, (match) => {
				if (seen.has(match)) return "";
				seen.add(match);
				return match;
			});
		},
	});
	return response;
};

export default removeDuplicateImportMiddleware;
