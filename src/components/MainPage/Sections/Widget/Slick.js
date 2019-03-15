import {isWidthUp} from "@material-ui/core/withWidth/index";
import React from 'react';

import MultiItems from '../../../Widget/Slick/MultiplyItems'


const Slick = props => {
    const {search} = props
    const {hasProductsToShow, products, width, classes} = props.self

    let keyword = search ? search : ''
    let selectedProducts = (search && products) ? products.filter(n => n.tags.find(m => m.toLowerCase() === keyword)) : products
    if (
        isWidthUp('md', width)
    ) return <MultiItems data={selectedProducts}/>
    if (
        isWidthUp('sm', width)
    ) return <MultiItems data={selectedProducts} size={3}/>
    if (
        isWidthUp('xs', width)
    ) return <MultiItems data={selectedProducts} size={2}/>


}

export default Slick