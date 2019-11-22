import axios from "axios/index";

const Checkout = {
    initCart: cart => axios.get(`/carts/${cart}/items`),
    getCart: form => axios.post('/carts', form),
    addItem: (cart, form) => axios.post(`/carts/${cart}/items`, form),
    deleteItem: (cart, id) => axios.delete(`/carts/${cart}/items/${id}`),

    getShippingRate: products => axios.post('/rates', products).then(res => res.data.data.rates).catch(err => []),
    placeOrder: order => axios.post('/payments', order),
    placeOrderWithoutLogin: order => axios.post('/orders', order),
    getPromoCode: code => axios.get(`/discounts?code=${code}`),
};

export default Checkout