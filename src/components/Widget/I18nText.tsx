import React, {useContext} from 'react';
import {keyOfI18n} from "../../constants/locale/interface";
import {reducer} from "../../context";
import {messages} from "../../I18N";


interface Props {
    keyOfI18n: keyOfI18n
}

export const I18nText: React.FunctionComponent<Props> = (props, ref) => {
    const {keyOfI18n} = props;
    const {commonReducer} = useContext(reducer);
    if (!messages(commonReducer.state.locale)[keyOfI18n]) {
        console.log(keyOfI18n)
        console.log('--------cant find this key')
    }

    return <>{messages(commonReducer.state.locale)[keyOfI18n]}</>
};
