import React from 'react';
import {Grid, Typography} from '@material-ui/core'

const FEATURED_PRODUCTS = 'featured';

const TopInterest = props => {

    const {hasProductsToShow, products, width, classes} = props;

    return (products) ?
        <section>
            <Grid item>
                <Typography variant={'h4'}>
                    FEATURE PRODUCTS
                </Typography>
            </Grid>
            <div>

            </div>
        </section> : null

};


export default TopInterest
