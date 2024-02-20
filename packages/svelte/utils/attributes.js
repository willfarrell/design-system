// https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes

const globalAttributes = [
  'accesskey',
  'autocapitalize',
  'autofocus',
  'class',
  'contenteditable',
  'dir',
  'draggable',
  'enterkeyhint',
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
  'virtualkeyboardpolicy'
]

const elementAttributes = {
  input: ['accept']
}
export default (props, attributes = []) => {
  const data = {}
  for (const prop in props) {
    if (!globalAttributes[prop] && prop.substring(0, 5) !== 'data-') continue
    data[prop] = props[prop]
  }
  return data
}
