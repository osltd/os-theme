import {
    EDIT_PRODUCT_DETAIL,
    EDIT_PRODUCT_VIEW_MODE,
    INIT_PRODUCTS,
    PRODUCT_EDIT_FILTER,
    PRODUCT_EDIT_SORT
} from "../constants/actionType";


const defaultState = {
    products:[],

    variant:{



    },

};

export default (state = defaultState, action) => {
    let detail = Object.assign({}, state.detail)

    switch (action.type) {


        default:
            return state
    }
}


