import OS_Config from '../../config';

let initState = {
    session            : null,
    collections        : [],
    selectedCollection : null
};

export default (state = initState, action) => {
    switch(action.type) {
        case 'SET_SHOP' : {
            // preset home page layout
            let home_page_layout = {}
            // has home page layout settings?
            if((action.payload.attributes || {}).home_page_layout != null) {
                try {
                    home_page_layout = JSON.parse(action.payload.attributes.home_page_layout)
                } catch (error) {
                    // do nothing when error occured
                }   
            }
            return {
                session  : action.payload,
                settings : {
                    ...OS_Config.settings,
                    layout_override : home_page_layout
                }
            };
        }
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