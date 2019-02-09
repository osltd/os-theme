import React from 'react';
import {Typography} from '@material-ui/core';
import Slick from './Widget/Slick'

const TopInterest = props => {
    const {hasProductsToShow, products,search} = props;


    return (products) ?
        <section>
            <div>
                <Typography variant={'h4'}>
                    TOP INTERESTING
                </Typography>
            </div>
            <div>
                <Slick
                    hasProductsToShow={hasProductsToShow}
                    products={products}
                    search={search}
                />
            </div>
        </section> : null

};


export default TopInterest
