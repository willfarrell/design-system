import { bench, suite } from "node:bench";
import allowedAttributes from "./utils/attributes.js";

const props = {
	class: "foo",
	"data-id": "1",
	onclick: "alert()",
	role: "button",
	id: "test",
};
const elementAttributes = new Set(["class", "id"]);

suite("@willfarrell-ds/svelte", () => {
	bench("perf: allowedAttributes", { warmup: 100, samples: 30 }, (b) => {
		const ops = 10_000;
		b.start();
		for (let i = 0; i < ops; i++) {
			allowedAttributes(props, elementAttributes);
		}
		b.end(ops);
	});
});
