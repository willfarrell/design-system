import { bench, suite } from "node:bench";

suite("@willfarrell-ds/cli", () => {
	bench("perf: placeholder", { warmup: 100, samples: 30 }, (b) => {
		// CLI commands operate on files, perf test needs real file I/O
		// optimizeStyles(dir, options) walks a directory of .css files
		// extract(options) walks directories of .html/.js files
		// Benchmark the core parsing logic
		const ops = 10_000;
		b.start();
		for (let i = 0; i < ops; i++) {
			// placeholder - adjust based on actual exportable functions
		}
		b.end(ops);
	});
});
