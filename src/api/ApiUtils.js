import _ from 'lodash'

export const refactorTextLength = content => (typeof content === 'string') ? content.length > 20 ? content.slice(0, 15).concat('...') : content : ''
export const refactorParaLength = (content, length = 45) => (typeof content === 'string') ? content.length > length ? content.slice(0, length).concat('...') : content : ''
export const refactorTitle = content => (typeof content === 'string') ? content.length > 22 ? content.slice(0, 22) : content : ''


export const formatMoney = (n, c = 2, d = '.', t = ',') => {
    let s = n < 0 ? "-" : ""
    let i = String(parseInt(n = Math.abs(Number(n) || 0).toFixed(c)))
    let j = i.length > 3 ? i.length % 3 : 0;

    return s + (j ? i.substr(0, j) + t : "") + i.substr(j).replace(/(\d{3})(?=\d)/g, "$1" + t) + (c ? d + Math.abs(n - i).toFixed(c).slice(2) : "");
}
export const numberToPagination = (length, cb) => {

    let result = []
    let itemsPerPage = 3
    if (length > itemsPerPage) {
        new Array(Math.floor(length / itemsPerPage)).fill(1).map(
            (n, i) => {
                let label = (1 + i * 3) + ' - ' + ((i + 1) * 3)
                result.push({
                    label: label,
                    onClick: () => cb(label)

                })
            }
        )
    }

    if (length % itemsPerPage !== 0) {
        let label = (length - length % itemsPerPage + 1) + ' - ' + length
        result.push({
            label: label,
            onClick: () => cb(label)
        })
    }
    return result

}
export const arrayToFilter = (array, cb) => array.map((n, i) => ({label: n, onClick: () => cb(n)}))

export const sort_by = (field, primer, reverse = false) => {

    var key = primer ?
        function (x) {
            return primer(x[field])
        } :
        function (x) {
            return x[field]
        };

    reverse = !reverse ? 1 : -1;

    return function (a, b) {
        return a = key(a), b = key(b), reverse * ((a > b) - (b > a));
    }
}
export const getTagsCountsArray = (products, onClick) => {
    let tagsArray = []
    if (!products) return null
    products.map(n => (n.tags.length > 0) ? n.tags.map(k => tagsArray.push(k)) : null)
    let tagsObject = _.countBy(tagsArray)
    let tagsName = Object.keys(tagsObject)
    let tagsCount = Object.values(tagsObject)
    let result = [{
        label: 'all (' + products.length + ') ',
        onClick: () => onClick(null, products.length)
    }]
    tagsName.map(
        (n, i) => result.push({
            label: n + ' (' + tagsCount[i] + ') ',
            value: n,
            onClick: () => onClick(n, tagsCount[i])
        })
    )
    return result

}

export const getRoutePath = url => {
    url = url.split('/')
    let result = []
    url.map((n, i) => {
        switch (true) {
            case n === "":
                if (i === 0) result.push(
                    {
                        label: 'home',
                        link: '/',
                    }
                )
                break
            case n === 'feed':
                result.push({
                    label: n,
                    link: '/feed',

                })
                break
            case n === 'shop':
                result.push({
                    label: n,
                    link: '/shop'
                })
                break
            case n === 'checkout':
                result.push({
                    label: n,
                    link: '/checkout'
                })
                break
            case n === 'shoppingCart'.toLowerCase():
                result.push({
                    label: n,
                    link: '/shoppingCart'
                })
                break
            case !isNaN(n):
                if (url[i - 1] === 'shop')
                    result.push({

                            label: 'singleProduct',
                            link: '/shop/' + n
                        }
                    )
                if (url[i - 1] === 'feed')
                    result.push({

                            label: 'currentFeeds',
                            link: '/feed/' + n
                        }
                    )
        }

    })
    return result


}

export function cartesian() {
    let r = [], arg = arguments, max = arg.length - 1;
    const helper = (arr, i) => {
        for (let j = 0, l = arg[i].length; j < l; j++) {
            let a = arr.slice(0); // clone arr
            a.push(arg[i][j])
            if (i === max) {
                r.push(a);
            } else
                helper(a, i + 1);
        }
    }
    helper([], 0);
    return r;
};

export const getVariantOptions = variants => {
    let variantOverview = []
    variants.map(option => {
        option.description.split(',').forEach(opt => {
            opt = opt.split(':')

            variantOverview[opt[0]] = variantOverview[opt[0]] || []
            variantOverview[opt[0]].indexOf(opt[1]) < 0 && variantOverview[opt[0]].push(opt[1])
        });
    })
    return variantOverview
}

