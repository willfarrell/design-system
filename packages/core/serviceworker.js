/* eslint-env browser */
/* global trustedTypePolicy */
const d = document
const w = window
const n = navigator

w.addEventListener('load', async () => {
  if ('serviceWorker' in n) {
    const sw = n.serviceWorker
    const reg = await sw.register(trustedTypePolicy.createScriptURL('/sw.js'), {
      scope: '/'
    })

    const swEvents = {}

    sw.addEventListener('message', async (event) => {
      console.log('message', event)
      if (!reg.active) return
      if (event.origin !== location.origin) return
      await swEvents?.[event.type]?.()
    })
    // let swDialog = document.getElementById('sw')
    /* update: () => {
// TODO
if (!swDialog) {
  swDialog = document.createElement('dialog')
  document.body.appendChild(swEvents)
}

// TODO pull from data-property
swDialog.innerHTML =
  '<dialog id="sw" open>We\'ve updated DataStream. Reload the page to apply update. <button onclick="location.reload()">Reload page</button></dialog>'
swDialog.open = true
  } */

    // document.addEventListener('visibilitychange', () => {
    //   console.log(document.visibilityState) // session duration
    // })

    d.addEventListener('ononline', () => {
      sw.controller.postMessage({
        type: 'online'
      })
    })
  }
})
