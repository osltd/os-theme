import {actionType} from "../../constants/actionType";
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
        case actionType.INIT_PRODUCTS: {
            let fun = (payload?: Array<Product>): State =>({
                    ...state,
                    products: payload?payload:[]
                })
           return fun(action.payload.products)
        }
        default:
            return state
    }
};


export default dispatch

