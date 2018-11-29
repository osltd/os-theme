import axios from 'axios'
import Feeds from './agents/Feeds'
import Products from './agents/Products'
import Checkout from './agents/Checkout'

axios.defaults.headers.common['Content-Type'] = 'application/json;charset=UTF-8'
axios.defaults.baseURL = /localhost/i.test(window.location.hostname) ? 'http://localhost:3890/api' : '/api'

export default  {
    Feeds,
    Products,
    Checkout,
};
