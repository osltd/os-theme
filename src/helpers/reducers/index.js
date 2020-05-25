import { combineReducers } from 'redux';
import product from './product';
import article from './article';
import user from './user';
import shop from './shop';
import cart from './cart';
import home from './home';
import i18n from './i18n';

export default combineReducers({ product, article, user, shop, cart, home, i18n });