import _ from 'lodash'

export const refactorTextLength = content => (typeof content === 'string') ? content.length > 20 ? content.slice(0, 15).concat('...') : content : ''
export const refactorParaLength = content => (typeof content === 'string') ? content.length > 45 ? content.slice(0, 45).concat('...') : content : ''
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
export const arrayToFilter = (array, cb) => {
    let result = []
    array.map((n, i) =>
        result.push({
            label: n,
            onClick: () => cb(n)

        })
    )
    return result
}

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
    console.log(url)

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