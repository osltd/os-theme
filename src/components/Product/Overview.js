import React from 'react';
import {Divider, Grid} from '@material-ui/core';
import {withStyles} from '@material-ui/core/styles';
import {connect} from 'react-redux'
import Header from '../Layout/Body/Header'
import SingleItemImgWall from '../Widget/ImgWall/singleItem'
import CommentDescription from './Comment&Description/Overview'
import Detail from './Detail'

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
});


const mapDispatchToProps = dispatch => ({}
)

class ResponsiveDialog extends React.Component {

    render() {
        const {classes} = this.props
        return (
            <Grid container alignItems={'center'} justify={'center'}>
                <Grid item xs={12}>
                    <Header
                        title={'SINGLE PRODUCT'}
                        route={'HOME/SHOP/SINGLE PRODUCT'}
                    />
                </Grid>
                <Grid item xs={10} container alignItems={'flex-start'} justify={'center'}>

                    <Grid item xs={7}>
                        <Detail/>
                    </Grid>

                    <Grid item xs={5}>
                        <SingleItemImgWall/>
                    </Grid>

                </Grid>

                <Grid item xs={10} container>

                    <CommentDescription/>
                </Grid>

            </Grid>

        );
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(ResponsiveDialog))