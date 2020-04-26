import {
    INIT_PRODUCTS,
    MERCHANDISE_INIT_FEATURED,
    LOAD_PRODUCTS,
    PRODUCT_CATEGORY_IS_LOADING,
    PRODUCT_IS_LOADING,
    EDIT_PRODUCT_DETAIL,
    EDIT_PRODUCT_VIEW_MODE,
    PRODUCT_EDIT_FILTER,
    PRODUCT_EDIT_SORT
} from "../../constants/actionType";


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
    let detail = Object.assign({}, state.detail);

    switch (action.type) {
        case INIT_PRODUCTS: {
            return {
                ...state,
                products: action.payload ? action.payload : [],
            }
        }
        case PRODUCT_IS_LOADING:{
            return {
                ...state,
                productIsLoading : action.payload
            }
        }
        case PRODUCT_CATEGORY_IS_LOADING : {
            return {
                ...state,
                productCategoryIsLoading : action.payload
            }
        }
        case LOAD_PRODUCTS : {
            return {
                ...state,
                products: action.payload ? action.payload : [],
            }
        }
        case MERCHANDISE_INIT_FEATURED: {

            return {
                ...state,
                featuredMerchandises: action.payload ? action.payload : [],
            }
        }
        case EDIT_PRODUCT_VIEW_MODE:
            return {
                ...state,
                viewMode: action.payload,
            };
        case EDIT_PRODUCT_DETAIL: {
            detail[action.payload.key] = action.payload.value;

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


