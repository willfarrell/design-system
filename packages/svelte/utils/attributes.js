// https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes

const globalAttributes = new Set([
  'accesskey',
  'autocapitalize',
  'autocorrect',
  'autofocus',
  'class',
  'contenteditable',
  'dir',
  'draggable',
  'enterkeyhint',
  'exportparts',
  'hidden',
  'id',
  'inert',
  'inputmode',
  'is',
  'itemid',
  'itemprop',
  'itemref',
  'itemscope',
  'itemtype',
  'lang',
  'nonce',
  'part',
  'popover',
  'role',
  'slot',
  'spellcheck',
  'style',
  'tabindex',
  'title',
  'translate',
  'virtualkeyboardpolicy',
  'writingsuggestions'
])

const allowedAttributes = (props = {}, elementAttributes = new Set([])) => {
  const attributes = {}
  for (const prop in props) {
    const [prefix] = prop.split('-')
    if (
      elementAttributes.has(prop) ||
      globalAttributes.has(prop) ||
      prefix === 'data' ||
      prefix === 'aria'
    ) {
      attributes[prop] = props[prop]
    }
  }
  return attributes
}

export default allowedAttributes
