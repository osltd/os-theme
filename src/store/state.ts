import {Product} from "../interfaces/server/Product";


export interface State {
    products:Array<Product> | null
}

export const state: State = {
    products: null,
}
export default state;

