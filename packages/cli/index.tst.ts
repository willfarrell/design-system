import { describe, expect, test } from "tstyche";
import extract from "./commands/extract.js";
import inline from "./commands/inline.js";
import optimizeStyles from "./commands/optimizeStyles.js";

describe("@willfarrell-ds/cli", () => {
	test("extract is a function", () => {
		expect(extract).type.toBeAssignableTo<Function>();
	});
	test("inline is a function", () => {
		expect(inline).type.toBeAssignableTo<Function>();
	});
	test("optimizeStyles is a function", () => {
		expect(optimizeStyles).type.toBeAssignableTo<Function>();
	});
});
