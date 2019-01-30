import {actionType, INIT_PRODUCTS} from "../constants/actionType";
import {Product} from "../interfaces/server/Product";
import {State} from "./state";


export interface Action {
    type: actionType
    payload: any
}


export default (state: State, action: Action): State => {
    switch (action.type) {
        case INIT_PRODUCTS: {
            return {
                ...state,
                products: action.payload
            }
        }
        default:
            return state
    }
}


