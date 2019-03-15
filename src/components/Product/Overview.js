import React, {useContext} from 'react';
import {Grid} from '@material-ui/core';
import {connect} from 'react-redux'
import Header from '../Layout/Body/Header'
import CommentDescription from './Comment&Description/Overview'
import Detail from '.'
import {getVariantOptions} from "../../api/ApiUtils"
import LoadingPage from '../Layout/LoadingPage'
import {makeStyles} from "@material-ui/styles";
import NotFound from '../Layout/NotFound'
import {reducer} from "../../context";

const useStyles = makeStyles(theme => {
    console.log(theme);

    return (
        {
            productCategory: {
                backgroundColor: theme.palette.background.paper
            },
            toolBar: {
                backgroundColor: ''
            },
        })

});

const mapStateToProps = state => ({
    products: state.product.products,
    feeds: state.feed.feeds,
    category: state.category.category,
});


const mapDispatchToProps = dispatch => ({}
);

const SingleProduct = props => {
    const {feed} = useContext(reducer);
    let hasValidProduct = () => !!props.products.find(n => n.id.toString() === props.match.params.id);
    const classes = useStyles();
    if (!props.products) return <LoadingPage/>;
    const product = props.products.find(n => n.id.toString() === props.match.params.id);
    if (!product) return <NotFound msg={'sorry this product is no longer exist'}/>;
    //todo(cant pass if not reloaded)
    const variantOptions = getVariantOptions(product.variants);

    return <Grid container alignItems={'center'} justify={'center'}>
        <Grid item xs={12}>
            <Header
                title={product.name}
            />
        </Grid>
        <Grid item xs={10}>
            <Detail
                variantOptions={Object.values(variantOptions)}
                variantKeys={Object.keys(variantOptions)}
                description={product.description}
                product={product}

            />
        </Grid>
        {
            false && <Grid item xs={10} container>
                <CommentDescription
                    content={product.description}
                />
            </Grid>
        }

    </Grid>

};


export default connect(mapStateToProps, mapDispatchToProps)(SingleProduct)