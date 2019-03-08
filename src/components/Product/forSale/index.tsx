import React from 'react';
import {Grid} from '@material-ui/core';
import Detail from './Details'
import {makeStyles} from "@material-ui/styles";
import {RouteComponentProps, withRouter} from "react-router-dom";
import {Product} from "../../../interfaces/server/Product";
import {VariantOptions} from "../../../interfaces/client/Common";
import Slick from "../../Widget/Slick/Products";
import {useThemeWidth} from "../../../hooks/useThemeWidth";

const useStyles = makeStyles(theme => (
    {
        productCategory: {
            backgroundColor: theme.palette.background.paper
        },
        toolBar: {
            backgroundColor: ''
        },
    })
);

interface Props extends RouteComponentProps<{ id: string }> {
    product: Product
    variantOptions: Array<VariantOptions>
}

const ForSale: React.FunctionComponent<Props> = props => {
    const {product, variantOptions} = props;
    const themeWidth = useThemeWidth()
    const position = (themeWidth.isWidthUp.sm);

    return <Grid container spacing={16} alignItems={'flex-start'} justify={'center'}>
        {position ? <Detail product={props.product}/> : null}

        <Grid item container xs={10} sm={5}>
            <Grid item xs={12}>
                <Slick
                    data={product.photos ? product.photos.map(n => ({url: n.url,})) : []}
                />
            </Grid>
        </Grid>

        {!position ? <Detail product={props.product}/> : null}

    </Grid>

};


export default withRouter(ForSale)