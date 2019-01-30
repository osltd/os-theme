import {Product} from "../../interfaces/server/Product";
import _ from 'lodash'

export const sortData = (
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


export const initFilter = (query: string,
                           tag: string,
                           cb: (x: string) => void
) => {
    let isTags = (query.slice(_.lastIndexOf(query, '?'), _.lastIndexOf(query, '=') + 1).indexOf('tags') !== -1);
    let queryTag = query.slice(_.lastIndexOf(query, '=') + 1, query.length);
    if (isTags && tag !== queryTag) cb(queryTag)
}
