import React, {Component} from "react";

import {withStyles} from '@material-ui/core/styles';
import ProductOverviewBox from '../Product/overviewBox'
import {refactorTextLength} from "../../../api/ApiUtils";
import Slider from "react-slick";

import NextArrow from './NextArrow'
import PrevArrow from './PrevArrow'

const style = theme => ({
    root: {
        margin: '40px',
        width: 'calc(100%-80px)'
    },
})

class MultipleItems extends Component {
    render() {
        let settings = {
            dots: true,
            infinite: true,
            speed: 500,
            rows: 2,
            slidesPerRow: this.props.size ? this.props.size : 4,
            slidesToScroll: 1,
            autoplay: true,
            autoplaySpeed: 5000,
            nextArrow: <NextArrow/>,
            prevArrow: <PrevArrow/>,
        };
        const {classes, data} = this.props;
        // let size = this.props.size || 4;
        // if (data.length > size) size = data.length;
        // var products = [];
        //
        // for (var i = 0; i < size; i++) {
        //     i % 4 == 0 && products.push([]);
        //     products[Math.floor(i / 4)].push(data[i] || {});
        // }
        return (

            <Slider {...settings} className={classes.root}>

                {data.map((n, i) =>
                    <div key={i} style={{display: 'flex'}}>

                        <ProductOverviewBox
                            id={n.id}
                            name={refactorTextLength(n.name)}
                            src={((n.photos || [])[0] || {}).url}
                            category={n.tags}
                            regPrice={(n.variants || [])[0] ? n.variants[0].price : 'not a reg price'}
                            promotePrice={n.promotePrice}
                        />
                    </div>
                )}

            </Slider>
        );
    }
}

export default withStyles(style)(MultipleItems)