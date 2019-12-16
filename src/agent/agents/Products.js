import axios from "axios/index";

const Products = {
    initProducts: (search = '') => axios.get(`/merchandises${search}`),
    initBusiness: () => axios.get('/shops/session'),

};
export default Products