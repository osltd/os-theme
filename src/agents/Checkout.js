import axios from "axios/index";

const Checkout = {
    getShippingRate: products => axios.post('/rates', products).then(res => res.data.data.rates).catch(err => []),
    placeOrder: order => axios.post('/payments', order),
    placeOrderWithoutLogin: order => axios.post('/orders', order),
    getPromoCode: code => axios.get(`/discounts?code=${code}`),
};

export default Checkout