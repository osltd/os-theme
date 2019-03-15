import axios from 'axios'
import Feeds from './agents/Feeds'
import Products from './agents/Products'
import Checkout from './agents/Checkout'
import Auth from './agents/Auth'
import SendGrid from './agents/SendGrid'
import Common from './agents/Common'

axios.defaults.headers.common['Content-Type'] = 'application/json;charset=UTF-8';
axios.defaults.baseURL = '/api';

//axios.defaults.headers.common['Authorization'] = 'Basic MzY2OkhOV2NnbHVzNEtnV1FBdm1LV3pNeVFMYlVHNWE1YWcw'

export default {
    Feeds,
    Products,
    Checkout,
    Auth,
    SendGrid,
    Common
};
