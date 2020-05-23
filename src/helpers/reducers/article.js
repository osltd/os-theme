let initState = {
    articles : []
};

export default (state = initState, action) => {
    switch(action.type) {
        case 'SET_ARTICLES' :
            return {
                ...state,
                articles : action.payload
            };
        default:
            return state;
    }
}