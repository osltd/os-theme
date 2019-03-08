import {Media} from "./Common";

export interface Variant {
    id: number,
    sku: string,
    price: number,
    stock: number,
    weight: number,
    description: string,
    photos: Array<Media>,
}

export interface Product {

    id: number,
    name: string,
    description: string,
    tags: Array<string>,
    photos: Array<Media>,
    variants: Array<Variant>,
    time: string,

}