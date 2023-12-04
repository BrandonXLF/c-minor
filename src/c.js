function c(element, attrs, ...children) {
	if (typeof element == 'string') {
		element = document.createElement(element);
	}

	if (attrs) {
		for (let key in attrs) {
			let val = attrs[key],
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