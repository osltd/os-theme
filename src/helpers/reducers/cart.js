const Cookies = require('universal-cookie').default;
// setup cookies
const cookies = new Cookies();

let initState = {
    id : cookies.get('cartId') || null,
    items : []
};

export default (state = initState, action) => {
    switch(action.type) {
        case 'INIT_CART' : {
            return {
                ...state,
                id : action.payload
            };
        }
        case 'SET_CART_ITEMS' :
            return {
                ...state,
                items : action.payload
            };
        default:
            return state;
    }
}