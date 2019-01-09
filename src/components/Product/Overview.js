import React from 'react';
import {Grid} from '@material-ui/core';
import {withStyles} from '@material-ui/core/styles';
import {connect} from 'react-redux'
import Header from '../Layout/Body/Header'
import CommentDescription from './Comment&Description/Overview'
import Detail from './Detail'
import {getVariantOptions, refactorTextLength} from "../../api/ApiUtils"
import LoadingPage from '../Layout/LoadingPage'

const styles = theme => {
    console.log(theme)

    return (
        {
            productCategory: {
                backgroundColor: theme.palette.background.paper
            },
            toolBar: {
                backgroundColor: ''
            },
        })

}


const mapStateToProps = state => ({
    products: state.product.products,
    feeds: state.feed.feeds,
    category: state.category.category,
})


const mapDispatchToProps = dispatch => ({}
)

class ResponsiveDialog extends React.Component {
    hasValidProduct = () => !!this.props.products.find(n => n.id.toString() === this.props.match.params.id)

    render() {
        if (this.hasValidProduct()) {

            const product = this.props.products.find(n => n.id.toString() === this.props.match.params.id)
            const variantOptions = getVariantOptions(product.variants)


            return <Grid container alignItems={'center'} justify={'center'}>
                <Grid item xs={12}>
                    <Header
                        route={'HOME/SHOP/SINGLE PRODUCT'}
                    />
                </Grid>
                <Grid item xs={10}>

                    <Detail
                        variantOptions={Object.values(variantOptions)}
                        variantKeys={Object.keys(variantOptions)}
                        description={product.description}
                        name={refactorTextLength(product.name)}
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
        }

        else {
            return <LoadingPage/>


        }
    }


}


export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(ResponsiveDialog))