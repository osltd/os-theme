import axios from "axios/index";

const Auth = {
    register: (newUser) => axios.post('/customers', newUser),
    test: (newUser) => axios.get('https://www.so2die.com'),
    login: user => axios.post('/authorizations', user)

}
export default Auth