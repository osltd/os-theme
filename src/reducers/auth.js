import {AUTH_INIT_TOKEN, AUTH_INIT_USER_PROFILE} from "../constants/actionType";


const defaultState = {
    user: {},
    token: '',
};

export default (state = defaultState, action) => {
    switch (action.type) {
        case AUTH_INIT_TOKEN: {
            return {
                ...state,
                token: action.payload
            }
        }
        case AUTH_INIT_USER_PROFILE: {
console.log(action.payload)
            return {
                ...state,
                user: action.payload,
            }
        }
        default:
            return state
    }
}


