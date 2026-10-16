import { equal } from "node:assert/strict";
import { afterEach, describe, mock, test } from "node:test";
import { handleError } from "./handleError.js";

const event = { url: new URL("https://design-system.willfarrell.ca/") };

const captureLog = async (input) => {
	const spy = mock.method(console, "error", () => {});
	await handleError(input);
	equal(spy.mock.callCount(), 1);
	return JSON.parse(spy.mock.calls[0].arguments[0]);
};

describe("handleError", () => {
	afterEach(() => {
		mock.restoreAll();
	});

	test("logs the error message and status", async () => {
		const entry = await captureLog({
			kind: "framework",
			error: { status: 404, message: "Not Found" },
			event,
		});
		equal(entry.message, "Not Found");
		equal(entry.status_code, 404);
	});

	test("defaults to 500 for unexpected errors", async () => {
		const entry = await captureLog({
			kind: "unknown",
			error: new Error("boom"),
			event,
		});
		equal(entry.message, "boom");
		equal(entry.status_code, 500);
	});

	test("tolerates a missing error value", async () => {
		const entry = await captureLog({
			kind: "unknown",
			error: undefined,
			event,
		});
		equal(entry.message, "Internal Error");
		equal(entry.status_code, 500);
	});

	test("skips expected app errors thrown with error()", async () => {
		const spy = mock.method(console, "error", () => {});
		await handleError({ kind: "app", error: { message: "Not Found" }, event });
		equal(spy.mock.callCount(), 0);
	});
});
