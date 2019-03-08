import axios from "axios/index";

const Auth = {
    register: (newUser) => axios.post('/consumers', newUser),
    login: user => axios.post('/sessions', user),
    assignProperty: async (newProperty) => await axios.put('/consumers/session', newProperty),
    getOrder: async () => await axios.get('https://panel.oneshop.cloud/api/shops/9/orders?ids=GsneBwdWOpAV6'),
    getAccount: async () => await axios.get('consumers/session'),
    logout: async () => await axios.delete('consumers/session'),
    forgetPassword: async (email) => await axios.post('/verifications', email),

};
export default Auth