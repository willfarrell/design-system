const oneventRegExp = /on[a-z]+=["]this\.__e=event["]/g;

const removeOnEventsMiddleware = async ({ event, resolve }) => {
	const response = await resolve(event, {
		transformPageChunk: ({ html }) => {
			let prev;
			do {
				prev = html;
				html = html.replace(oneventRegExp, "");
			} while (html !== prev);
			return html;
		},
	});
	return response;
};
export default removeOnEventsMiddleware;
