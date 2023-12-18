import c, { Attributes } from '../c';

type Expect<T extends true> = T;
type Equal<X, Y> = (<T>() => T extends X ? 1 : 2) extends <T>() => T extends Y ? 1 : 2 ? true : false;

type _1 = Expect<Equal<Attributes<HTMLInputElement>['$value'], string | undefined>>;
type _2 = Expect<Equal<Attributes<HTMLElement>['$value'], any>>;
type _3 = Expect<Equal<Attributes<HTMLInputElement>['$custom'], any>>;

c('input') satisfies HTMLInputElement;
c('my-custom-element') satisfies HTMLElement;
c(document.getElementById('foo')! as HTMLDivElement) satisfies HTMLDivElement;

c('input', {
    _click: function(e) {
        e satisfies MouseEvent;
        this satisfies HTMLInputElement;
    },
    _input: function(e) {
        e satisfies Event;
        this satisfies HTMLInputElement;
    },
    _customEvent: e => {
        e satisfies Event;
    },
    $value: 'Foo',
    $custom: Symbol(),
    style: 'color: red'
});

c('my-custom-element', {
    _click: function(e) {
        e satisfies MouseEvent;
        this satisfies HTMLElement;
    },
    _input: function(e) {
        e satisfies Event;
        this satisfies HTMLElement;
    },
    _customEvent: e => {
        e satisfies Event;
    },
    $value: 123, // Is custom in this case
    $custom: Symbol(),
    style: 'color: red'
});

c(document.getElementById('bar')! as HTMLInputElement, {
    _click: function(e) {
        e satisfies MouseEvent;
        this satisfies HTMLInputElement;
    },
    _input: function(e) {
        e satisfies Event;
        this satisfies HTMLInputElement;
    },
    _customEvent: e => {
        e satisfies Event;
    },
    $value: 'Foo',
    $custom: Symbol(),
    style: 'color: red'
});

c('div', null, 'Foo');
c('div', null, c('span'));
c('div', null, 'Foo', c('span'));
c('div', null, c('span'), 'Foo');

c('div', 'Foo');
c('div', c('span'));
c('div', 'Foo', c('span'));
c('div', c('span'), 'Foo');

c('div');
c('div', {});
c('div', null);