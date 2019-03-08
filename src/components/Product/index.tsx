import React, {useContext} from 'react';
import {RouteComponentProps} from "react-router";
import {reducer} from "../../context";
import LoadingPage from "../Layout/LoadingPage";
import NotFound from "../Layout/NotFound";
import {getVariantOptions} from "../../api/ApiUtils";
import ForSale from './forSale'

interface Props extends RouteComponentProps<{ id: string }> {

}

const SingleProduct: React.FunctionComponent<Props> = props => {
    const {productReducer} = useContext(reducer);
    const products = productReducer.state.products;

    if (!products) return <LoadingPage/>;

    const product = products.find(n => n.id.toString() === props.match.params.id);
    if (!product) return <NotFound msg={'sorry this product is no longer exist'}/>;

    const variantOptions = getVariantOptions(product.variants);

    return  <ForSale
        product={product}
        variantOptions={variantOptions}
    />
};


export default (SingleProduct)