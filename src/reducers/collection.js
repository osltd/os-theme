import {COLLECTION_INIT_ITEMS} from "../constants/actionType";


const defaultState = {
    items: []
};

export default (state = defaultState, action) => {
    switch (action.type) {
        case COLLECTION_INIT_ITEMS: {
            return {
                ...state,
                items: action.payload ? action.payload : [],
            }
        }
        default:
            return state
    }
}


