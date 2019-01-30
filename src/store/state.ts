import {Product} from "../interfaces/server/Product";


export const state: State = {
    products: null,

}
export interface State {
    products:Array<Product> | null
}

export default state;

