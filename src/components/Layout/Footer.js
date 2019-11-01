import React, {useContext} from 'react';
import {connect} from "react-redux";
import _ from 'lodash';
import {Grid, Typography} from '@material-ui/core'
import {withStyles} from '@material-ui/core/styles';
import withWidth, {isWidthUp} from '@material-ui/core/withWidth/index';




import FooterList from '../Widget/FooterList'
import Tag from '../Widget/Tags/Tag'
import SocialIcon from '../Widget/SocialIcon'
import {getTagsCountsArray, redirectUrl} from "../../api/ApiUtils";
import {I18nText} from "../Widget/I18nText";
import {keyOfI18n} from "../../constants/locale/interface";
import {reducer} from "../../context";
import FooterLanguageBar from '../Widget/FooterLanguageBar'
import {useThemeWidth} from "../../hooks/useThemeWidth";
const styles = theme => ({
    root: {
        marginTop: '50px',
        backgroundColor: 'black',
        color: 'white',
        display: 'flex',
        '& > div': {
            flex: 1
        },
        '& > div:last-child': {
            display: 'flex',
            justifyContent: 'flex-end'
        }
    },

    shopInfo: {
        marginBottom: 15
    },
    shopName: {
        margin: 0,
        padding: 0,
        fontFamily: '-apple-system,BlinkMacSystemFont,sans-serif'
    },
    shopDesc: {
        margin: 0,
        padding: 0,
        fontFamily: '-apple-system,BlinkMacSystemFont,sans-serif'
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

    // const getTags = () => {
    //     //todo(handle err)
    //     const {products, feeds} = props;
    //     let productsArr = getTagsCountsArray(products, () => console.log('ggg'));
    //     let productsTags = (productsArr && productsArr.length > 0) ? productsArr.map(n => n.label.slice(0, _.indexOf(n.label, ' '))) : [];
    //     delete productsTags[_.indexOf(productsTags, 'all')];
    //     // let feedsArr = getTagsCountsArray(feeds, () => redirectUrl('/', props.history))
    //     // let feedsTags = (feedsArr && feedsArr.length > 0) ? feedsArr.map(n => n.label.slice(0, _.indexOf(n.label, ' '))) : []
    //     //
    //     //
    //     // let allTags =_.uniq(productsTags.concat(feedsTags))

    //     if (productsTags.length > 0) return (
    //         <Grid item xs={6} md={2} style={
    //           themeWidth.isWidthDown.md?  {
    //                 marginTop: '25px'
    //             }:{}
    //         } container direction={'column'} spacing={8}>
    //             <Grid item>
    //                 <Typography variant={'h6'} className={props.classes.title} color={'inherit'}><I18nText
    //                     keyOfI18n={keyOfI18n.TAGS}/></Typography>
    //             </Grid>
    //             <Grid item>
    //                 {
    //                     productsTags.map(
    //                         (n, i) => <Tag
    //                             key={i}
    //                             value={n}
    //                             onClick={() => redirectUrl(`/products?tags=${n}`, props.history)}
    //                         />
    //                     )
    //                 }

    //             </Grid>
    //         </Grid>
    //     )
    // };

    const {classes, width} = props;



    const renderShopInfo = () => <div>
        <div className={classes.shopInfo}>
            <h6 className={classes.shopName}>{props.shopInfo.name}</h6>
            <p className={classes.shopDesc}>{props.shopInfo.description}</p>
        </div>
        <div>
            <SocialIcon type={'facebook'}/>
            <SocialIcon type={'youtube'}/>
            <SocialIcon type={'twitter'}/>
            <SocialIcon type={'reddit'}/>
            <SocialIcon type={'whatsapp'}/>
        </div>
    </div>;




    return <div
        className={classes.root}
        style={{
            padding: `25px ${isWidthUp('lg', width) ? 9 : 5}%`
        }}
    >
        {renderShopInfo()}
        
        <div>
            <div><I18nText keyOfI18n={keyOfI18n.FOOTER_FIND_US_ON}/></div>
            <FooterList/>
        </div>

        <div>
            <FooterLanguageBar/>
        </div>
    </div>;
}


export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(withWidth()(Footer)))