import React from 'react';
import {Grid, Typography} from '@material-ui/core';
import MultiItems from '../../Widget/Slick/MultiplyItems'

const TopInterest = props => {
    const {hasProductsToShow, products, search} = props;
    let keyword = search ? search : '';
    let selectedProducts = (search && products) ? products.filter((n) => n.tags.find(m => m.toLowerCase() === keyword)) : products;


    return (products) ?
        <Grid container>
            <Grid item>
                <Typography variant={'h4'}>
                    TOP INTERESTING
                </Typography>
            </Grid>
            <Grid item xs={12}>
                <MultiItems data={selectedProducts}/>
            </Grid>
        </Grid> : null

};


export default TopInterest
