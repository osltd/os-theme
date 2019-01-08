import React from 'react';
import {Grid, Typography} from '@material-ui/core';
import {withStyles} from '@material-ui/core/styles';
import Carousel from '../Widget/Slick/SingleItem'
import {connect} from 'react-redux'
import MultiItems from '../Widget/Slick/MultiplyItems'
import FeedsWall from '../Widget/FeedsWall/Wrapper'
import CategoryOverviewBox from '../Widget/CategoryOverviewBox'
import LoadingPage from '../Layout/LoadingPage'
import {isImgOnlySections} from "../../api/ApiUtils";

const styles = theme => {
    return (
        {
            section: {
                width: '100%',
                margin: '0 80px'
            },
            productCategory: {
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
                marginTop: '50px',
                fontWeight: '700',
                color: theme.palette.primary.dark,
                marginBottom: '20px',
                textAlign: 'center'
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
        var latestArticle = (((this.props.feeds || [])[0] || {}).sections || [])[0] || {};
        console.log(latestArticle)
        return (
            (this.props.feeds && this.props.products) ?
                <Grid container alignItems={'flex-start'} justify={'center'}>

                    <Grid item xs={12}>
                        <Carousel data={latestArticle.medias.filter(n=>n.ext!=='mp4') || []}
                                  title={latestArticle.title || ''}
                                  caption={latestArticle.description || ''}/>
                    </Grid>

                    
                    <Grid item xs={12} style={{ marginTop: 80 }}>
                        <FeedsWall
                            data={this.props.feeds.filter((n, i) => isImgOnlySections(n.sections))}
                        />
                    </Grid>


                    {/* ---------------- hot sale products ----------------*/}
                    <section className={classes.section}>
                        <div>
                            <Typography variant={'display1'} className={classes.title}>
                                TOP INTERESTING
                            </Typography>
                            <Typography variant={'subheading'} className={classes.text}>
                                Browse the collection of our best selling and top interesting products. You’ll definitely
                                find
                                what you are looking for.
                            </Typography>
                        </div>

                        <div>
                            <MultiItems data={this.props.products} size={8}/>
                        </div>
                    </section>
                    {/* ---------------- /hot sale products ----------------*/}


                    <Grid item container alignItems={'center'} justify={'center'} className={classes.productCategory}>
                        <Grid item lg={5} xs={12} container justify={'center'}>
                            <Typography variant={'display1'} className={classes.title}>
                                PRODUCT CATEGORIES
                            </Typography>
                            <Typography variant={'subheading'} className={classes.text}>
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

                    <section className={classes.section}>
                        <div>
                            <Typography variant={'display1'} className={classes.title}>
                                Featured Products
                            </Typography>
                            <Typography variant={'subheading'} className={classes.text}>
                                Browse the collection of our best selling and top interesting products. You’ll definitely
                                find
                                what you are looking for.
                            </Typography>
                        </div>

                        <div>
                            <MultiItems data={this.props.products}/>
                        </div>
                    </section>

                </Grid> : <LoadingPage/>
        );
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(ResponsiveDialog))