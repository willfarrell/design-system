import { test } from "node:test";
import allowedAttributes from "./utils/attributes.js";

test("perf: allowedAttributes", async () => {
	const iterations = 100_000;
	const props = {
		class: "foo",
		"data-id": "1",
		onclick: "alert()",
		role: "button",
		id: "test",
	};
	const elementAttributes = new Set(["class", "id"]);
	const start = performance.now();
	for (let i = 0; i < iterations; i++) {
		allowedAttributes(props, elementAttributes);
	}
	const duration = performance.now() - start;
	console.log(
		`allowedAttributes: ${iterations} iterations in ${duration.toFixed(2)}ms (${(duration / iterations).toFixed(4)}ms/op)`,
	);
});
