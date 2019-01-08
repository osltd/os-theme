import axios from "axios/index";

const Products = {
    initProducts: (search='') => axios.get(`/commodities${search}`).then(res => res.data.data.products).catch(err => console.log(err)),


}
export default Products