/**
 * htmlString: must be wrapped with a single elem
 */

// attr data binding - https://stackoverflow.com/questions/16483560/how-to-implement-dom-data-binding-in-javascript

// https://github.com/mikeric/rivets
// https://github.com/blikblum/tinybind

/*
// POC
  const [element, bindings] = globalThis.bind(
	`<div><span>** {count}</span></div>`,
	{
	  count: 0,
	  double: 0
	}
  )
  btn.insertAdjacentElement('afterend', element)

  setInterval(() => {
	console.log('ping')
	bindings.count++
	//bindings.double += 2
  }, 5000)
  */

export const template = (htmlString, initValues = {}) => {
  let updatedHTML = updateString(htmlString, initValues)
  return stringToElement(updatedHTML)
}

export const bind = (htmlString, initValues = {}) => {
  // make data bindings
  const nodes = {}
  const keys = {}
  const values = new Proxy(initValues, {
    set: function (target, key, value) {
      target[key] = value
      if (keys[key]) {
        for (let i = keys[key].length; i--; ) {
          const node = keys[key][i]
          updateNode(nodes[node], values)
        }
      }
      return true
    }
  })

  const updateNode = (node) => {
    if (node) {
      node.elem.innerText = updateString(
        node.src.innerText,
        values,
        node.innerTextParams
      )

      // TODO attr
      for (let attr in node.attrParams) {
      }
    }
  }

  const varRegExp = /\{([a-zA-Z0-9]+)\}/g // TODO only allow vars passed in ...
  const crawlElement = (elem, nodeId = '0') => {
    if (!elem.children.length) {
      const innerTextParams = []
      for (const [, param] of elem.innerText.matchAll(varRegExp)) {
        innerTextParams.push(param)
        keys[param] ??= []
        keys[param].push(nodeId)
      }
      const attrParams = {}
      for (const attr of elem.attributes) {
        for (const [, param] of attr.matchAll(varRegExp)) {
          attrParams[attr] ??= []
          attrParams[attr].push(param) // TODO need to store what attr
          keys[param] ??= []
          keys[param].push(nodeId)
        }
      }

      nodes[nodeId] ??= {
        attrParams, // TODO clean up
        innerTextParams: [...new Set(innerTextParams)],
        src: elem.cloneNode(true),
        elem
      }
      updateNode(nodes[nodeId])
    }
    for (let i = elem.children.length; i--; ) {
      crawlElement(elem.children[i], nodeId + i)
    }
  }
  // TODO remove dups from keys.*

  // build template
  const element = stringToElement(htmlString)
  crawlElement(element)
  //console.log({ keys, nodes, element, bindings })
  return [element, values]
}

const updateString = (string, values, keys) => {
  keys ??= Object.keys(values)
  let newString = string
  for (let i = keys.length; i--; ) {
    const key = keys[i]
    newString = newString.replaceAll(`{${key}}`, values[key])
  }
  return newString
}

const stringToElement = (string) => {
  return new DOMParser().parseFromString(string, 'text/html').body
    .firstElementChild
}
