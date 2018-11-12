import axios from 'axios'
import Feeds from './agents/Feeds'
import Products from './agents/Products'


axios.defaults.headers.common['Content-Type'] = 'application/json;charset=UTF-8'
axios.defaults.baseURL = 'https://daviddev.oneshop.hk/api'

export default {
    Feeds,
    Products,
};
