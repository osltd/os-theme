import React, {useContext} from 'react';
import {keyOfI18n} from "../../constants/locale/interface";
import {reducer} from "../../context";
import {messages} from "../../I18N";
import {SupportedLanguage} from "../../constants/locale";


interface Props {
    keyOfI18n: keyOfI18n
}

export const I18nText: React.FunctionComponent<Props> = (props) => {
    const {keyOfI18n} = props;
    let locale = localStorage.getItem('locale')  as SupportedLanguage
    if ( locale!=='en'&& locale!=='zh') locale='en'
    return <>{messages(locale)[keyOfI18n]}</>
};
