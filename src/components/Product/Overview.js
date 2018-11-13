import React from 'react';
import {Grid} from '@material-ui/core';
import {withStyles} from '@material-ui/core/styles';
import {connect} from 'react-redux'
import Header from '../Layout/Body/Header'
import SingleItemImgWall from '../Widget/ImgWall/singleItem'
import CommentDescription from './Comment&Description/Overview'
import Detail from './Detail'
import {refactorTextLength} from "../../api/ApiUtils"
import NotFound from '../Layout/NotFound'

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
})


const mapDispatchToProps = dispatch => ({}
)

class ResponsiveDialog extends React.Component {
    hasValidProduct = () => !!this.props.products.find(n => n.id.toString() === this.props.match.params.id)

    componentDidMount() {
    }

    render() {
        const {classes} = this.props
        if (this.hasValidProduct()) {
            const product = this.props.products.find(n => n.id.toString() === this.props.match.params.id)
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
                            description={product.description}
                            name={refactorTextLength(product.name)}
                            regPrice={product.variants[0] ? product.variants[0].price : 'not a reg price'}


                        />
                    </Grid>

                    <Grid item xs={5}>
                        <SingleItemImgWall
                            data={product.photos.map(n => ({
                                src: n.url,
                            }))}

                        />
                    </Grid>

                </Grid>

                <Grid item xs={10} container>

                    <CommentDescription
                        content={product.description}
                    />
                </Grid>
            </Grid>
        }

        else {
            return <NotFound
                msg={"product doesn't exist"}


            />


        }
    }


}


export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(ResponsiveDialog))