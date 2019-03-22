import React from 'react';
import {Grid, Typography} from '@material-ui/core'
import Slick from './Widget/Slick'
import {I18nText} from "../../Widget/I18nText";
import {keyOfI18n} from "../../../constants/locale/interface";

const FEATURED_PRODUCTS = 'featured';

const TopInterest = props => {

    const {hasProductsToShow, products, width, classes} = props.self;
    return (products) ?
        <section className={classes.section}>
            <Grid item>
                <Typography variant={'h4'} className={classes.title}>
                   <I18nText keyOfI18n={keyOfI18n.FEATURE_PRODUCTS}/>
                </Typography>
            </Grid>
            <div>
                <Slick
                    search={FEATURED_PRODUCTS}
                    self={props.self}/>
            </div>
        </section> : null

};


export default TopInterest
