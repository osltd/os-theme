import React, {forwardRef, Fragment, ReactNode, useImperativeHandle, useState} from 'react';
import {Dialog} from '@material-ui/core';
import classNames from 'classnames'
import makeStyles from "@material-ui/styles/makeStyles";
import {useI18nText} from "../../hooks/useI18nText";
import {keyOfI18n} from "../../constants/locale/interface";


interface Props {
    keyOfI18n:keyOfI18n
}

export const I18nText: React.FunctionComponent<Props> = (props, ref) => {
    const {keyOfI18n} = props;
    const text = useI18nText(keyOfI18n);
    return <>{text}</>
}
