/* eslint-env browser */
/* global v */
const webSocketWorker = new SharedWorker(`/js/worker/websocket.js?v=${v}`)

/**
 * Sends a message to the worker and passes that to the Web Socket.
 * @param {any} message
 */
/* const sendMessageToSocket = (message) => {
  webSocketWorker.port.postMessage(message)
} */

// Event to listen for incoming data from the worker and update the DOM.
webSocketWorker.port.addEventListener('message', ({ data }) => {
  requestAnimationFrame(() => {
    // action
  })
})

// Initialize the port connection.
webSocketWorker.port.start()

// Remove the current worker port from the connected ports list.
// This way your connectedPorts list stays true to the actual connected ports,
// as they array won't get automatically updated when a port is disconnected.
// TODO add in if WeakRef isn't working
// window.addEventListener('beforeunload', () => {
//   webSocketWorker.port.postMessage({
//     action: 'unload',
//     value: null
//   })
//
//   webSocketWorker.port.close()
// })
// TODO WebSocket - from <link rel="shared-web-socket"> or localStorage?
