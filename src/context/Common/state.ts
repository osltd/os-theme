import {SupportedLanguage} from "../../constants/locale";


export interface State {
    locale: SupportedLanguage
}

export const state: State = {
    locale: "zh"
};
export default state;

