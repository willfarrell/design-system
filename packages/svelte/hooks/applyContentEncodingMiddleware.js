import {
	createBrotliCompress as brotliCompressStream,
	createDeflate as deflateCompressStream,
	createGzip as gzipCompressStream,
	createZstdCompress as zstdCompressStream,
} from "node:zlib";

const nodeZlibToWebTransform = (createStream) => {
	return () => {
		const nodeTransform = createStream();
		return new TransformStream({
			transform(chunk, controller) {
				return new Promise((resolve, reject) => {
					const bufs = [];
					const onData = (d) => bufs.push(d);
					nodeTransform.on("data", onData);
					nodeTransform.write(new Uint8Array(chunk), (err) => {
						nodeTransform.removeListener("data", onData);
						if (err) return reject(err);
						for (const buf of bufs) {
							controller.enqueue(new Uint8Array(buf));
						}
						resolve();
					});
				});
			},
			flush(controller) {
				return new Promise((resolve, reject) => {
					nodeTransform.on("data", (d) =>
						controller.enqueue(new Uint8Array(d)),
					);
					nodeTransform.on("end", resolve);
					nodeTransform.on("error", reject);
					nodeTransform.end();
				});
			},
		});
	};
};

const contentEncodingStreams = {
	br: nodeZlibToWebTransform(brotliCompressStream),
	deflate: nodeZlibToWebTransform(deflateCompressStream),
	gzip: nodeZlibToWebTransform(gzipCompressStream),
	zstd: nodeZlibToWebTransform(zstdCompressStream),
};

const supportedEncodings = Object.keys(contentEncodingStreams);

const parseAcceptEncoding = (header) => {
	if (!header) return [];
	return header
		.split(",")
		.map((part) => {
			const [encoding, ...params] = part.trim().split(";");
			const qParam = params
				.map((p) => p.trim())
				.find((p) => p.startsWith("q="));
			const quality = qParam ? Number.parseFloat(qParam.slice(2)) : 1.0;
			return { encoding: encoding.trim().toLowerCase(), quality };
		})
		.filter(({ quality }) => quality > 0)
		.sort((a, b) => b.quality - a.quality);
};

const selectEncoding = (acceptEncodings) => {
	for (const { encoding } of acceptEncodings) {
		if (encoding === "*") {
			return supportedEncodings[0];
		}
		if (supportedEncodings.includes(encoding)) {
			return encoding;
		}
	}
	return null;
};

const applyContentEncodingMiddleware = async ({ event, resolve }) => {
	const response = await resolve(event);

	if (response.body === null) {
		return response;
	}

	if (response.headers.has("Content-Encoding")) {
		return response;
	}

	if (event.request.method === "HEAD") {
		return response;
	}

	const cacheControl = response.headers.get("Cache-Control");
	if (cacheControl?.includes("no-transform")) {
		return response;
	}

	const acceptEncoding = event.request.headers.get("Accept-Encoding");
	const acceptEncodings = parseAcceptEncoding(acceptEncoding);
	const encoding = selectEncoding(acceptEncodings);

	if (!encoding) {
		return response;
	}

	const compressedStream = response.body.pipeThrough(
		contentEncodingStreams[encoding](),
	);

	const headers = new Headers(response.headers);
	headers.set("Content-Encoding", encoding);
	headers.append("Vary", "Accept-Encoding");
	headers.delete("Content-Length");

	return new Response(compressedStream, {
		status: response.status,
		statusText: response.statusText,
		headers,
	});
};

export default applyContentEncodingMiddleware;
