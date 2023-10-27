/* eslint-env browser */

/* 
<div is="ds-template">
<template shadowrootmode="open">
<style></style>
<slot />
</template>

</div>
*/

const is = 'ds-template'
customElements.define(
  is,
  class extends HTMLDivElement {
    constructor() {
      super()
    }

    connectedCallback() {}
    disconnectedCallback() {}
    attributeChangeCallback(name, oldValue, newValue) {}
  },
  { extends: 'template' }
)
