let initState = {
    user : null
};

export default (state = initState, action) => {
    switch(action.type) {
        case 'SET_USER' :
            return {
                user : action.payload
            };
        default:
            return state;
    }
}