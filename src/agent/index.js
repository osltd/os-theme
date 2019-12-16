import axios from 'axios'
import Feeds from './agents/Feeds'
import Products from './agents/Products'
import Collections from './agents/Collections'
import Checkout from './agents/Checkout'
import Auth from './agents/Auth'

axios.defaults.headers.common['Content-Type'] = 'application/json;charset=UTF-8';
axios.defaults.baseURL = '/api';

//axios.defaults.headers.common['Authorization'] = 'Basic MzY2OkhOV2NnbHVzNEtnV1FBdm1LV3pNeVFMYlVHNWE1YWcw'

export default {
    Feeds,
    Products,
    Checkout,
    Collections,
    Auth
};
