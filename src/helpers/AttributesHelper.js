const doExtract = (value) => {
    // try to match pattern
    let matches = /^zh_hk:([a-zA-Z0-9 \u4E00-\u9FFF\u3400-\u4DBF]+)\|en_us:([a-zA-Z0-9 \u4E00-\u9FFF\u3400-\u4DBF]+)$/.exec(value)
    // return string with locale key if has matches
    return (matches || []).length > 2 ? {
        zh_hk : matches[1],
        en_us : matches[2]
    } : null
}

export const captureWithLocale = ({ locale, value }) => (doExtract(value) || {})[locale.toLowerCase()]

export const extractByLocaleCode = ({ locale, shop, keys = ['nav_home', 'nav_blog', 'nav_shop'] }) => {
    // get shop attributes
    const { attributes } = shop;
    // special nav bar title?
    const customizeTitles = keys.reduce((cusTitles, key) => {
        // get value of custom title
        let value = attributes[key]
        // match strings
        let matches = doExtract(value || "")
        // has value and fullfil the format
        if(matches !== null){
            // append value
            ['en_us', 'zh_hk'].forEach(l => {
                cusTitles[l] = cusTitles[l] || {}
                cusTitles[l][key] = matches[l]    
            });
        }
        return cusTitles;
    }, {})
    return customizeTitles[locale.toLowerCase()] || {};
}