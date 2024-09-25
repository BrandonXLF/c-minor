export default function c(element, attrs, ...children) {
	let isString = val => typeof val === 'string',
		keyOrNamespace,
		val,
		keyWithoutPrefix;

	if (isString(element)) {
		[element, keyOrNamespace] = element.split('@');
		element = document['createElement' + (keyOrNamespace ? 'NS' : '')](keyOrNamespace || element, element);
	}

	if (attrs instanceof Node || isString(attrs)) {
		element.append(attrs);
	} else if (attrs) {
		for (keyOrNamespace in attrs) {
			val = attrs[keyOrNamespace];
			keyWithoutPrefix = keyOrNamespace.slice(1);
			
			if (keyOrNamespace[0] == '_') {
				element.addEventListener(keyWithoutPrefix, val);
				continue;
			}

			if (keyOrNamespace[0] == '$') {
				element[keyWithoutPrefix] = val;
				continue;
			}

			element.setAttribute(keyOrNamespace, val);
		}
	}
	
	element.append(...children);

	return element;
}
