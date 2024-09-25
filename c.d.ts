type KeyWithoutPrefix<S extends string, T extends string = any> = S extends `${'_' | '$'}${infer U extends T}` ? U : never;

type EventMap<T extends HTMLOrSVGElement> = {
    [key in `_${keyof HTMLElementEventMap}`]?: ((this: T, ev: HTMLElementEventMap[KeyWithoutPrefix<key>]) => any);
} & ({
    [key: `_${string}`]: EventListenerOrEventListenerObject;
} | {});

type PropertyMap<T extends HTMLOrSVGElement> = {
    [key in `$${Extract<keyof T, string>}`]?: T[KeyWithoutPrefix<key, Extract<keyof T, string>>];
};

type HTMLAttributeMap = {
    [key: string]: any;
};

type KnownName = keyof HTMLElementTagNameMap
    | `${keyof SVGElementTagNameMap}@http://www.w3.org/2000/svg`
    | `${keyof MathMLElementTagNameMap}@http://www.w3.org/1998/Math/MathML`;

type ElementMap = HTMLElementTagNameMap
    & { [P in keyof SVGElementTagNameMap as `${P}@http://www.w3.org/2000/svg`]: SVGElementTagNameMap[P] }
    & { [P in keyof MathMLElementTagNameMap as `${P}@http://www.w3.org/1998/Math/MathML`]: MathMLElementTagNameMap[P] }

export type Attributes<T extends HTMLOrSVGElement> = EventMap<T> & PropertyMap<T> & HTMLAttributeMap;

export default function c<T extends HTMLOrSVGElement>(element: T, attrs?: Attributes<T>| null, ...children: (Node | string)[]): T;
export default function c<T extends KnownName>(element: T, attrs?: Attributes<ElementMap[T]>| null, ...children: (Node | string)[]): ElementMap[T];
export default function c(element: `${string}@${string}`, attrs?: Attributes<HTMLOrSVGElement>| null, ...children: (Node | string)[]): HTMLOrSVGElement;
export default function c(element: string, attrs?: Attributes<HTMLElement>| null, ...children: (Node | string)[]): HTMLElement;

export default function c<T extends HTMLOrSVGElement>(element: T, ...children: (Node | string)[]): T;
export default function c<T extends KnownName>(element: T, ...children: (HTMLElement | string)[]): ElementMap[T];
export default function c(element: `${string}@${string}`, ...children: (Node | string)[]): HTMLOrSVGElement;
export default function c(element: string, ...children: (Node | string)[]): HTMLElement;