import axios from "axios/index";

const Auth = {
    register: (newUser) => axios.post('/consumers', newUser),
    login: user => axios.post('/sessions', user),
    assignName: async (firstName, lastName) => await axios.put('/consumers/session', {
        firstName: firstName,
        lastName: lastName,
    }),
    getAccount: async () => await axios.get('consumers/session'),
    logout: async () => await axios.delete('consumers/session'),
    forgetPassword: async (email) => await axios.post('/verifications', email),

};
export default Auth