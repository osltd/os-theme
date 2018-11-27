import React, {Component} from "react";
import Slider from "react-slick";
import {withStyles} from '@material-ui/core/styles';
import ProductOverviewBox from '../Product/overviewBox'
import NextArrow from './NextArrow'
import PrevArrow from './PrevArrow'
import {refactorTextLength} from "../../../api/ApiUtils";

const style = theme => (
    {
        root: {
            margin: '40px',
            width: 'calc(100%-80px)',
        }
        ,
        img: {
            height: '100px',
        }
        ,
    }
)

class MultipleRows extends Component {
    render() {
        //should be slide to show 4 rows should be 2
        const settings = {
            dots: true,
            infinite: true,
            speed: 500,
            slidesToShow: 4,
            slidesToScroll: 1,
            rows: 2,
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
                            id={n.id}
                            key={i}
                            name={refactorTextLength(n.name)}
                            src={n.photos[0].url}
                            category={n.tags}
                            regPrice={n.variants[0] ? n.variants[0].price : 'not a reg price'}
                            promotePrice={n.promotePrice}


                        />
                    )
                }

            </Slider>
        );
    }
}

export default withStyles(style)(MultipleRows)