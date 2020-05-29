// load cookies library
const Cookies = require('universal-cookie').default;
// setup cookies
const cookies = new Cookies();


let initState = {
    locale  : cookies.get('os-locale') || 'en_US',
    locales : [
        {
            name : "English",
            code : "en_US"
        },
        {
            name : "正體中文",
            code : "zh_HK"
        }
    ],
    __      : function(key) {
        // get locale
        let locale = cookies.get('os-locale') || 'en_US';
        // set wordings container
        let wordings = {};
        // try to process wordings json
        try {
            // get the text file
            let raw = require(`../locales/${locale}.json`);
            // save it
            wordings = raw;
        } catch (error) { /* do nothing */ }
        // return translated text, if not exists, return the key by default
        return wordings[key] == undefined ? key : wordings[key];
    }
};


export default (state = initState, action) => {
    switch(action.type) {
        case 'SET_LOCALE' : {
            // save locale
            cookies.set('os-locale', action.payload, { samesite : 'None', secure : true });
            return {
                ...state,
                locale : action.payload
            };
        }
        default:
            return state;
    }
}