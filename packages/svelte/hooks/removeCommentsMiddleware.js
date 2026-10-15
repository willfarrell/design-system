const commentRegExp = /(<!--(?:[\w$[\]!-]*|\[\?[\s\S]*?)-->|<!>)\n*/g;

const removeCommentsMiddleware = async ({ event, resolve }) => {
	const response = await resolve(event, {
		transformPageChunk: ({ html }) => {
			let prev;
			do {
				prev = html;
				html = html.replace(commentRegExp, "");
			} while (html !== prev);
			return html;
		},
	});
	return response;
};
export default removeCommentsMiddleware;
