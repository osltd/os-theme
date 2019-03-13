import {
    EDIT_PRODUCT_DETAIL,
    EDIT_PRODUCT_VIEW_MODE,
    INIT_PRODUCTS,
    PRODUCT_EDIT_FILTER,
    PRODUCT_EDIT_SORT
} from "../constants/actionType";


const defaultState = {
    products: null,
    viewMode: 'form',
    filter: {
        tag: null,
    },
    sort: {
        sortBy: null,
        page: '',
    }
    ,
    detail: {
        section: 'Comments',
    }
};

export default (state = defaultState, action) => {
    let detail = Object.assign({}, state.detail)

    switch (action.type) {
        case INIT_PRODUCTS:
        {

            console.log(action.payload)
            return {
                ...state,
                products: action.payload?action.payload:[],
            }
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
        case PRODUCT_EDIT_FILTER: {
            return {
                ...state,
                filter: {
                    ...state.filter,
                    [action.payload.key]: action.payload.value,

                }
            }
        }
        case PRODUCT_EDIT_SORT: {
            return {
                ...state,
                sort: {
                    ...state.sort,
                    [action.payload.key]: action.payload.value,

                }
            }
        }

        default:
            return state
    }
}


