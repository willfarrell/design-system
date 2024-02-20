/* eslint-env browser */
import {
  createSignal,
  listenSignal,
  sendSignal,
  storeSearchParams,
  storeSessionStorage,
  storeLocalStorage
} from './pewc/signals.js'

const signals = {}

globalThis.createSignal = createSignal
globalThis.listenSignal = listenSignal
globalThis.sendSignal = sendSignal

globalThis.storeSearchParams = storeSearchParams
globalThis.storeSessionStorage = storeSessionStorage
globalThis.storeLocalStorage = storeLocalStorage

import { template, bind } from './pewc/elements.js'
globalThis.template = template
globalThis.bind = bind
