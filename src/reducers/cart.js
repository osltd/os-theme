import {
    CART_EDIT_VARIANT,
    CART_EMPTY_PRODUCT_VARIANT,
    CART_INIT_SHOPPING_CART,
    CART_OPERATE_SHOPPING_CART,
    CART_SAVE_PRODUCT_TO_CART
} from "../constants/actionType";


const defaultState = {
    shoppingCart: [],

    variant: {},

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
                    if (n.variantId === action.payload.variantId && n.product === action.payload.product) {
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
                case 'count':
                    const {index, count} = action.payload.value
                    shoppingCart[index].number = count
                    localStorage.setItem('shoppingCart', JSON.stringify(shoppingCart))

                    return {
                        ...state,
                        shoppingCart: shoppingCart,

                    }

            }
        }
        default:
            return state
    }
}