export const colourNameToHex = (colour) => {
    let colours = {
        "aliceblue": "#f0f8ff",
        "antiquewhite": "#faebd7",
        "aqua": "#00ffff",
        "aquamarine": "#7fffd4",
        "azure": "#f0ffff",
        "beige": "#f5f5dc",
        "bisque": "#ffe4c4",
        "black": "#000000",
        "blanchedalmond": "#ffebcd",
        "blue": "#0000ff",
        "blueviolet": "#8a2be2",
        "brown": "#a52a2a",
        "burlywood": "#deb887",
        "cadetblue": "#5f9ea0",
        "chartreuse": "#7fff00",
        "chocolate": "#d2691e",
        "coral": "#ff7f50",
        "cornflowerblue": "#6495ed",
        "cornsilk": "#fff8dc",
        "crimson": "#dc143c",
        "cyan": "#00ffff",
        "darkblue": "#00008b",
        "darkcyan": "#008b8b",
        "darkgoldenrod": "#b8860b",
        "darkgray": "#a9a9a9",
        "darkgreen": "#006400",
        "darkkhaki": "#bdb76b",
        "darkmagenta": "#8b008b",
        "darkolivegreen": "#556b2f",
        "darkorange": "#ff8c00",
        "darkorchid": "#9932cc",
        "darkred": "#8b0000",
        "darksalmon": "#e9967a",
        "darkseagreen": "#8fbc8f",
        "darkslateblue": "#483d8b",
        "darkslategray": "#2f4f4f",
        "darkturquoise": "#00ced1",
        "darkviolet": "#9400d3",
        "deeppink": "#ff1493",
        "deepskyblue": "#00bfff",
        "dimgray": "#696969",
        "dodgerblue": "#1e90ff",
        "firebrick": "#b22222",
        "floralwhite": "#fffaf0",
        "forestgreen": "#228b22",
        "fuchsia": "#ff00ff",
        "gainsboro": "#dcdcdc",
        "ghostwhite": "#f8f8ff",
        "gold": "#ffd700",
        "goldenrod": "#daa520",
        "gray": "#808080",
        "green": "#008000",
        "greenyellow": "#adff2f",
        "honeydew": "#f0fff0",
        "hotpink": "#ff69b4",
        "indianred ": "#cd5c5c",
        "indigo": "#4b0082",
        "ivory": "#fffff0",
        "khaki": "#f0e68c",
        "lavender": "#e6e6fa",
        "lavenderblush": "#fff0f5",
        "lawngreen": "#7cfc00",
        "lemonchiffon": "#fffacd",
        "lightblue": "#add8e6",
        "lightcoral": "#f08080",
        "lightcyan": "#e0ffff",
        "lightgoldenrodyellow": "#fafad2",
        "lightgrey": "#d3d3d3",
        "lightgreen": "#90ee90",
        "lightpink": "#ffb6c1",
        "lightsalmon": "#ffa07a",
        "lightseagreen": "#20b2aa",
        "lightskyblue": "#87cefa",
        "lightslategray": "#778899",
        "lightsteelblue": "#b0c4de",
        "lightyellow": "#ffffe0",
        "lime": "#00ff00",
        "limegreen": "#32cd32",
        "linen": "#faf0e6",
        "magenta": "#ff00ff",
        "maroon": "#800000",
        "mediumaquamarine": "#66cdaa",
        "mediumblue": "#0000cd",
        "mediumorchid": "#ba55d3",
        "mediumpurple": "#9370d8",
        "mediumseagreen": "#3cb371",
        "mediumslateblue": "#7b68ee",
        "mediumspringgreen": "#00fa9a",
        "mediumturquoise": "#48d1cc",
        "mediumvioletred": "#c71585",
        "midnightblue": "#191970",
        "mintcream": "#f5fffa",
        "mistyrose": "#ffe4e1",
        "moccasin": "#ffe4b5",
        "navajowhite": "#ffdead",
        "navy": "#000080",
        "oldlace": "#fdf5e6",
        "olive": "#808000",
        "olivedrab": "#6b8e23",
        "orange": "#ffa500",
        "orangered": "#ff4500",
        "orchid": "#da70d6",
        "palegoldenrod": "#eee8aa",
        "palegreen": "#98fb98",
        "paleturquoise": "#afeeee",
        "palevioletred": "#d87093",
        "papayawhip": "#ffefd5",
        "peachpuff": "#ffdab9",
        "peru": "#cd853f",
        "pink": "#ffc0cb",
        "plum": "#dda0dd",
        "powderblue": "#b0e0e6",
        "purple": "#800080",
        "rebeccapurple": "#663399",
        "red": "#ff0000",
        "rosybrown": "#bc8f8f",
        "royalblue": "#4169e1",
        "saddlebrown": "#8b4513",
        "salmon": "#fa8072",
        "sandybrown": "#f4a460",
        "seagreen": "#2e8b57",
        "seashell": "#fff5ee",
        "sienna": "#a0522d",
        "silver": "#c0c0c0",
        "skyblue": "#87ceeb",
        "slateblue": "#6a5acd",
        "slategray": "#708090",
        "snow": "#fffafa",
        "springgreen": "#00ff7f",
        "steelblue": "#4682b4",
        "tan": "#d2b48c",
        "teal": "#008080",
        "thistle": "#d8bfd8",
        "tomato": "#ff6347",
        "turquoise": "#40e0d0",
        "violet": "#ee82ee",
        "wheat": "#f5deb3",
        "white": "#ffffff",
        "whitesmoke": "#f5f5f5",
        "yellow": "#ffff00",
        "yellowgreen": "#9acd32"
    };

    if (typeof colours[colour.toLowerCase()] !== 'undefined')
        return colours[colour.toLowerCase()];

    return false;
}
