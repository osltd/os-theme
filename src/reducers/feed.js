import {INIT_FEEDS} from "../constants/actionType";


const defaultState = {
    feeds: null,

};

export default (state = defaultState, action) => {
    switch (action.type) {
        case INIT_FEEDS: {
            return {
                ...state,
                feeds: action.payload,
            }
        }

        default:
            return state
    }
}


