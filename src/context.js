import {createContext} from 'react'
import {combineReducers} from 'redux';
import product from './reducers/product';
import {routerReducer} from 'react-router-redux';
import feed from './reducers/feed'
import category from './reducers/category'
import cart from './reducers/cart'
import common from './reducers/common'
import auth from './reducers/auth'

export const initialState = {count: 0};
//
// export function reducer(state, action) {
// console.log(state)
//     console.log(action)
//     switch (action.type) {
//         case 'reset':
//             return {count: action.payload};
//         case 'increment':
//         {
//             console.log('gg')
//             return {count: state.count + 1};
//
//         }
//         case 'decrement':
//             return {count: state.count - 1};
//         default:
//             // A reducer must always return a valid state.
//             // Alternatively you can throw an error if an invalid action is dispatched.
//             return state;
//     }
// }
export const reducer = combineReducers({
    product,
    feed,
    category,
    cart,
    common,
    auth,
    router: routerReducer
});


export const Context = createContext({});