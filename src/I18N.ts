import locale, {SupportedLanguage} from './constants/locale'
import {I18n} from "./constants/locale/interface";
// Define user's language. Different browsers have the user locale defined
// on different fields on the `navigator` object, so we make sure to account
// for these different by checking all of them
export const language = (): SupportedLanguage => {
    let languageWithoutRegionCode = ((navigator.languages && navigator.languages[0]) || navigator.language).toLowerCase().split(/[_-]+/)[0];
    return (languageWithoutRegionCode in locale) ? <SupportedLanguage>languageWithoutRegionCode : "en"
};

// Split locales with a region code
// Try full locale, try locale without region code, fallback to 'en'
export const messages = (language: SupportedLanguage): I18n => locale[language];

