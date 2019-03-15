import {FEED_EDIT_FILTER, FEED_EDIT_SORT, INIT_FEEDS} from "../constants/actionType";


const defaultState = {
    feeds: null,
    filter: {
        tag: null,
        keyword: null,
    },
    sort: {
        pages: null,
        sortBy: null,

    }
    ,

};

export default (state = defaultState, action) => {
    switch (action.type) {
        case INIT_FEEDS: {
            return {
                ...state,
                feeds:action.payload?action.payload:[],
            }
        }
        case FEED_EDIT_SORT: {
            return {
                ...state,
                sort: {
                    ...state.sort,
                    [action.payload.key]: action.payload.value,

                }
            }
        }
        case FEED_EDIT_FILTER: {
            return {
                ...state,
                filter: {
                    ...state.filter,
                    [action.payload.key]: action.payload.value,

                }
            }
        }
        default:
            return state
    }
}


