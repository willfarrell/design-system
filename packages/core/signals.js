/* eslint-env browser */
import {
	createSignal,
	listenSignal,
	sendSignal,
	storeLocalStorage,
	storeSearchParams,
	storeSessionStorage,
} from "./pewc/signals.js";

const signals = {};

globalThis.createSignal = createSignal;
globalThis.listenSignal = listenSignal;
globalThis.sendSignal = sendSignal;

globalThis.storeSearchParams = storeSearchParams;
globalThis.storeSessionStorage = storeSessionStorage;
globalThis.storeLocalStorage = storeLocalStorage;

import { bind, template } from "./pewc/elements.js";

globalThis.template = template;
globalThis.bind = bind;
