import React from 'react';
import {Grid, Typography} from '@material-ui/core';
import {withStyles} from '@material-ui/core/styles';
import Carousel from '../Widget/Slick/SingleItem'
import MultiRows from '../Widget/Slick/MultiplyRows'
import {connect} from 'react-redux'
import MultiItems from '../Widget/Slick/MultiplyItems'
import FeedsWall from '../Widget/FeedsWall/Wrapper'
import CategoryOverviewBox from '../Widget/CategoryOverviewBox'

const styles = theme => {
    console.log(theme)
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
            (this.props.feeds && this.props.products ) ?
                <Grid container alignItems={'flex-start'} justify={'center'}>
                    <Grid item xs={12} style={{marginTop: '-10px'}}>
                        <Carousel data={this.props.feeds.filter(n => (n.sections && n.sections[0].medias[0]))}/>
                    </Grid>

                    <Grid item xs={12}>
                        <FeedsWall
                            data={this.props.feeds.filter((n, i) => (n.sections && n.sections[0].medias[0]))}
                        />
                    </Grid>

                    <Grid item container alignItems={'center'} justify={'center'} lg={5}>
                        <Typography variant={'display2'}>
                            TOP INTERESTING
                        </Typography>
                        <Typography variant={'title'}>
                            Browse the collection of our best selling and top interesting products. You’ll definitely
                            find
                            what you are looking for.
                        </Typography>
                    </Grid>

                    <Grid item xs={10}>
                        <MultiRows
                            data={this.props.products}
                        />
                    </Grid>

                    <Grid item container alignItems={'center'} justify={'center'} className={classes.productCategory}>
                        <Grid item lg={10} xs={12} container justify={'center'}>
                            <Typography variant={'display2'}>
                                PRODUCT CATEGORIES
                            </Typography>
                            <Typography variant={'title'}>
                                Variety of product categories, tens of products, only five-stars reviews. Browse the
                                collections
                                right now.
                            </Typography>
                        </Grid>
                        <Grid item xs={12} md={10} lg={10}>
                            <CategoryOverviewBox
                                category={this.props.category}
                            />
                        </Grid>

                    </Grid>

                    <Grid item xs={9}>
                        <MultiItems
                            data={this.props.products}
                        />
                    </Grid>


                </Grid> : <div>
                    loading page
                </div>
        );
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(ResponsiveDialog))