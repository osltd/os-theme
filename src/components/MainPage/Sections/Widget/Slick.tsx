import React from 'react';
import MultiItems from '../../../Widget/Slick/MultiplyItems'
import {useTheme} from "@material-ui/styles";
import {Breakpoint} from "@material-ui/core/styles/createBreakpoints";
import {unstable_useMediaQuery as useMediaQuery} from "@material-ui/core/useMediaQuery";
import {Theme} from "@material-ui/core";
import {Product} from "../../../../interfaces/server/Product";

interface Props {
    search: string
    products: Array<Product>
    hasProductsToShow: boolean

}

const Slick: React.FunctionComponent<Props> = props => {
    const theme: Theme = useTheme();
    const isWidthUp = (breakpoint: Breakpoint): boolean => useMediaQuery(theme.breakpoints.up(breakpoint));

    const {search, products} = props;

    let keyword = search ? search : '';
    let selectedProducts = (search && products) ? products.filter((n: Product) => n.tags.find(m => m.toLowerCase() === keyword)) : products;

    return <MultiItems data={selectedProducts}/>;

};

export default React.memo(Slick)