import React from 'react'
import {keyOfI18n} from "../constants/locale/interface";
import {renderToString} from "react-dom/server";
import {I18nText} from "../components/Widget/I18nText";

export const useI18nText = (id: keyOfI18n) => renderToString(<I18nText keyOfI18n={id}/>)
