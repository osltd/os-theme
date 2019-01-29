import {COMMON_EDIT_SEARCH_BAR, COMMON_INIT_SHOP_INFO} from "../../constants/actionType";


export default (state, action) => {

    switch (action.type) {

        case COMMON_EDIT_SEARCH_BAR: {
            console.log('finally')
            let searchBar = action.payload ? action.payload : ''
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


