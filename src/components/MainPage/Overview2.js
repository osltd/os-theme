import React from 'react';
import {Grid, Typography} from '@material-ui/core';
import {withStyles} from '@material-ui/core/styles';
import Carousel from '../Widget/Slick/SingleItem'
import MultiRows from '../Widget/Slick/MultiplyRows'
import {connect} from 'react-redux'
import MultiItems from '../Widget/Slick/MultiplyItems'
import FeedsWall from '../Widget/FeedsWall/Wrapper'
import CategoryOverviewBox from '../Widget/CategoryOverviewBox'

const styles = theme =>
{
    return (

        {
            productCategory: {
                backgroundColor: theme.palette.background.paper
            }
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
            <Grid container alignItems={'flex-start'} justify={'center'}>
                <Grid item sm={12} style={ {marginTop:'-10px'}}>
                    <Carousel data={this.props.feeds}/>
                </Grid>
                <Grid item lg={12}>
                    <MultiItems
                        slidesToShow={5}
                        data={this.props.products}
                    />
                </Grid>

                <Grid item lg={12}>
                    <FeedsWall
                        data={this.props.feeds}
                    />
                </Grid>

                <Grid item container alignItems={'center'} justify={'center'} lg={5}>
                    <Typography variant={'display2'}>
                        TOP INTERESTING
                    </Typography>
                    <Typography variant={'title'}>
                        Browse the collection of our best selling and top interesting products. You’ll definitely find
                        what you are looking for.
                    </Typography>
                </Grid>

                <Grid item lg={10} >
                    <MultiRows
                        data={this.props.products}
                    />
                </Grid>

                <Grid item container alignItems={'center'} justify={'center'} className={classes.productCategory}>
                    <Grid item lg={5}>
                        <Typography variant={'display2'}>
                            PRODUCT CATEGORIES
                        </Typography>
                        <Typography variant={'title'}>
                            Variety of product categories, tens of products, only five-stars reviews. Browse the
                            collections
                            right now.
                        </Typography>
                    </Grid>
                    <Grid item>
                        <CategoryOverviewBox
                            category={this.props.category}
                        />
                    </Grid>

                </Grid>



            </Grid>
        );
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(ResponsiveDialog))