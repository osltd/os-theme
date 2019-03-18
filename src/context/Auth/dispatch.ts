import actionType from "./actionType";
import authActionType from "./actionType";
import {State} from "./state";
import {UserProfile} from "../../interfaces/server/Auth";

export interface Action {
    type: actionType
    payload: {
        user?: UserProfile,
        loading?: boolean
    }

}


const dispatch = (state: State, action: Action): State => {
    switch (action.type) {
        case actionType.AUTH_INIT_USER: {
            return (action.payload.user) ?
                ({
                    ...state,
                    user: action.payload.user
                }) : ({
                    ...state
                })
        }
        case actionType.AUTH_EDIT_LOADING: {
            return {
                ...state,
                loading: action.payload.loading
            }
        }
        case authActionType.AUTH_DELETE_USER: {
            return ({
                ...state,
                user: undefined
            })
        }
        default:
            return state
    }
};


export default dispatch

