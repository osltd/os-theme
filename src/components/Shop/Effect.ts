import {Product} from "../../interfaces/server/Product";
import _ from 'lodash'
import {filterOptions} from "../../constants/enum";

export const sortData = (
    data: Array<Product>,
    tag?: string,
    sort?: filterOptions
): Array<Product> => {
    data = data.filter(n => (tag) ? !!n.tags.find(k => k === tag) : true);
    let sortBy = () => {
        switch (sort) {
            case filterOptions.NAME_ASC:
                return data.sort((a, b) => a.name < b.name ? -1 : a.name > b.name ? 1 : 0);
            case filterOptions.NAME_DES:
                return data.sort((a, b) => (a.name < b.name ? -1 : a.name > b.name ? 1 : 0) * -1);
            case filterOptions.PRICE_ASC:
                return data.sort((a, b) => {
                        let priceA = a.variants[0] ? a.variants[0].price : 0;
                        let priceB = b.variants[0] ? b.variants[0].price : 0;
                        return (priceA < priceB) ? -1 : 1
                    }
                );
            case filterOptions.PRICE_DES:
                return data.sort((a, b) => {
                        let priceA = a.variants[0] ? a.variants[0].price : 0;
                        let priceB = b.variants[0] ? b.variants[0].price : 0;
                        return (priceA > priceB) ? -1 : 1
                    }
                );
            default:
                return data
        }
    };
    return sortBy()
};


export const initFilter = (query: string,
                           tag: string,
                           cb: (x: string) => void
) => {
    let isTags = (query.slice(_.lastIndexOf(query, '?'), _.lastIndexOf(query, '=') + 1).indexOf('tags') !== -1);
    let queryTag = query.slice(_.lastIndexOf(query, '=') + 1, query.length);
    if (isTags && tag !== queryTag) cb(queryTag)
};
