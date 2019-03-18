import {Product} from "../../interfaces/server/Product";


export interface State {
    products?: Array<Product>
}

export const state: State = {};
export default state;

