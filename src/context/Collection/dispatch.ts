import actionType from "./actionType";
import {State} from "./state";
import {Item} from "../../interfaces/server/Collection";

export interface Action {
    type: actionType
    payload: {
        items?: Array<Item>
    }

}


const dispatch = (state: State, action: Action): State => {
    switch (action.type) {
        case actionType.COLLECTION_INIT_ITEMS: {
            return ({
                ...state,
                items: action.payload.items ? action.payload.items : []
            })
        }
        default:
            return state
    }
};


export default dispatch

