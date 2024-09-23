export default function c(element, attrs, ...children) {
	let isString = val => typeof val === 'string',
		ns,
		key,
		val,
		keyWithoutPrefix;

	if (isString(element)) {
		[element, ns] = element.split('@');
		
		element = ns
			? document.createElementNS(ns, element)
			: document.createElement(element);
	}

	if (attrs instanceof Node || isString(attrs)) {
		element.append(attrs);
	} else if (attrs) {
		for (key in attrs) {
			val = attrs[key];
			keyWithoutPrefix = key.slice(1);
			
			if (key[0] == '_') {
				element.addEventListener(keyWithoutPrefix, val);
				continue;
			}

			if (key[0] == '$') {
				element[keyWithoutPrefix] = val;
				continue;
			}

			element.setAttribute(key, val);
		}
	}
	
	element.append(...children);

	return element;
}
