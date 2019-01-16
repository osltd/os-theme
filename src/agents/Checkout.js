import axios from "axios/index";

const Checkout = {
    getShippingRate: products => axios.post('/rates',products).then(res => res.data.data.rates).catch(err =>  []),
    placeOrder: data => axios.post('/payments',data),
    getPromoCode: code=> axios.get(`/discounts?code=${code}`)
}
export default Checkout