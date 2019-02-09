import React from 'react';
import MultiItems from '../../../Widget/Slick/MultiplyItems'
import {useTheme} from "@material-ui/styles";
import {Breakpoint} from "@material-ui/core/styles/createBreakpoints";
import {unstable_useMediaQuery as useMediaQuery} from "@material-ui/core/useMediaQuery";
import {Theme} from "@material-ui/core";
import {breakpoints} from "../../../../constants/enum";
import {Product} from "../../../../interfaces/server/Product";

interface Props {
    search: string
    products: Array<Product>
    hasProductsToShow: boolean

}

const Slick: React.FunctionComponent<Props> = props => {
    const theme: Theme = useTheme()
    const isWidthUp = (breakpoint: Breakpoint): boolean => useMediaQuery(theme.breakpoints.up(breakpoint));

    const {search, products} = props;

    let keyword = search ? search : '';
    let selectedProducts = (search && products) ? products.filter((n: Product) => n.tags.find(m => m.toLowerCase() === keyword)) : products;
    if (
        isWidthUp(breakpoints.md)
    ) return <MultiItems data={selectedProducts}/>;
    if (
        isWidthUp(breakpoints.sm)
    ) return <MultiItems data={selectedProducts} size={3}/>;
    if (
        isWidthUp(breakpoints.xs)
    ) return <MultiItems data={selectedProducts} size={2}/>
    else return <span/>
};

export default Slick