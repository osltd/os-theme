import axios from "axios/index";

const Products = {
    initProducts: (search = '') => axios.get(`/merchandises${search}`),
    getFeaturedMerchandises: page => axios.get(`/merchandises?tags=featured${page ? '&page=' + page : ''}`),


    initBusiness: () => axios.get('/shops/session'),

};
export default Products