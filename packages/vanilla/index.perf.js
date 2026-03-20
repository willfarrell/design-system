import { test } from "node:test";
import { createSignal } from "./bootstrap/pewc/signals.js";

test("perf: createSignal", async () => {
	const iterations = 100_000;
	const start = performance.now();
	for (let i = 0; i < iterations; i++) {
		createSignal(`signal-${i}`);
	}
	const duration = performance.now() - start;
	console.log(
		`createSignal: ${iterations} iterations in ${duration.toFixed(2)}ms (${(duration / iterations).toFixed(4)}ms/op)`,
	);
});
