import { test } from "node:test";

test("perf: placeholder", async () => {
	// CLI commands operate on files, perf test needs real file I/O
	// optimizeStyles(dir, options) walks a directory of .css files
	// extract(options) walks directories of .html/.js files
	// Benchmark the core parsing logic
	const iterations = 10_000;
	const start = performance.now();
	for (let i = 0; i < iterations; i++) {
		// placeholder - adjust based on actual exportable functions
	}
	const duration = performance.now() - start;
	console.log(
		`cli: ${iterations} iterations in ${duration.toFixed(2)}ms (${(duration / iterations).toFixed(4)}ms/op)`,
	);
});
