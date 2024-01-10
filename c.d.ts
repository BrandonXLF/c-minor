type KeyWithoutPrefix<S extends string, T extends string = any> = S extends `${'_' | '$'}${infer U extends T}` ? U : never;

type EventMap<T extends HTMLElement> = {
    [key in `_${keyof HTMLElementEventMap}`]?: ((this: T, ev: HTMLElementEventMap[KeyWithoutPrefix<key>]) => any);
} & ({
    [key: `_${string}`]: EventListenerOrEventListenerObject;
} | {});

type PropertyMap<T extends HTMLElement> = {
    [key in `$${Extract<keyof T, string>}`]?: T[KeyWithoutPrefix<key, Extract<keyof T, string>>];
};

type HTMLAttributeMap = {
    [key: string]: any;
};

export type Attributes<T extends HTMLElement> = EventMap<T> & PropertyMap<T> & HTMLAttributeMap;

export default function c<T extends HTMLElement>(element: T, attrs?: Attributes<T>| null, ...children: (Node | string)[]): T;
export default function c<T extends keyof HTMLElementTagNameMap>(element: T, attrs?: Attributes<HTMLElementTagNameMap[T]>| null, ...children: (Node | string)[]): HTMLElementTagNameMap[T];
export default function c(element: string, attrs?: Attributes<HTMLElement>| null, ...children: (Node | string)[]): HTMLElement;

export default function c<T extends HTMLElement>(element: T, ...children: (Node | string)[]): T;
export default function c<T extends keyof HTMLElementTagNameMap>(element: T, ...children: (HTMLElement | string)[]): HTMLElementTagNameMap[T];
export default function c(element: string, ...children: (Node | string)[]): HTMLElement;