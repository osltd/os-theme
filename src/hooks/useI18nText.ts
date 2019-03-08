import {keyOfI18n} from "../constants/locale/interface";
import {useContext} from "react";
import {reducer} from "../context";
import {messages} from "../I18N";

export const useI18nText = (id: keyOfI18n): string => {
    const {commonReducer} = useContext(reducer);
    return messages(commonReducer.state.locale)[id]

};