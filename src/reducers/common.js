import {COMMON_EDIT_SEARCH_BAR, COMMON_INIT_SHOP_INFO} from "../constants/actionType";


const defaultState = {
    shopInfo: {},
    searchBar: '',


};

export default (state = defaultState, action) => {

    switch (action.type) {

        case COMMON_EDIT_SEARCH_BAR: {
            let searchBar = action.payload ? action.payload : '';
            return {
                ...state,
                searchBar: searchBar
            }
        }
        case COMMON_INIT_SHOP_INFO: {
            return {
                ...state,
                shopInfo: action.payload
            }
        }

        default:
            return state
    }
}


