import _ from 'lodash'

export const refactorTextLength = content => (typeof content === 'string') ? content.length > 20 ? content.slice(0) : content : '';
export const refactorParaLength = (content, length = 45) => (typeof content === 'string') ? content.length > length ? content.slice(0, length).concat('...') : content : '';
export const refactorTitle = content => (typeof content === 'string') ? content.length > 22 ? content.slice(0, 22) : content : '';


export const formatMoney = (n, c = 2, d = '.', t = ',') => {
    let s = n < 0 ? "-" : "";
    let i = String(parseInt(n = Math.abs(Number(n) || 0).toFixed(c)));
    let j = i.length > 3 ? i.length % 3 : 0;
    return s + (j ? i.substr(0, j) + t : "") + i.substr(j).replace(/(\d{3})(?=\d)/g, "$1" + t) + (c ? d + Math.abs(n - i).toFixed(c).slice(2) : "");
};
export const numberToPagination = (length, cb) => {
    let result = [];
    let itemsPerPage = 9;
    if (length === itemsPerPage) {
        return [{
            label: '1 - 9',
            onClick: () => cb('1 - 9')

        }]
    }
    if (length > itemsPerPage) {
        new Array(Math.floor(length / itemsPerPage)).fill(1).map(
            (n, i) => {
                let label = (1 + i * itemsPerPage) + ' - ' + ((i + 1) * itemsPerPage);
                result.push({
                    label: label,
                    onClick: () => cb(label)

                })
            }
        )
    }

    if (length % itemsPerPage !== 0) {
        let label = (length - length % itemsPerPage + 1) + ' - ' + length;
        result.push({
            label: label,
            onClick: () => cb(label)
        })
    }
    return result

};
export const arrayToFilter = (array, cb) => array.map((n, i) => ({label: n, onClick: () => cb(n)}));

export const sort_by = (field, primer, reverse = false) => {

    let key = (x) => primer ? primer(x[field]) : x[field];

    reverse = !reverse ? 1 : -1;

    return (a, b) => {
        return a = key(a), b = key(b), reverse * ((a > b) - (b > a));
    }
};
export const getTagsCountsArray = (products, onClick) => {
    let tagsArray = [];
    if (!products) return null;
    products.map(n => (n.tags.length > 0) ? n.tags.map(k => tagsArray.push(k)) : null);
    let tagsObject = _.countBy(tagsArray);
    let tagsName = Object.keys(tagsObject);
    let tagsCount = Object.values(tagsObject);
    let result = [{
        label: 'all (' + products.length + ') ',
        onClick: () => onClick(null, products.length)
    }];
    tagsName.map(
        (n, i) => result.push({
            label: n + ' (' + tagsCount[i] + ') ',
            value: n,
            onClick: () => onClick(n, tagsCount[i])
        })
    );
    return result

};
//cant ts
export const cartesian = (...arg) => {
    let r = [], max = arg.length - 1;
    const helper = (arr, i) => {
        for (let j = 0, l = arg[i].length; j < l; j++) {
            let a = arr.slice(0); // clone arr
            a.push(arg[i][j])
            (i === max) ? r.push(a) : helper(a, i + 1);
        }
    };
    helper([], 0);
    return r;
};

export const getVariantOptions = variants => {
    let variantOverview = [];
    variants.map(option => {
        option.description.split(',').forEach(opt => {
            opt = opt.split(':');
            variantOverview[opt[0]] = variantOverview[opt[0]] || [];
            variantOverview[opt[0]].indexOf(opt[1]) < 0 && variantOverview[opt[0]].push(opt[1])
        });
    });

    return variantOverview
};
export const isImgOnlySections = sections => (
    sections && sections[0].medias[0] && sections[0].medias[0].ext !== 'mp4'
    && (sections[0].medias[0].ext.indexOf('product') === -1
    ));

export const handleImgValid = img => img ? img.url ? img.url : img : '/notFound/not-found-image.jpg';
