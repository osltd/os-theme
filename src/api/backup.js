import _ from 'lodash'

export const refactorTextLength = content => (typeof content === 'string') ? content.length > 20 ? content.slice(0) : content : '';

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
    console.log(variants);
    variants.map(option => {
        option.description.split(',').forEach(opt => {
            opt = opt.split(':');
            variantOverview[opt[0]] = variantOverview[opt[0]] || [];
            variantOverview[opt[0]].indexOf(opt[1]) < 0 && variantOverview[opt[0]].push(opt[1])
        });
    });
    console.log(variantOverview);

    return variantOverview
};
export const isImgOnlySections = sections => (
    sections && sections[0].medias[0] && sections[0].medias[0].ext !== 'mp4'
    && (sections[0].medias[0].ext.indexOf('product') === -1
    ));

export const handleImgValid = img => img ? img.url ? img.url : img : '/notFound/not-found-image.jpg';
