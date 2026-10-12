export const globalAttributes = new Set([
	"accesskey",
	"autocapitalize",
	"autocorrect",
	"autofocus",
	"class",
	"contenteditable",
	"dir",
	"draggable",
	"enterkeyhint",
	"exportparts",
	"hidden",
	"id",
	"inert",
	"inputmode",
	"is",
	"itemid",
	"itemprop",
	"itemref",
	"itemscope",
	"itemtype",
	"lang",
	"nonce",
	"part",
	"popover",
	"role",
	"slot",
	"spellcheck",
	"style",
	"tabindex",
	"title",
	"translate",
	"virtualkeyboardpolicy",
	"writingsuggestions",
]);

const allowedAttributes = (props = {}, elementAttributes = new Set([])) => {
	const attributes = {};
	for (const prop in props) {
		if (prop.toLowerCase().startsWith("on")) continue;
		if (
			elementAttributes.has(prop) ||
			globalAttributes.has(prop) ||
			/^(data|aria)-./.test(prop)
		) {
			attributes[prop] = props[prop];
		}
	}
	return attributes;
};

export default allowedAttributes;
