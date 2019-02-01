import React, {Component} from "react";
import Slider from 'react-slick';
import {withStyles} from '@material-ui/core/styles';
import ProductOverviewBox from '../Product/overviewBox'
import {handleImgValid, refactorTextLength} from "../../../api/ApiUtils";
import {makeStyles} from "@material-ui/styles";

const useStyles = makeStyles(theme => ({
    root: {
        margin: '40px',
        width: 'calc(100%-80px)',
    },
}))

const  AppendDots =props=> {
        const settings = {
            dots: true,
            infinite: true,
            speed: 500,
            slidesToShow: 3,
            rows: 3,

            slidesToScroll: 3,

            customPaging: i => (
                <div
                    onClick={e => console.log('gggg')}
                    style={{
                        width: "30px",
                        color: "black",
                        border: "1px black solid",
                        margin: '10px',
                        cursor: 'pointer',
                    }}

                >
                    {i + 1}
                </div>
            ), responsive: [
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
        const { data} = props
    const classes =useStyles()
        return (
            <div className={classes.root}>
                <Slider {...settings}  >
                    {
                        data.map((n, i) =>
                            <ProductOverviewBox
                                name={refactorTextLength(n.name)}
                                id={n.id}

                                src={handleImgValid(n.photos[0])}
                                category={n.category}
                                regPrice={n.variants[0] ? n.variants[0].price : 'not a reg price'}
                                promotePrice={n.promotePrice}
                                key={i}


                            />
                        )
                    }{
                    data.map((n, i) =>
                        <ProductOverviewBox
                            name={refactorTextLength(n.name)}
                            id={n.id}

                            src={handleImgValid(n.photos[0])}
                            category={n.category}
                            regPrice={n.variants[0] ? n.variants[0].price : 'not a reg price'}
                            promotePrice={n.promotePrice}
                            key={i}


                        />
                    )
                }{
                    data.map((n, i) =>
                        <ProductOverviewBox
                            name={refactorTextLength(n.name)}
                            id={n.id}

                            src={handleImgValid(n.photos[0])}
                            category={n.category}
                            regPrice={n.variants[0] ? n.variants[0].price : 'not a reg price'}
                            promotePrice={n.promotePrice}
                            key={i}


                        />
                    )
                }

                </Slider>
            </div>
        );
    }

export default (AppendDots)