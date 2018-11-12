import axios from "axios/index";

const Products = {
    initProducts: () => axios.get('/commodities').then(res => res.data.data.products).catch(err =>
        console.log(err)),


}
export default Products