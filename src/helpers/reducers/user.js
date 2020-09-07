let initState = {
    profile : null
};

export default (state = initState, action) => {
    switch(action.type) {
        case 'SET_USER' :
            return {
                profile : action.payload
            };
        default:
            return state;
    }
}