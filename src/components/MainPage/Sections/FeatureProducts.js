import React from 'react';
import {Grid, Typography} from '@material-ui/core'
import Slick from './Widget/Slick'

const FEATURED_PRODUCTS = 'featured'

const TopInterest = props => {

    const {hasProductsToShow, products, width, classes} = props.self

    return (products) ?
        <section className={classes.section}>
            <Grid item>
                <Typography variant={'display1'} className={classes.title}>
                    FEATURE PRODUCTS
                </Typography>
            </Grid>
            <div>
                <Slick
                    search={FEATURED_PRODUCTS}
                    self={props.self}/>
            </div>
        </section> : null

}


export default TopInterest
