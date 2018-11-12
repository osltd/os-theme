import React from 'react';
import {Grid} from '@material-ui/core';
import {withStyles} from '@material-ui/core/styles';
import {connect} from 'react-redux'
import Header from '../Layout/Body/Header'
import SingleItemImgWall from '../Widget/ImgWall/singleItem'
import CommentDescription from './Comment&Description/Overview'
import Detail from './Detail'
import {refactorTextLength} from "../../api/ApiUtils";

const styles = theme => {
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
});


const mapDispatchToProps = dispatch => ({}
)

class ResponsiveDialog extends React.Component {
    componentDidMount() {
    }

    hasValidProduct = () => !!this.props.products.find(n => n.id.toString() === this.props.match.params.id)

    render() {
        const {classes} = this.props
        console.log(this.props.match.params.id)
        if (this.hasValidProduct()) {
            const product = this.props.products.find(n => n.id.toString() === this.props.match.params.id)
            console.log(product)
            return <Grid container alignItems={'center'} justify={'center'}>
                <Grid item xs={12}>
                    <Header
                        title={refactorTextLength(product.name)}
                        route={'HOME/SHOP/SINGLE PRODUCT'}
                    />
                </Grid>
                <Grid item xs={10} container alignItems={'flex-start'} justify={'center'}>

                    <Grid item xs={7}>
                        <Detail
                        name={refactorTextLength(product.name)}
                        regPrice={product.variants[0]?product.variants[0].price:'not a reg price'}


                        />
                    </Grid>

                    <Grid item xs={5}>
                        <SingleItemImgWall/>
                    </Grid>

                </Grid>

                <Grid item xs={10} container>

                    <CommentDescription/>
                </Grid>
            </Grid>
        }

        else {
            return <div>dont have such products
            </div>
        }
    }


}


export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(ResponsiveDialog))