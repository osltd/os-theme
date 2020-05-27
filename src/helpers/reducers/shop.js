import OS_Config from '../../config';

let initState = {
    session            : null,
    collections        : [],
    selectedCollection : null
};

export default (state = initState, action) => {
    switch(action.type) {
        case 'SET_SHOP' :
            return {
                session  : action.payload,
                settings : OS_Config.settings
            };
        case 'SET_COLLECTIONS' : {
            return {
                ...state,
                collections : action.payload
            }
        }
        case 'SET_SELECTED_COLLECTION' : {
            return {
                ...state,
                selectedCollection : action.payload
            }
        }
        default:
            return state;
    }
}