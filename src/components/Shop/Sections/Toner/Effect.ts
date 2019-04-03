import {getVariantOptions} from "../../../../api/ApiUtils";
import {Product} from "../../../../interfaces/server/Product";
import {TonerVariants} from "../../../../interfaces/client/structure";

export const validateTonerProduct = (products: Array<Product>): Array<Product & TonerVariants> => {
    let result = [] as Array<TonerVariants>;


    return products.filter(product => {
            let temp = {...getVariantOptions(product.variants)} as object;
            return (
                temp.hasOwnProperty('company') &&
                temp.hasOwnProperty('suitable') &&
                temp.hasOwnProperty('pageCapacity') &&
                temp.hasOwnProperty('color'))
        }
    ).map(
        product =>
            ({
                ...product,
                ...getVariantOptions(product.variants) as object as TonerVariants
            })
    )


};