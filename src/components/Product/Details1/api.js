export const findSelectedVariant = (draft, product) => {
    let key = Object.keys(draft);
    let value = Object.values(draft);
    let selectedDescription = [];
    key.map((keyName, index) => (keyName !== 'number') ? selectedDescription.push(keyName + ':' + value[index]) : null);
    const isSelectedProduct = variants => (!selectedDescription.map(description => variants.description.split(',').includes(description)).includes(false));

    return product.variants.find(n => isSelectedProduct(n))

};