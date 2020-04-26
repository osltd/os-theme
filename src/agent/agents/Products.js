import axios from "axios/index";

const Products = {
    initProducts: (search = '', page ) => axios.get(`/merchandises${search}`),
    loadProducts : (page = 1) => axios.get(`/merchandises?page=${page}`).then(res => res.data.data.rows).catch(err => []),
    getFeaturedMerchandises: page => axios.get(`/merchandises?tags=featured${page ? '&page=' + page : ''}`),
    initBusiness: () => axios.get('/shops/session'),
};
export default Products