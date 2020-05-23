import { combineReducers } from 'redux';
import product from './product';
import article from './article';
import user from './user';
import shop from './shop';
import cart from './cart';
import home from './home';

export default combineReducers({ product, article, user, shop, cart, home });