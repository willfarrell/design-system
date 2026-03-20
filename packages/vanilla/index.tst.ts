import { describe, expect, test } from "tstyche";
import {
	createSignal,
	listenSignal,
	sendSignal,
	storeLocalStorage,
	storeMemory,
	storeSessionStorage,
} from "./bootstrap/pewc/signals.js";

describe("@willfarrell-ds/vanilla pewc/signals", () => {
	test("createSignal is a function", () => {
		expect(createSignal).type.toBeAssignableTo<Function>();
	});
	test("listenSignal is a function", () => {
		expect(listenSignal).type.toBeAssignableTo<Function>();
	});
	test("sendSignal is a function", () => {
		expect(sendSignal).type.toBeAssignableTo<Function>();
	});
	test("storeMemory is a function", () => {
		expect(storeMemory).type.toBeAssignableTo<Function>();
	});
	test("storeSessionStorage is a function", () => {
		expect(storeSessionStorage).type.toBeAssignableTo<Function>();
	});
	test("storeLocalStorage is a function", () => {
		expect(storeLocalStorage).type.toBeAssignableTo<Function>();
	});
});
