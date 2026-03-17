import { describe, expect, test } from "tstyche";
import allowedAttributes from "./utils/attributes.js";
import applyCacheControlMiddleware from "./hooks/applyCacheControlMiddleware.js";
import applyContentEncodingMiddleware from "./hooks/applyContentEncodingMiddleware.js";
import minifyHtmlMiddleware from "./hooks/minifyHtmlMiddleware.js";
import removeCommentsMiddleware from "./hooks/removeCommentsMiddleware.js";
import removeDuplicateImportMiddleware from "./hooks/removeDuplicateImportMiddleware.js";
import removeOnEventsMiddleware from "./hooks/removeOnEventsMiddleware.js";

describe("@willfarrell-ds/svelte", () => {
	test("allowedAttributes is a function", () => {
		expect(allowedAttributes).type.toBeAssignableTo<Function>();
	});
	test("hooks are functions", () => {
		expect(applyCacheControlMiddleware).type.toBeAssignableTo<Function>();
		expect(applyContentEncodingMiddleware).type.toBeAssignableTo<Function>();
		expect(minifyHtmlMiddleware).type.toBeAssignableTo<Function>();
		expect(removeCommentsMiddleware).type.toBeAssignableTo<Function>();
		expect(removeDuplicateImportMiddleware).type.toBeAssignableTo<Function>();
		expect(removeOnEventsMiddleware).type.toBeAssignableTo<Function>();
	});
});
