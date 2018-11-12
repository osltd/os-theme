import {EDIT_PRODUCT_DETAIL, EDIT_PRODUCT_VIEW_MODE,INIT_PRODUCTS} from "../constants/actionType";


const defaultState = {
    products: [

    ],
    viewMode: 'form',
    detail: {
        section: 'Comments',
    }
};

export default (state = defaultState, action) => {
    let detail = Object.assign({}, state.detail)

    switch (action.type) {
        case INIT_PRODUCTS:
            return{
                ...state,
                products: action.payload,
            }

        case EDIT_PRODUCT_VIEW_MODE:

            return {
                ...state,
                viewMode: action.payload,
            }
        case EDIT_PRODUCT_DETAIL: {
            detail[action.payload.key] = action.payload.value

            return {
                ...state,
                detail: detail

            }

        }

        default:
            return state
    }
}


