import actionType from "./actionType";
import {State} from "./state";
import {Feed} from "../../interfaces/server/Feed";

export interface Action {
    type: actionType
    payload: {
        feeds?: Array<Feed>
    }

}


const dispatch = (state: State, action: Action): State => {
    switch (action.type) {
        case actionType.FEED_INIT_FEEDS: {
            return ({
                ...state,
                feeds: action.payload.feeds ? action.payload.feeds : []
            })
        }
        default:
            return state
    }
};


export default dispatch

