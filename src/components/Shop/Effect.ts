import {Product} from "../../interfaces/server/Product";


export let sortData = (
    data: Array<Product>,
    sort?: 'Name A-Z' | 'Name Z-A' | 'Price Low to High' | 'Price High to Low',
    tag?: string
): Array<Product> => {
    data = data.filter(n => (tag) ? !!n.tags.find(k => k === tag) : true)


    let sortBy = () => {
        switch (sort) {
            case 'Name A-Z':
                return data.sort((a, b) => a.name < b.name ? -1 : a.name > b.name ? 1 : 0);
            case 'Name Z-A':
                return data.sort((a, b) => (a.name < b.name ? -1 : a.name > b.name ? 1 : 0) * -1);
            case 'Price Low to High':
                return data.sort((a, b) => {
                        let priceA = a.variants[0] ? a.variants[0].price : 0;
                        let priceB = b.variants[0] ? b.variants[0].price : 0;
                        return (priceA < priceB) ? -1 : 1
                    }
                );
            case       'Price High to Low':
                return data.sort((a, b) => {
                        let priceA = a.variants[0] ? a.variants[0].price : 0;
                        let priceB = b.variants[0] ? b.variants[0].price : 0;
                        return (priceA > priceB) ? -1 : 1
                    }
                );
            default:
                return data
        }
    }
    return sortBy()
}
