import {State} from "./state";
import {Product} from "../../interfaces/server/Product";
import {feedActionType} from "./actionType";

export interface Action {
    type: feedActionType
    payload: {
products?:Array<Product>
    }

}


const dispatch = (state: State, action: Action): State => {
    switch (action.type) {
        case feedActionType.PRODUCT_INIT_PRODUCTS: {
            return {
                ...state,
                products: action.payload.products
            }
        }
        default:
            return state
    }
};


export default dispatch

