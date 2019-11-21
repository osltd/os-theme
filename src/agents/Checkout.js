import axios from "axios/index";

const Checkout = {
    getCart: form => axios.post('/carts', form),
    addItem: (cart, form) => axios.post(`/carts/${cart}/items`, form),

    getShippingRate: products => axios.post('/rates', products).then(res => res.data.data.rates).catch(err => []),
    placeOrder: order => axios.post('/payments', order),
    placeOrderWithoutLogin: order => axios.post('/orders', order),
    getPromoCode: code => axios.get(`/discounts?code=${code}`),
};

export default Checkout