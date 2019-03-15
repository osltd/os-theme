import {isWidthUp} from "@material-ui/core/withWidth/index";
import React from 'react';
import {Typography} from '@material-ui/core';
import MultiItems from '../../Widget/Slick/MultiplyItems'
import Slick from './Widget/Slick'
const TopInterest = props => {

    const {hasProductsToShow, products, width, classes} = props.self


    return (products)?
     <section className={classes.section}>
        <div>
            <Typography variant={'h4'} className={classes.title}>
                TOP INTERESTING
            </Typography>
        </div>
        <div>
            <Slick
            self={props.self}

            />
        </div>
    </section>: null

}


export default TopInterest
