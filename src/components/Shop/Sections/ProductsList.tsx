import React from "react";
import {Product} from "../../../interfaces/server/Product";
import {Grid, Theme, Typography} from "@material-ui/core";
import ProductOverviewBox from '../../Widget/Product/overviewBox'
import {handleImgValid, refactorTextLength} from "../../../api/ApiUtils";
import {viewModeType} from "../../../constants/enum";
import {makeStyles} from "@material-ui/styles";
import ProductOverviewList from '../../Widget/Product/overviewList'

const useStyles = makeStyles((theme: Theme) => ({
    productCategory: {
        backgroundColor: '#F7F7F7',

    },
    toolBar: {
        padding: '10px',
        backgroundColor: theme.palette.background.paper,
    },
    icon: {
        padding: '10px',
        cursor: 'pointer',
        alignItems: 'center',
        border: '1px solid black',

    }, listMode: {
        padding: '20px',
    },
    array: {
        paddingLeft: '5px',
    }
}))

interface Props {
    products: Array<Product>
    tag: string
    viewMode: viewModeType
}


const ProductsList: React.FunctionComponent<Props> = props => {
    const {products, tag, viewMode} = props
    const classes = useStyles()

    const hasProductsToShow = products.length > 0
    const isViewModeList = viewMode === viewModeType.LIST
    const getProductList = () => {
        switch (true) {
            case !hasProductsToShow:
                return <Typography variant={'subtitle1'}> there are no products
                    under <strong>{tag}</strong> category yet</Typography>
            case isViewModeList:
                return products.map((n, i) => (<ProductOverviewList
                    key={i}
                    src={handleImgValid(n.photos[0])}
                    name={refactorTextLength(n.name)}
                    category={n.tags}
                    regPrice={n.variants[0] ? n.variants[0].price : 0}
                    description={n.description}
                    id={n.id}
                />))

            default:
                return products.map((n, i) =>
                    <Grid item xs={12} sm={6} md={4} key={i}
                    >

                        <ProductOverviewBox
                            name={refactorTextLength(n.name, 20)}
                            id={n.id}
                            src={handleImgValid(n.photos[0])}
                            category={n.tags}
                            regPrice={n.variants[0] ? n.variants[0].price : 0}
                        />
                    </Grid>
                )

        }
    }


    return <Grid item container className={classes.listMode}>
        {getProductList()}
    </Grid>
}

export default ProductsList