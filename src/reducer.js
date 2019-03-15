import {combineReducers} from 'redux';
import product from './reducers/product';
import {routerReducer} from 'react-router-redux';
import feed from './reducers/feed'
import category from './reducers/category'
import cart from './reducers/cart'
import common from './reducers/common'
import auth from './reducers/auth'

export default combineReducers({
    product,
    feed,
    category,
    cart,
    common,
    auth,
    router: routerReducer
});
