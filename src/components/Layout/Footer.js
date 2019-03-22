import React, {useContext} from 'react'
import {Grid, Typography} from '@material-ui/core'
import {withStyles} from '@material-ui/core/styles';
import FooterList from '../Widget/FooterList'
import Tag from '../Widget/Tags/Tag'
import SocialIcon from '../Widget/SocialIcon'
import {connect} from "react-redux";
import {getTagsCountsArray, redirectUrl} from "../../api/ApiUtils";
import _ from 'lodash'
import {I18nText} from "../Widget/I18nText";
import {keyOfI18n} from "../../constants/locale/interface";
import {reducer} from "../../context";
import FooterLanguageBar from '../Widget/FooterLanguageBar'
import {useThemeWidth} from "../../hooks/useThemeWidth";
const styles = theme => ({
    root: {
        marginTop: '50px',
        padding: '50px 10px',
        backgroundColor: 'black',
        color: 'white',
    },
    emailBar: {
        marginBottom: '30px',
    },
    title: {
        color:'white',
        textTransform: 'uppercase'
    }
});


const mapStateToProps = state => ({
    products: state.product.products,
    feeds: state.feed.feeds,
    category: state.category.category,
    shopInfo: state.common.shopInfo,

});


const mapDispatchToProps = dispatch => ({}
);

const Footer = props => {
    const {commonReducer} = useContext(reducer)
    const themeWidth = useThemeWidth()

    const getTags = () => {
        //todo(handle err)
        const {products, feeds} = props;
        let productsArr = getTagsCountsArray(products, () => console.log('ggg'));
        let productsTags = (productsArr && productsArr.length > 0) ? productsArr.map(n => n.label.slice(0, _.indexOf(n.label, ' '))) : [];
        delete productsTags[_.indexOf(productsTags, 'all')];
        // let feedsArr = getTagsCountsArray(feeds, () => redirectUrl('/', props.history))
        // let feedsTags = (feedsArr && feedsArr.length > 0) ? feedsArr.map(n => n.label.slice(0, _.indexOf(n.label, ' '))) : []
        //
        //
        // let allTags =_.uniq(productsTags.concat(feedsTags))

        if (productsTags.length > 0) return (
            <Grid item xs={6} md={2} style={
              themeWidth.isWidthDown.md?  {
                    marginTop: '25px'
                }:{}
            } container direction={'column'} spacing={8}>
                <Grid item>
                    <Typography variant={'h6'} className={props.classes.title} color={'inherit'}><I18nText
                        keyOfI18n={keyOfI18n.TAGS}/></Typography>
                </Grid>
                <Grid item>
                    {
                        productsTags.map(
                            (n, i) => <Tag
                                key={i}
                                value={n}
                                onClick={() => redirectUrl(`/products?tags=${n}`, props.history)}
                            />
                        )
                    }

                </Grid>
            </Grid>
        )
    };

    const {classes} = props;
    return (
        <Grid container justify={'space-between'} className={classes.root}>
            {/*<Grid item container lg={12} direction={'column'} spacing={16} className={classes.emailBar}*/}
            {/*>*/}
            {/*<Grid item>*/}
            {/*<Typography variant={'h6'} color={'inherit'}>*/}
            {/*NEWSLETTER*/}
            {/*</Typography>*/}
            {/*</Grid>*/}

            {/*<Grid item>*/}
            {/*<SearchBar/>*/}
            {/*</Grid>*/}
            {/*</Grid>*/}
            <Grid item md={1}/>

            <Grid item xs={12} md={2} container direction={'column'} spacing={8}>
                <Grid item>
                    <Typography variant={'h6'} color={'inherit'}>{props.shopInfo.name}</Typography>
                </Grid>
                <Grid item>
                    <Typography variant={'caption'} color={'inherit'}>
                        {props.shopInfo.description}
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

            <Grid item xs={6} md={3} style={themeWidth.isWidthDown.md?  {marginTop: '25px'}:{}} container direction={'column'} spacing={8}>
                <Grid item>
                    <Typography className={classes.title} variant={'h6'} color={'inherit'}>
                        <I18nText keyOfI18n={keyOfI18n.FOOTER_FIND_US_ON}/>
                    </Typography>
                </Grid>
                <Grid item>
                    <FooterList/>
                </Grid>
            </Grid>
            {getTags()}
            <Grid item xs={12} md={1}>
                <FooterLanguageBar/>
            </Grid>

            <Grid item md={1}/>
        </Grid>);
}


export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(Footer))