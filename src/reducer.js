import {combineReducers} from 'redux';
import product from './reducers/product';
import {routerReducer} from 'react-router-redux';
import feed from './reducers/feed'
import category from './reducers/category'
import cart from './reducers/cart'
import common from './reducers/common'

export default combineReducers({
    product,
    feed,
    category,
    cart,
    common,
    router: routerReducer
});
