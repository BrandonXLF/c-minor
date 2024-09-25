export default function c(element, attrs, ...children) {
	let key,
		// Stores the string "string" until the for loop
		keyWithoutPrefixOrString = 'string',
		val;

	if (typeof element == keyWithoutPrefixOrString) {
		[element, key] = element.split('@'); // key is used for the XML namespace
		element = document['createElement' + (key ? 'NS' : '')](key || element, element);
	}

	if (attrs instanceof Node || typeof attrs == keyWithoutPrefixOrString) {
		// element.append returns undefined
		attrs = element.append(attrs);
	}

	for (key in attrs || {}) {
		keyWithoutPrefixOrString = key.slice(1);
		val = attrs[key];
		
		if (key[0] == '_') {
			element.addEventListener(keyWithoutPrefixOrString, val);
			continue;
		} else if (key[0] == '$') {
			element[keyWithoutPrefixOrString] = val;
			continue;
		}

		element.setAttribute(key, val);
	}
	
	element.append(...children);

	return element;
}
