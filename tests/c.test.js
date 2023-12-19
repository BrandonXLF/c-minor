import c from '../src/c.js';
import assert from 'better-assert';
import sinon from 'sinon';

const date = new Date();

describe('c', () => {
	it('creates new DIV element when element is a string', () => {
		let el = c('div');
		
		assert(el instanceof HTMLElement);
		assert(el.tagName === 'DIV');
	});

	it('creates new CUSTOM-ELEMENT element when element is a string', () => {
		let el = c('custom-element');
		
		assert(el instanceof HTMLElement);
		assert(el.tagName === 'CUSTOM-ELEMENT');
	});

	it('sets attribute', () => {
		let el = c('div', {
			foo: 'bar'
		});
		
		assert(el.getAttribute('foo') === 'bar');
	});

	it('sets Date object as attribute', () => {
		let el = c('div', {
			foo: date
		});
		
		assert(el.getAttribute('foo') === date.toString());
	});

	it('sets multiple attributes', () => {
		let el = c('div', {
			foo: 'bar',
			key: 'val'
		});
		
		assert(el.getAttribute('foo') === 'bar');
		assert(el.getAttribute('key') === 'val');
	});

	it('sets prop', () => {
		let el = c('div', {
			$foo: 'bar'
		});
		
		assert(el.foo === 'bar');
	});

	it('sets Date object as prop', () => {
		let el = c('div', {
			$foo: date
		});
		
		assert(el.foo === date);
	});

	it('sets multiple props', () => {
		let el = c('div', {
			$foo: 'bar',
			$key: 'val'
		});
		
		assert(el.foo === 'bar');
		assert(el.key === 'val');
	});

	it('sets event listener', () => {
		const spy = sinon.fake();
		const el = document.createElement('div');

		el.addEventListener = spy;

		const listener = () => 7 * 12;
		
		c(el, {
			_click: listener
		});
		
		assert(spy.calledOnce);
		assert(spy.calledWith('click', listener));
	});

	it('sets multiple event listeners', () => {
		const spy = sinon.fake();
		const el = document.createElement('div');

		el.addEventListener = spy;

		const listener = () => 7 * 12;
		const listener2 = () => 3 * 23;
		
		c(el, {
			_click: listener,
			_keydown: listener2
		});
		
		assert(spy.calledTwice);
		assert(spy.calledWith('click', listener));
		assert(spy.calledWith('keydown', listener2));
	});

	it('sets mix of attributes, props, and event listeners', () => {
		const spy = sinon.fake();
		const el = document.createElement('div');

		el.addEventListener = spy;
		
		const listener = () => 7 * 12;
		
		c(el, {
			foo: 'val',
			$bar: 'val',
			_baz: listener
		});
		
		assert(el.getAttribute('foo') === 'val');
		assert(el.bar === 'val');

		assert(spy.calledOnce);
		assert(spy.calledWith('baz', listener));
	});

	it('sets mix of attributes, props, and event listeners with same name', () => {
		const spy = sinon.fake();
		const el = document.createElement('div');

		el.addEventListener = spy;
		
		const listener = () => 7 * 12;
		
		c(el, {
			foo: 'bar',
			$foo: 'baz',
			_foo: listener
		});
		
		assert(el.getAttribute('foo') === 'bar');
		assert(el.foo === 'baz');

		assert(spy.calledOnce);
		assert(spy.calledWith('foo', listener));
	});

	it('sets single child string', () => {
		let el = c('div', null, 'foo');
		
		assert(el.childNodes.length === 1);
		assert(el.childNodes[0] instanceof Text);
		assert(el.childNodes[0].nodeValue === 'foo');
	});

	it('sets single child string without attributes argument', () => {
		let el = c('div', 'foo');
		
		assert(el.childNodes.length === 1);
		assert(el.childNodes[0] instanceof Text);
		assert(el.childNodes[0].nodeValue === 'foo');
	});

	it('sets single child HTMLElement node', () => {
		let child = document.createElement('div');
		let el = c('div', null, child);
		
		assert(el.childNodes.length === 1);
		assert(el.childNodes[0] === child);
	});

	it('sets single child HTMLElement node without attributes argument', () => {
		let child = document.createElement('div');
		let el = c('div', child);
		
		assert(el.childNodes.length === 1);
		assert(el.childNodes[0] === child);
	});

	it('sets single child Text node', () => {
		let child = document.createTextNode('foo');
		let el = c('div', null, child);
		
		assert(el.childNodes.length === 1);
		assert(el.childNodes[0] === child);
	});

	it('sets single child Text node without attributes argument', () => {
		let child = document.createTextNode('foo');
		let el = c('div', child);
		
		assert(el.childNodes.length === 1);
		assert(el.childNodes[0] === child);
	});

	it('sets children to an array of strings and Nodes', () => {
		let children = [
			'foo',
			document.createElement('div'),
			document.createElement('a'),
			document.createTextNode('bar'),
			'mango'
		];

		let el = c('div', null, ...children);
		
		assert(el.childNodes.length === children.length);
		
		children.forEach((child, i) => {
			if (typeof child == 'string') {
				assert(el.childNodes[i] instanceof Text);
				assert(el.childNodes[i].nodeValue === child);

				return;
			}
			
			assert(el.childNodes[i] === child);
		});
	});

	it('sets children to an array of strings and Nodes without attributes argument', () => {
		let children = [
			'foo',
			document.createElement('div'),
			document.createElement('a'),
			document.createTextNode('bar'),
			'mango'
		];

		let el = c('div', ...children);
		
		assert(el.childNodes.length === children.length);
		
		children.forEach((child, i) => {
			if (typeof child == 'string') {
				assert(el.childNodes[i] instanceof Text);
				assert(el.childNodes[i].nodeValue === child);

				return;
			}
			
			assert(el.childNodes[i] === child);
		});
	});

	it('sets attributes and children', () => {
		let child = document.createElement('div');
		
		let el = c('div', {
			foo: 'bar'
		}, child);
		
		assert(el.getAttribute('foo') === 'bar');
		assert(el.childNodes.length === 1);
		assert(el.childNodes[0] === child);
	});
});