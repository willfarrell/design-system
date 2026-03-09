const applyCacheControlMiddleware = async ({ event, resolve }) => {
	const { cookies } = event;

	const response = await resolve(event);

	if (cookies.getAll().length) {
		response.headers.set("Cache-Control", "no-cache");
	} else if (!response.headers.has("Cache-Control")) {
		response.headers.set(
			"Cache-Control",
			"public, max-age=60, stale-if-error=300, stale-while-revalidate=31536000",
		);
	}

	return response;
};

export default applyCacheControlMiddleware;
