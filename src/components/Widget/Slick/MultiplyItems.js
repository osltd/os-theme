import React, {Component} from "react";
import Slider from 'react-slick';

import {withStyles} from '@material-ui/core/styles';
import ProductOverviewBox from '../Product/overviewBox'
import NextArrow from './NextArrow'
import PrevArrow from './PrevArrow'
import {refactorTextLength} from "../../../api/ApiUtils";

const style = theme => ({
    root: {
        margin: '40px',
        width: 'calc(100%-80px)'
    },
})

class MultipleItems extends Component {
    render() {
        const {classes, data} = this.props;
        var size = this.props.size || 4;
        if (data.length > size) size = data.length;
        var products = [];
        for (var i = 0; i < size; i++) {
            i % 4 == 0 && products.push([]);
            products[Math.floor(i/4)].push(data[i] || {});
        }
        return (
            <div className={classes.root}>
                {products.map((cols, i) => <div key={i} style={{ display: 'flex' }}>
                    {cols.map((n, y) => <ProductOverviewBox
                    key={i + ':' + y}
                    id={n.id}
                    name={refactorTextLength(n.name)}
                    src={((n.photos||[])[0]||{}).url}
                    category={n.tags}
                    regPrice={(n.variants||[])[0] ? n.variants[0].price : 'not a reg price'}
                    promotePrice={n.promotePrice}
                />)}
                </div>)}
            </div>
        );
    }
}

export default withStyles(style)(MultipleItems)