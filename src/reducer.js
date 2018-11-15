import {combineReducers} from 'redux';
import product from './reducers/product';
import {routerReducer} from 'react-router-redux';
import feed from './reducers/feed'
import category from './reducers/category'
import cart from './reducers/cart'




export default combineReducers({
    product,
    feed,
    category,
    cart,
    router: routerReducer
});
