
export interface Clickable {
    label:string,
    onClick: Function,
    value?:string,
}

export interface VariantOptions {
    [key:string]:Array<string>,
}

export interface Tag {
    label: string,
    value: string,
}
export interface RoutePath {
    label: string,
    link: string,
}