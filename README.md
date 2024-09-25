# c-minor

## Infinitesimally small package for creating HTML elements

![NPM package minimized gzipped size](https://img.shields.io/bundlejs/size/c-minor)&nbsp;
![NPM version info](https://img.shields.io/npm/v/c-minor)&nbsp;
![NPM license info](https://img.shields.io/npm/l/c-minor)&nbsp;
![Test status](https://img.shields.io/github/actions/workflow/status/BrandonXLF/c-minor/tests.yml)

c-minor is an extremely small and lightweight JavaScript package that enables the creation and modification of HTML elements with a concise and simple syntax.

It supports the addition of event listeners, attributes, properties, and children all while having a production size of under 300 bytes before compression! You can view an [editable live demo at JSFiddle](https://jsfiddle.net/gh/get/library/pure/BrandonXLF/c-minor/tree/fiddle/demo/src).

## Documentation

### Signatures

`c(element, attrs, ...children)`

`c(element, ...children)`

### element

Type: `string | HTMLElement`

An existing `HTMLElement` or `string` to use as the tag name of a newly created element. If tag name is provided, an XML namespace can be specified using the syntax `'TAG@NAMESPACE'`. For example, `'svg@http://www.w3.org/2000/svg'`.

### attrs

Type: `{ [key: string]: any } | undefined | null`

An object containing key-value pairs of attributes, properties, and event listeners to add to the element.

Properties are prefixed with `$`. For example, `$date: new Date()` will set the `date` prop of the element to a newly created `Date` object.

Event listeners are prefixed with `_`. For example, `_click: e => console.log(e)` will add a `click` event listener that logs the event object to the console.

Keys without prefixes are used for attributes. For example, `class: 'foo'` sets the `class` attribute of the element to `foo`.

### ...children

Type: `( string | HTMLElement )[]`

The remaining arguments are for children to append to the element. A child may be either a `string` or an `HTMLElement`. If the child is a string, it is converted to a `Text` node before being appended. This means strings containing HTML syntax can be safely appended to the element. Passing no children is permitted.

### Return value

Type: `HTMLElement`

Returns value of `element` if it was a `HTMLElement` or the `HTMLElement` created by the function if `element` was a `string`.

### Unsafely setting HTML from a string

If you want to set the HTML value of the element using a string, you can add a `$innerHTML: '<h1>Unsafe HTML</h1>'` entry to the `attrs` argument. Only do this for trusted HTML as this opens up possibilities for XSS attacks.

## Example

```js
c(
  document.body, // Existing element
  {
    style: 'color: red' // Attribute
  },
  c( // Child element
    'div', // New DIV element
    {
      _click: e => alert(e.target.prop), // Event listener
      $prop: 7 // Property
    },
    'Foo', // Child string
    c('span', 'Bar') // Attributeless element
  )
);
```

## Commands

* `npm run build` - Generate publishable version of c-minor in the `dist` directory.
* `npm run test` - Run both code tests and `c.d.ts` type tests.
* `npm run size` - Determine the size of the files produced by the build script.
