import React, {useState} from 'react';
import {Typography} from '@material-ui/core';
import Slick from './Widget/Slick'

const TopInterest = props => {
    const {hasProductsToShow, products, width} = props.self;


    return (products) ?
        <section >
            <div>
                <Typography variant={'h4'} >
                    TOP INTERESTING
                </Typography>
            </div>
            <div>
                <Slick
                    self={props.self}

                />
            </div>
        </section> : null

};


export default TopInterest
