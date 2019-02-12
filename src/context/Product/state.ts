import {Product} from "../../interfaces/server/Product";
import {Feed} from "../../interfaces/server/Feed";


export interface State {
    products?: Array<Product>
}

export const state: State = {};
export default state;

