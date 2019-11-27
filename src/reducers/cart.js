import {
    INIT_CART,
    CART_DELETE_ITEM,
    CART_UPDATE_ITEM,
    CART_UPDATE_ORDER_INFO,

    CART_EDIT_BILLING_DETAIL,
    CART_EDIT_VARIANT,
    CART_EMPTY_BILLING_DETAIL,
    CART_EMPTY_PRODUCT_VARIANT,
    CART_INIT_SHOPPING_CART,
    CART_OPERATE_SHOPPING_CART,
    CART_SAVE_PRODUCT_TO_CART
} from "../constants/actionType";


const defaultState = {
    items: null,
    order: {}
};


export default (state = defaultState, action) => {
    switch (action.type) {
        case INIT_CART: 
            return {
                ...state,
                items: action.payload ? action.payload : []
            }
        case CART_DELETE_ITEM:
            return {
                ...state,
                items: action.payload ? (state.items || []).filter(n => {
                    if (n.id == action.payload.id) {
                        return false;
                    }
                    return true;
                }) : state.items
            }
        case CART_UPDATE_ITEM:
            return {
                ...state,
                items: action.payload ? (state.items || []).map(n => {
                    if (n.id == action.payload.id) {
                        n.qty = parseInt(action.payload.qty);
                    }
                    return n;
                }) : state.items
            }
        case CART_UPDATE_ORDER_INFO:
            return {
                ...state,
                order: action.payload || {}
            }
        default:
            return state
    }
}


