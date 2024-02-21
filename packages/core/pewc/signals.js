/* eslint-env browser */
/* POC */

// TODO
// ttl on stored values?
// trottle broadcast?
// cross-tab signals via SharedWorker? createAntenna

// https://github.com/developit/mitt

const signals = {}

export const createSignal = (id, { value, store } = {}) => {
  store ??= storeMemory
  signals[id] ??= { callbacks: [] }
  signals[id].value = store(id, value)
  // for those that listen first
  boradcast(id)
}

export const listenSignal = (id, callback) => {
  signals[id] ??= { callbacks: [] }
  signals[id].callbacks.push(callback)
  if (signals[id].value) {
    callback(signals[id].value.get())
  }
}

// TODO abort signal when lots of signals coming in?
// assign (bool): true = shallow merge
// force (bool): true = always broadcast
export const sendSignal = (id, value, { assign, force } = {}) => {
  if (!signals[id]) {
    throw new Error('Sending signal before creating', { cause: { id } })
  }
  // if (assign) {
  //   const oldValue = signals[id].value
  //   value = Object.assign({}, oldValue, value)
  // }
  const changed = signals[id].value.set(value)
  if (changed || force) {
    boradcast(id)
  }
}

const boradcast = (id) => {
  const value = signals[id].value.get()
  for (const callback of signals[id].callbacks) {
    callback(value)
  }
}

// signal stores
const encode = (data) => {
  return JSON.stringify(data)
}
const decode = (data) => {
  return JSON.parse(data)
}

export const storeMemory = (id, value = {}) => {
  let data, dataEncoded
  const get = () => {
    return data
  }
  const set = (newData) => {
    const newEncoded = encode(newData)
    if (dataEncoded !== newEncoded) {
      data = newData
      dataEncoded = newEncoded
      return true
    }
  }

  try {
    data = get(id)
  } catch (e) {}
  if (typeof data === 'undefined') {
    set(value)
  }

  return {
    get,
    set
  }
}

export const storeSessionStorage = (id, value = {}) => {
  let data, dataEncoded
  const get = () => {
    dataEncoded = sessionStorage.getItem(id)
    data = decode(dataEncoded)
    return data
  }
  const set = (newData) => {
    const newEncoded = encode(newData)
    if (dataEncoded !== newEncoded) {
      data = newData
      dataEncoded = newEncoded
      sessionStorage.setItem(id, newEncoded)
      return true
    }
  }

  try {
    data = get(id)
  } catch (e) {}
  if (data === null) {
    set(value)
  }

  return {
    get,
    set
  }
}

export const storeLocalStorage = (id, value = {}) => {
  let data, dataEncoded
  const get = () => {
    dataEncoded = localStorage.getItem(id)
    data = decode(dataEncoded)
    return data
  }
  const set = (newData) => {
    const newEncoded = encode(newData)
    if (dataEncoded !== newEncoded) {
      data = newData
      dataEncoded = newEncoded
      localStorage.setItem(id, newEncoded)
      return true
    }
  }
  try {
    data = get(id)
  } catch (e) {}
  if (data === null) {
    set(value)
  }

  return {
    get,
    set
  }
}

// https://developer.chrome.com/blog/new-in-chrome-122/#storage-buckets-api
// connects into indexedDB and cache storages
// export const storeStorageBuckets = (id, value = {}) => {
//const persisted = await navigator.storage.persist()
//   navigator.storageBuckets.open('pewc', {
//     durability: 'strict',
//     persisted: true
//   })
// }

// Must send in defaults
export const storeSearchParams = (id, value = {}) => {
  const valueKeys = Object.keys(value)
  let allowedKeys = valueKeys
  let data, dataEncoded
  const get = () => {
    const url = new URL(window.location.search)
    const params = new URLSearchParams(url.search)

    // check if using global signal
    if (valueKeys.length === 0) {
      allowedKeys = params.keys()
    }

    const data = {}
    for (const key of allowedKeys) {
      data[key] = params.getAll()
      if (data[key].length === 1) {
        data[key] = data[key][0]
      }
    }
    return data
  }
  const set = (newValue) => {
    data = newValue
    dataEncoded = encode(newValue)

    if (valueKeys.length === 0) {
      window.location.search = dataEncoded
    } else {
      const url = new URL(window.location.search)
      const params = new URLSearchParams(url.search)
      for (const key of allowedKeys) {
        params.delete(key)
        if (Array.isArray(newValue[key])) {
          for (const value of newValue[key]) {
            params.append(key, value)
          }
        } else {
          params.set(newValue[key])
        }
      }
      window.location.search = params.toString()
    }
  }
  const encode = (value) => {
    const params = new URLSearchParams()
    for (const key of Object.keys(value)) {
      if (Array.isArray(value[key])) {
        for (const v of value[key]) {
          params.append(key, v)
        }
      } else {
        params.set(value[key])
      }
    }
    return params.toString()
  }
  const decode = () => {}

  try {
    data = get(id)
  } catch (e) {}
  if (typeof data === 'undefined') {
    set(value)
  }

  return {
    get() {
      return data
    },
    set(newData) {
      set(newData)
    }
  }
}
