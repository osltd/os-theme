import actionType from "./actionType";
import {State} from "./state";
import {Product} from "../../interfaces/server/Product";

export interface Action {
    type: actionType
    payload: {
        products?: Array<Product>
    }

}


const dispatch = (state: State, action: Action): State => {
    switch (action.type) {
        case actionType.PRODUCT_INIT_PRODUCTS: {
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

