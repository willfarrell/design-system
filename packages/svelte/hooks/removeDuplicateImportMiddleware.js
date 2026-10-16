const importRegExp =
	/<script\b[^>]*\bsrc=["'][^"']+["'][^>]*>\s*<\/script>|<link\b[^>]*\bhref=["'][^"']+["'][^>]*>/gi;
const removeDuplicateImportMiddleware = async ({ event, resolve }) => {
	const response = await resolve(event, {
		transformPageChunk: ({ html }) => {
			let prev;
			do {
				prev = html;
				const seen = new Set();
				html = html.replace(importRegExp, (match) => {
					if (seen.has(match)) return "";
					seen.add(match);
					return match;
				});
			} while (html !== prev);
			return html;
		},
	});
	return response;
};

export default removeDuplicateImportMiddleware;
