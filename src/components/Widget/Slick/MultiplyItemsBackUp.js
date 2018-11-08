import React, {Component} from "react";
import Slider from 'react-slick';

import {withStyles} from '@material-ui/core/styles';
import {Grid} from '@material-ui/core'

import NextArrow from './NextArrow'
import PrevArrow from './PrevArrow'

const style = theme => ({
    root: {
        margin: '40px',
        width: 'calc(100%-80px)',
    },
    img: {
        height: '400px',
        backgroundSize: 'cover',
    }
    ,
})

class MultipleItems extends Component {
    render() {
        const settings = {
            dots: true,
            infinite: true,
            speed: 500,
            slidesToShow: 3,
            slidesToScroll: 3,

            nextArrow: <NextArrow/>,
            prevArrow: <PrevArrow/>,
        };
        const {classes, data} = this.props
        return (
            <Slider {...settings} className={classes.root}>
                {
                    data.map((n, i) =>
                        <div key={i}>

                            <Grid container alignItems={'center'} style={{
                                backgroundImage: 'url("' + n.src + '")',
                            }} className={classes.img}>
                                <Grid item lg={4}>
                                    <span> {n.name}</span>

                                </Grid>

                            </Grid>

                        </div>
                    )
                }
            </Slider>
        );
    }
}

export default withStyles(style)(MultipleItems)