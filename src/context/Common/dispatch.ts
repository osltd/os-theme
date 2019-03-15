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
            return ({
                ...state,
                locale: action.payload.locale ? action.payload.locale : "zh"
            })
        }
        default:
            return state
    }
};


export default dispatch

