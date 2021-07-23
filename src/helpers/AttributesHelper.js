export const extractByLocaleCode = ({ locale, shop, keys = ['nav_home', 'nav_blog', 'nav_shop'] }) => {
    // get shop attributes
    const { attributes } = shop;
    // special nav bar title?
    const customizeTitles = keys.reduce((cusTitles, key) => {
        // get value of custom title
        let value = attributes[key]
        // has value and fullfil the format
        if(value !== undefined && /^zh_hk:([a-zA-Z0-9 \u4E00-\u9FFF\u3400-\u4DBF]+)\|en_us:([a-zA-Z0-9 \u4E00-\u9FFF\u3400-\u4DBF]+)$/){
            // disassembly
            let values = value.split('|')
            values.forEach(v => {
                // get locale
                const [_locale, _text] = v.split(':')
                // append value
                cusTitles[_locale] = cusTitles[_locale] || {}
                cusTitles[_locale][key] = _text
            });
        }
        return cusTitles;
    }, {})
    return customizeTitles[locale.toLowerCase()] || {};
}