import {SupportedLanguage} from "../../constants/locale";


export interface State {
    locale: SupportedLanguage
}

export const state: State = {
    locale: "en"
};
export default state;

