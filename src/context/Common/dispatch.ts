import {commonActionType} from "./actionType";
import {State} from "./state";
import {SupportedLanguage} from "../../constants/locale";

export interface Action {
    type: commonActionType
    payload: {
        locale?: SupportedLanguage
    }

}


const dispatch = (state: State, action: Action): State => {
    switch (action.type) {
        case commonActionType.COMMON_INIT_I18N: {
            localStorage.setItem('locale', action.payload.locale ? action.payload.locale : "en")

            return ({
                ...state,
                locale: action.payload.locale ? action.payload.locale : "en"
            })
        }
        default:
            return state
    }
};


export default dispatch

