import {Product} from "../interfaces/server/Product";
import {Feed} from "../interfaces/server/Feed";


export interface State {
    products?: Array<Product>
    feeds?:Array<Feed>
}

export const state: State = {};
export default state;

