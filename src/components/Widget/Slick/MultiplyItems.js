import React, {Component} from "react";
import Slider from 'react-slick';

import {withStyles} from '@material-ui/core/styles';
import {Grid} from '@material-ui/core'
import ProductOverviewBox from '../Product/overviewBox'
import NextArrow from './NextArrow'
import PrevArrow from './PrevArrow'
import {formatMoney, refactorTextLength} from "../../../api/ApiUtils";

const style = theme => ({
    root: {
        margin: '40px',
        width: 'calc(100%-80px)',
    },
})

class MultipleItems extends Component {
    render() {
        const settings = {
            dots: true,
            infinite: true,
            speed: 500,
            slidesToShow: this.props.slidesToShow?this.props.slidesToShow:3,
            slidesToScroll: 3,

            nextArrow: <NextArrow/>,
            prevArrow: <PrevArrow/>,
            responsive: [
                {
                    breakpoint: 1024,
                    settings: {
                        slidesToShow: 3,
                        slidesToScroll: 3,
                        infinite: true,
                        dots: true
                    }
                },
                {
                    breakpoint: 600,
                    settings: {
                        slidesToShow: 2,
                        slidesToScroll: 2,
                        initialSlide: 2
                    }
                },
                {
                    breakpoint: 480,
                    settings: {
                        slidesToShow: 1,
                        slidesToScroll: 1
                    }
                }
            ]

        };
        const {classes, data} = this.props
        return (
            <Slider {...settings} className={classes.root}>
                {
                    data.map((n, i) =>
                        <ProductOverviewBox
                            key={i}
                            name={refactorTextLength(n.name)}
                            src={n.photos[0].url}
                            category={n.tags}
                            regPrice={n.variants[0]?n.variants[0].price:'not a reg price'}
                            promotePrice={n.promotePrice}

                        />

                    )
                }
            </Slider>
        );
    }
}

export default withStyles(style)(MultipleItems)