import React, {lazy, Suspense} from 'react';
import {Grid} from '@material-ui/core';
import {withStyles} from '@material-ui/core/styles';
import Carousel from '../Widget/Slick/SingleItem'
import {connect} from 'react-redux'
import CategoryOverviewBox from '../Widget/CategoryOverviewBox'
import {isImgOnlySections} from "../../api/ApiUtils";
import withWidth from "@material-ui/core/withWidth/index";
import LoadingPage from '../Layout/LoadingPage'


const SectionBanner = lazy(() => import('./Sections/Banner'))
const SectionTopInterest = lazy(() => import('./Sections/TopInterest'))
const SectionFeatureProducts = lazy(() => import('./Sections/FeatureProducts'))
const FEATURED_PRODUCTS = 'featured'

const styles = theme => ({
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

const MainPageOverview =props=> {



        const {classes,feeds,products,history,category} = props
        let getDataFromAPI = (feeds === null && products === null)
        if (getDataFromAPI) return <LoadingPage/>
        let latestArticle = feeds && feeds.filter((n, i) => isImgOnlySections(n.sections)).filter((n, i) => i < 3)
        let hasProductsToShow = (products && products.length > 0)
        let hasFeedsToShow = (feeds && feeds.length > 0)
        let hasCategoryToShow = (category.length > 0)
        let hasSelectedProductsToShow = hasProductsToShow && products
            .filter(n => n.tags.find(m => m.toLowerCase() === FEATURED_PRODUCTS)).length > 0


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
                <Suspense fallback={null}>
                    <SectionBanner
                        hasFeedsToShow={hasFeedsToShow}
                        latestArticle={latestArticle}
                        feeds={feeds}
                    />
                </Suspense>
                {/* ---------------- hot sale products ----------------*/}
                {
                    <Suspense fallback={null}>
                        <SectionTopInterest self={props}/>
                    </Suspense>

                }
                {/* ---------------- /hot sale products ----------------*/}

                {
                    hasCategoryToShow && <Grid item container alignItems={'center'} justify={'center'}
                                               className={classes.productCategory}>

                        <Grid item xs={12} md={10} lg={10}>
                            <CategoryOverviewBox

                                category={category}
                            />
                        </Grid>

                    </Grid>
                }
                {
                    <Suspense fallback={null}>
                        <SectionFeatureProducts self={props}/>
                    </Suspense>

                }


            </Grid>
        );
    }


export default withWidth()(connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(MainPageOverview)))