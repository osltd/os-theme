import axios from "axios/index";

const Auth = {
    register: (newUser) => axios.post('/customers', newUser),
    login: user => axios.post('/sessions', user),
    assignName: (firstName,lastName)=> axios.put('/consumers/session',{
        firstName:firstName,
        lastName:        lastName,}),
    getAccount: ()=> axios.get('consumers/session'),
    logout: ()=> axios.delete('consumers/session'),

}
export default Auth