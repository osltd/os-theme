import {CATEGORY_INIT_CATEGORY} from "../constants/actionType";

const defaultState = {
    category: []
};

export default (state = defaultState, action) => {
    switch (action.type) {

        case CATEGORY_INIT_CATEGORY: {
            return {
                ...state,
                category: action.payload.length > 0 ? action.payload.map(
                    n => ({
                        name: n,
                        img: `img/category/${n}.jpeg`

                    })) : []
            }
        }


        default:
            return state
    }
}


