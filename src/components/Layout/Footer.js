import PropTypes from "prop-types";
import React from 'react'
import {Grid, Typography} from '@material-ui/core'
import {withStyles} from '@material-ui/core/styles';
import SearchBar from '../Widget/SearchBar/email'
import FooterList from '../Widget/FooterList'
import Tag from '../Widget/Tags/Tag'
import SocialIcon from '../Widget/SocialIcon'
import {connect} from "react-redux";
import {getTagsCountsArray, redirectUrl} from "../../api/ApiUtils";
import _ from 'lodash'

const styles = theme => ({
    root: {
        padding: '50px 100px 100px 100px',
        backgroundColor: 'black',
        color: 'white',
    },
    emailBar: {
        marginBottom: '30px',
    }
});


const mapStateToProps = state => ({
    products: state.product.products,
    feeds: state.feed.feeds,
    category: state.category.category,
});


const mapDispatchToProps = dispatch => ({}
);

class Footer extends React.Component {

    getTags = () => {
        //todo(handle err)
        const {products, feeds} = this.props;
        let productsArr = getTagsCountsArray(products, () => console.log('ggg'));
        let productsTags = (productsArr && productsArr.length > 0) ? productsArr.map(n => n.label.slice(0, _.indexOf(n.label, ' '))) : [];
        delete productsTags[_.indexOf(productsTags, 'all')];
        // let feedsArr = getTagsCountsArray(feeds, () => redirectUrl('/', this.props.history))
        // let feedsTags = (feedsArr && feedsArr.length > 0) ? feedsArr.map(n => n.label.slice(0, _.indexOf(n.label, ' '))) : []
        //
        //
        // let allTags =_.uniq(productsTags.concat(feedsTags))
        console.log(productsTags);

        if (productsTags.length > 0) return (
            <Grid item xs={6} md={3} container direction={'column'} spacing={8}>
                <Grid item>
                    <Typography variant={'h6'} color={'inherit'}>TAGS</Typography>
                </Grid>
                <Grid item>
                    {
                        productsTags.map(
                            (n, i) => <Tag
                                key={i}
                                value={n}
                                onClick={() => redirectUrl(`/products?tags=${n}`, this.props.history)}
                            />
                        )
                    }

                </Grid>
            </Grid>
        )
    };

    render() {
        const {classes} = this.props;
        return (
            <Grid container justify={'space-between'} className={classes.root}>
                <Grid item container lg={12} direction={'column'} spacing={16} className={classes.emailBar}
                >
                    <Grid item>
                        <Typography variant={'h6'} color={'inherit'}>
                            NEWSLETTER
                        </Typography>
                    </Grid>

                    <Grid item>
                        <SearchBar/>
                    </Grid>
                </Grid>
                <Grid item xs={12} md={3} container direction={'column'} spacing={8}>
                    <Grid item>
                        <Typography variant={'h6'} color={'inherit'}>MYSHOP</Typography>
                    </Grid>
                    <Grid item>
                        <Typography variant={'caption'} color={'inherit'}>

                            We are a team of designers and developers that create quality Wordpress, Magento,
                            Prestashop,
                            Opencarte themes and provided premium and dedicated support to our products.

                            205 Arapahoe St, Schoenchen, KS 69696
                        </Typography>
                    </Grid>

                    <Grid item>
                        <Typography variant={'subtitle1'} color={'inherit'}>
                            Email: your@example.com
                        </Typography>
                    </Grid>
                    <Grid item>
                        <Typography variant={'subtitle1'} color={'inherit'}>
                            Phone: +1 123-456-6789
                        </Typography>
                    </Grid>
                    <Grid item>
                        <SocialIcon type={'facebook'}/>
                        <SocialIcon type={'youtube'}/>
                        <SocialIcon type={'twitter'}/>
                        <SocialIcon type={'reddit'}/>
                        <SocialIcon type={'whatsapp'}/>
                    </Grid>
                </Grid>
                <Grid item xs={6} md={3} container direction={'column'} spacing={8}>
                    <Grid item>
                        <Typography variant={'h6'} color={'inherit'}>
                            FIND US ON</Typography>
                    </Grid>
                    <Grid item>
                        <FooterList/>
                    </Grid>
                </Grid>
                {this.getTags()}
            </Grid>);
    }
}

Footer.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(Footer))