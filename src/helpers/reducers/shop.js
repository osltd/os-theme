import OS_Config from '../../config';

let initState = {
    session : null
};

export default (state = initState, action) => {
    switch(action.type) {
        case 'SET_SHOP' :
            return {
                session  : action.payload,
                settings : OS_Config.settings
            };
        default:
            return state;
    }
}