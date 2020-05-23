let initState = {};

export default (state = initState, action) => {
    switch(action.type) {
        case 'SET_HOME_CONTEXT' :
            return {
                ...state,
                [action.key] : action.payload
            };
        default:
            return state;
    }
}