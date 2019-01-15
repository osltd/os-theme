
export interface Clickable {
    label:string,
    onClick: Function,
    value?:string,
}

export interface VariantOptions {
    [key:string]:Array<string>,
}

export interface RoutePath {
    label: string,
    link: string,
}