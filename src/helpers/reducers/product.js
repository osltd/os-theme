let initState = {
    products : [],
    best_sellers : []
};

export default (state = initState, action) => {
    switch(action.type) {
        case 'SET_PRODUCTS' :
            return {
                ...state,
                products : action.payload
            };
        case 'ADD_BEST_SELLERS' :
            return {
                ...state,
                best_sellers : action.payload
            };
        default:
            return state;
    }
}