import axios from "axios/index";

const Checkout = {
    getShippingRate: products => axios.post('/rates',products).then(res => res.data.data.rates).catch(err => console.log(err)),
    placeOrder: data => axios.post('/checkouts',data)

}
export default Checkout