import {COMMON_EDIT_SEARCH_BAR,COMMON_INIT_MY_CREDIT} from "../constants/actionType";


const defaultState = {
    searchBar: '',
myCredit:null,
};

export default (state = defaultState, action) => {

    switch (action.type) {

        case COMMON_EDIT_SEARCH_BAR: {
            let searchBar = action.payload ? action.payload : ''
            return {
                ...state,
                searchBar: searchBar
            }
        }

        case COMMON_INIT_MY_CREDIT:{
            return {
                ...state,
                searchBar: action.payload
            }
        }
        default:
            return state
    }
}


