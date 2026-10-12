import { bench, suite } from "node:bench";
import { createSignal } from "./bootstrap/pewc/signals.js";

let n = 0;

suite("@willfarrell-ds/vanilla", () => {
	bench("perf: createSignal", { warmup: 100, samples: 30 }, (b) => {
		const ops = 1_000;
		b.start();
		for (let i = 0; i < ops; i++) {
			createSignal(`signal-${n++}`);
		}
		b.end(ops);
	});
});
