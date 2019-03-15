import {
    CART_EDIT_BILLING_DETAIL,
    CART_EDIT_VARIANT,
    CART_EMPTY_BILLING_DETAIL,
    CART_EMPTY_PRODUCT_VARIANT,
    CART_INIT_SHOPPING_CART,
    CART_OPERATE_SHOPPING_CART,
    CART_SAVE_PRODUCT_TO_CART
} from "../constants/actionType";


const defaultState = {
    shoppingCart: null,
    variant: {},
    billingDetail: {
        countryCode: {label: "Hong Kong (  +852 )", value: "+852"},
    },
};

export default (state = defaultState, action) => {
    let detail = Object.assign({}, state.detail)

    switch (action.type) {
        case CART_EDIT_VARIANT:
            return {
                ...state,
                variant: {
                    ...state.variant,
                    [action.payload.key]: action.payload.value,
                }
            }
        case CART_SAVE_PRODUCT_TO_CART: {

            let shoppingCart = Array.from(state.shoppingCart)
            let existedInCart = shoppingCart.find(n => {
                    if (n.variantId === action.payload.variantId) {
                        n.number += action.payload.number
                        return true
                    }
                    return false
                }
            )

            if (!(existedInCart)) {
                shoppingCart.push(
                    {
                        product: action.payload.product,
                        number: action.payload.number,
                        variantId: action.payload.variantId,

                    }
                )
            }
            localStorage.setItem('shoppingCart', JSON.stringify(shoppingCart))

            return {
                ...state,
                shoppingCart: shoppingCart,
            }
        }
        case CART_INIT_SHOPPING_CART: {
            if (!(action.payload)) localStorage.setItem('shoppingCart', JSON.stringify([]))
            return {
                ...state,
                shoppingCart: action.payload ? action.payload : []
            }
        }
        case  CART_EMPTY_PRODUCT_VARIANT: {
            return {
                ...state,
                variant: {},
            }
        }
        case CART_OPERATE_SHOPPING_CART: {
            let shoppingCart = Array.from(state.shoppingCart)
            switch (action.payload.key) {
                case 'remove':
                    shoppingCart.splice(action.payload.value, 1)
                    localStorage.setItem('shoppingCart', JSON.stringify(shoppingCart))
                    return {
                        ...state,
                        shoppingCart: shoppingCart,
                    }
                default:
                    const {index, count} = action.payload.value
                    shoppingCart[index].number = count
                    localStorage.setItem('shoppingCart', JSON.stringify(shoppingCart))
                    return {
                        ...state,
                        shoppingCart: shoppingCart,
                    }
            }
        }
        case CART_EDIT_BILLING_DETAIL: {
            let billingDetail = Object.assign({}, state.billingDetail)
            const {key, value} = action.payload
            billingDetail[key] = value
            return {
                ...state,
                billingDetail: billingDetail,
            }
        }
        case     CART_EMPTY_BILLING_DETAIL: {
            return {
                ...state,
                billingDetail: {},
            }
        }
        default:
            return state
    }
}


