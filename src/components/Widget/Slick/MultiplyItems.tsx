import React from "react";
import ProductOverviewBox from '../Product/overviewBox'
import {refactorTextLength} from "../../../api/ApiUtils";
import Slider from "react-slick";
import {makeStyles, useTheme} from "@material-ui/styles";
import NextArrow from './NextArrow'
import PrevArrow from './PrevArrow'
import {Product} from "../../../interfaces/server/Product";
import {useThemeWidth} from "../../../hooks/useThemeWidth";
import {Theme} from "@material-ui/core";
import {Breakpoint} from "@material-ui/core/styles/createBreakpoints";
import {unstable_useMediaQuery as useMediaQuery} from "@material-ui/core/useMediaQuery";
import {breakpoints} from "../../../constants/enum";

const useStyles = makeStyles(theme => ({
    root: {
        margin: '40px',
        width: 'calc(100%-80px)'
    },
}));

interface Props {
    data?: Array<Product>
}

const MultipleItems: React.FunctionComponent<Props> = props => {
    const classes = useStyles();
    let themeWidth = useThemeWidth()
    let size =      (themeWidth.isWidthUp.md) ? 4 : (themeWidth.isWidthUp.sm) ? 3 : 2

    let settings = {
        dots: true,
        infinite: true,
        speed: 500,
        rows: 2,
        slidesPerRow: size,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 5000,
        nextArrow: <NextArrow/>,
        prevArrow: <PrevArrow/>,
    };
    const {data} = props;
    // let size = props.size || 4;
    // if (data.length > size) size = data.length;
    // var products = [];
    //
    // for (var i = 0; i < size; i++) {
    //     i % 4 == 0 && products.push([]);
    //     products[Math.floor(i / 4)].push(data[i] || {});
    // }
    return (

        <Slider {...settings} className={classes.root}>
            {data ? data.map((n, i) =>
                <div key={i}>

                    <ProductOverviewBox
                        id={n.id}
                        name={refactorTextLength(n.name)}
                        src={((n.photos || [])[0] || {}).url}
                        category={n.tags}
                        regPrice={(n.variants || [])[0] ? n.variants[0].price : 0}
                    />
                </div>
            ) : <div/>}
        </Slider>
    );
};

export default (MultipleItems)