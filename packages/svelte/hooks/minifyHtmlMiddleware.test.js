import assert from "node:assert";
import { describe, it } from "node:test";
import minifyHtmlMiddleware from "./minifyHtmlMiddleware.js";

const run = async (html) => {
	let output;
	await minifyHtmlMiddleware({
		event: {},
		resolve: async (_event, { transformPageChunk }) => {
			output = await transformPageChunk({ html, done: true });
			return new Response(output);
		},
	});
	return output;
};

describe("minifyHtmlMiddleware", () => {
	it("collapses whitespace and keeps raw text", async () => {
		const output = await run(`<!doctype html>
<html>
	<body>
		<p>a  b</p>
		<pre>  keep  </pre>
	</body>
</html>`);
		assert.strictEqual(
			output,
			"<!doctype html> <html> <body> <p>a b</p> <pre>  keep  </pre> </body> </html>",
		);
	});
});
