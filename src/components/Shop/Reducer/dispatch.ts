import {shopActionType} from "./actionType";
import {State} from "./state";
import {Product} from "../../../interfaces/server/Product";

export interface Action {
    type: shopActionType
    payload: {
        products?: Array<Product>
    }

}


const dispatch = (state: State, action: Action): State => {
    switch (action.type) {
        case shopActionType.SHOP_INIT_PRODUCT: {
            return ({
                ...state,
                products: action.payload.products ? action.payload.products : []
            })
        }
        default:
            return state
    }
};


export default dispatch

