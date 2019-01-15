import React, {Fragment} from 'react';
import {Grid, Typography} from '@material-ui/core';
import {withStyles} from '@material-ui/core/styles';
import Carousel from '../Widget/Slick/SingleItem'
import {connect} from 'react-redux'
import MultiItems from '../Widget/Slick/MultiplyItems'
import FeedsWall from '../Widget/FeedsWall/Wrapper'
import CategoryOverviewBox from '../Widget/CategoryOverviewBox'
import LoadingPage from '../Layout/LoadingPage'
import {isImgOnlySections} from "../../api/ApiUtils";
import {redirectUrl} from "../../api/ApiUtils";
import withWidth, {isWidthUp} from "@material-ui/core/withWidth/index";

const FEATURED_PRODUCTS = 'featured'
const styles = theme => (
        {
            section: {
                width: '100%',
                margin: '0 80px'
            },
            productCategory: {
                paddingTop: '40px',

                paddingBottom: '40px',
                backgroundColor: theme.palette.background.paper
            },
            text: {
                textAlign: 'center',
                color: theme.palette.secondary.light,
                marginBottom: '30px',
                wordWrap: 'break-word',
                wordBreak: 'break-all'

            },
            title: {
                paddingTop: '20px',
                marginTop: '50px',
                fontWeight: '700',
                color: theme.palette.primary.dark,
                marginBottom: '20px',
                textAlign: 'center'
            }


        })



const mapStateToProps = state => ({
    products: state.product.products,
    feeds: state.feed.feeds,
    category: state.category.category,
});


const mapDispatchToProps = dispatch => ({}
)

class ResponsiveDialog extends React.Component {


    getSlick = (search = '') => {
        let selectedProducts = search ? this.props.products.filter(n => n.tags.find(m => m.toLowerCase() === search)) : this.props.products
        if (
            isWidthUp('md', this.props.width)
        ) return <MultiItems data={selectedProducts}/>
        if (
            isWidthUp('sm', this.props.width)
        ) return <MultiItems data={selectedProducts} size={3}/>
        if (
            isWidthUp('xs', this.props.width)
        ) return <MultiItems data={selectedProducts} size={2}/>

    }

    render() {
        const {classes} = this.props
        let latestArticle = this.props.feeds && this.props.feeds.filter((n, i) => isImgOnlySections(n.sections)).filter((n, i) => i < 3)

        let hasProductsToShow = (this.props.products && this.props.products.length > 0)

        let hasFeedsToShow = (this.props.feeds && this.props.feeds.length > 0)

        let hasCategoryToShow = (this.props.category.length > 0)

        let hasSelectedProductsToShow = hasProductsToShow && this.props.products
            .filter(n => n.tags.find(m => m.toLowerCase() === FEATURED_PRODUCTS)).length > 0

        let getDataFromAPI = (this.props.feeds === null && this.props.products === null)
        if (getDataFromAPI) return <LoadingPage/>

        if (!(hasProductsToShow) && !(hasFeedsToShow))
            return <Grid xs={12}>
                <Carousel
                    data={new Array(3).fill(1)
                        .map((n, i) => ({
                            url: `img/init/photo${i + 1}.jpeg`,
                        }))}

                    title={[
                        'shops is under construction',
                        'there is no products and feeds in this shops yet',

                        'please wait']}


                />
            </Grid>


        return (
            <Grid container alignItems={'flex-start'} justify={'center'}>

                {

                    hasFeedsToShow && <Fragment>

                        <Grid item xs={12}>
                            <Carousel
                                data={latestArticle.map(n => n.sections[0].medias[0])}
                                title={latestArticle.map(n => n.sections[0].title) || ''}
                                onClick={() => redirectUrl(`/feeds/${latestArticle.id}`)}/>
                        </Grid>


                        <Grid item xs={12} style={{marginTop: 80}}>
                            <FeedsWall
                                data={this.props.feeds.filter((n, i) => isImgOnlySections(n.sections))}
                            />
                        </Grid>
                    </Fragment>

                }


                {/* ---------------- hot sale products ----------------*/}
                {
                    hasProductsToShow && <section className={classes.section}>
                        <div>
                            <Typography variant={'display1'} className={classes.title}>
                                TOP INTERESTING
                            </Typography>

                        </div>

                        <div>
                            {this.getSlick()}
                        </div>
                    </section>
                }
                {/* ---------------- /hot sale products ----------------*/}

                {
                    hasCategoryToShow && <Grid item container alignItems={'center'} justify={'center'}
                                               className={classes.productCategory}>

                        <Grid item xs={12} md={10} lg={10}>
                            <CategoryOverviewBox

                                category={this.props.category}
                            />
                        </Grid>

                    </Grid>
                }
                {
                    hasSelectedProductsToShow &&
                    <section className={classes.section}>
                        <Grid item>
                            <Typography variant={'display1'} className={classes.title}>
                                FEATURE PRODUCTS
                            </Typography>
                        </Grid>

                        <div>
                            {this.getSlick(FEATURED_PRODUCTS)}
                        </div>
                    </section>
                }


            </Grid>
        );
    }
}


export default withWidth()(connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(ResponsiveDialog)))