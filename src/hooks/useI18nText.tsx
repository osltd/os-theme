import React, {useContext} from 'react'
import {keyOfI18n} from "../constants/locale/interface";
import {renderToString} from "react-dom/server";
import {I18nText} from "../components/Widget/I18nText";
import {reducer} from "../context";
import {SupportedLanguage} from "../constants/locale";
import {messages} from "../I18N";

export const useI18nText = (id: keyOfI18n) => {
    let locale = localStorage.getItem('locale')  as SupportedLanguage
    if ( locale!=='en'&& locale!=='zh') locale='en'
    return messages(locale)[id]
}