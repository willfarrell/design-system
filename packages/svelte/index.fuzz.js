import assert from "node:assert";
import { describe, test } from "node:test";
import fc from "fast-check";
import allowedAttributes, { globalAttributes } from "./utils/attributes.js";

const eventHandler = fc.string().map((s) => `on${s}`);
const key = fc.oneof(
	fc.string(),
	eventHandler,
	fc.constantFrom("data", "aria", "data-", "aria-", "data-x", "aria-label"),
	fc.constantFrom(...globalAttributes),
);

const isKnown = (prop, elementAttributes) =>
	elementAttributes.has(prop) ||
	globalAttributes.has(prop) ||
	/^(data|aria)-./.test(prop);

describe("Fuzz", () => {
	test("allowedAttributes drops on* and unknown attributes", () => {
		fc.assert(
			fc.property(
				fc.dictionary(key, fc.string()),
				fc.uniqueArray(fc.oneof(fc.string(), eventHandler)),
				(input, elementList) => {
					const elementAttributes = new Set(elementList);
					const output = allowedAttributes(input, elementAttributes);
					for (const prop of Object.keys(output)) {
						assert.ok(Object.hasOwn(input, prop));
						assert.strictEqual(output[prop], input[prop]);
						assert.ok(!prop.toLowerCase().startsWith("on"), prop);
						assert.ok(isKnown(prop, elementAttributes), prop);
					}
					for (const prop of Object.keys(input)) {
						if (
							isKnown(prop, elementAttributes) &&
							!prop.toLowerCase().startsWith("on")
						) {
							assert.ok(Object.hasOwn(output, prop), prop);
						}
					}
				},
			),
			{ numRuns: 1000 },
		);
	});
});
