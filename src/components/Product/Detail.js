import React from 'react';
import {createUseStyles} from 'react-jss';
import {connect} from 'react-redux';

import classNames from 'classnames';
import NumberFormat from 'react-number-format';
import {Carousel} from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';

import {redirectUrl} from "../../api/ApiUtils";

import { I18nText } from "../Widget/I18nText";
import { keyOfI18n } from "../../constants/locale/interface";
import SocialIcon from '../Widget/SocialIcon';

import Header from '../Layout/Body/Header';
import LoadingPage from '../Layout/LoadingPage';




import {Grid} from '@material-ui/core';
import {withStyles} from '@material-ui/core/styles';
import withWidth, {isWidthUp} from '@material-ui/core/withWidth/index';


import CommentDescription from './Comment&Description/Overview'
import Detail from './Detail'


const styles = createUseStyles({
    wrapper: {
        padding: '0 9%'
    },
    navigator: {
        marginBottom: 45
    },
    content: {
        display: 'flex',
        flexDirection: 'row-reverse'
    },
    viewer: {
        width: '35%'
    },
    detail: {
        width: '65%'
    },

    backArrow: {
        cursor: 'pointer',
        backgroundColor: 'transparent',
        borderWidth: 0,
        display: 'flex',
        alignItems: 'center',
        padding: 0
    },
    backIcon: {
        fontSize: 20,
        marginRight: 5
    },
    backText: {
        fontFamily: '-apple-system,BlinkMacSystemFont,sans-serif'
    },

    // for mobile
    '@media (max-width: 600px)': {
        wrapper: {
            padding: '0 5%'
        },
        viewer: {
            width: '100%'
        },
        detail: {
            width: '100%'
        },
        content: {
            display: 'block'
        },
    }

    // productCategory: {
    //     backgroundColor: theme.palette.background.paper
    // },
    // toolBar: {
    //     backgroundColor: ''
    // },

});


const mapStateToProps = state => ({
    products: state.product.products,
    feeds: state.feed.feeds,
    category: state.category.category,
});


const mapDispatchToProps = dispatch => ({}
);


// class ResponsiveDialog extends React.Component {
//     hasValidProduct = () => !!this.props.products.find(n => n.id.toString() === this.props.match.params.id);

//     render() {
//         if (!this.props.products) return <LoadingPage/>;
//         const isMobile = !isWidthUp('sm', this.props.width);
//         const product = this.props.products.find(n => n.id.toString() === this.props.match.params.id);
//         const variantOptions = getVariantOptions(product.variants);
//         return <div>
//             {!isMobile && <Header
//                 title={product.name}
//                 route={'HOME/SHOP/SINGLE PRODUCT'}
//             />}

            




            
            





//             <Grid item xs={10}>

//                 <Detail
//                     variantOptions={Object.values(variantOptions)}
//                     variantKeys={Object.keys(variantOptions)}
//                     description={product.description}
//                     product={product}

//                 />


//             </Grid>
//             {
//                 false && <Grid item xs={10} container>
//                     <CommentDescription
//                         content={product.description}
//                     />
//                 </Grid>
//             }

//         </div>;
//     }


// }



const ResponsiveDialog = props => {
    const classes = styles();
    const {products, match, history} = props;
    const product = products ? products.find(n => n.id.toString() === match.params.id) : null;

    if (products == undefined) return <LoadingPage/>;
    if (!product) return null;

    return <div>
        <Header
            title={product.name}
        />
        <div className={classes.wrapper}>
            <div className={classes.navigator}>
                <button
                    type="button"
                    className={classes.backArrow}
                    onClick={() => redirectUrl('/products', history)}
                >
                    <i className={classNames('icon-circle-left', classes.backIcon)}/>&nbsp;
                    <b><I18nText keyOfI18n={keyOfI18n.FEED_DETAIL_BACK_TO_FEED_LIST}/></b>
                </button>
            </div>
            <div className={classes.content}>
                <div className={classes.viewer}>
                    <Carousel>
                        {product.media.map((m, i) => <div key={i}>
                            <img src={m.url}/>
                        </div>)}
                    </Carousel>
                </div>
                <div className={classes.detail}>
                    <div className={classes.price}>
                        <NumberFormat
                            value={product.variants[0].price}
                            thousandSeparator={true}
                            prefix={'HK$'}
                            displayType={'text'}
                            renderText={v => <b>{v}</b>}
                        />
                    </div>
                    <div className={classes.stock}>{product.variants[0].stock > 0 ? 'in stock' : 'out of stock'}</div>
                    <div className={classes.sku}>{product.variants[0].sku}</div>
                    <p className={classes.description}>{product.description}</p>
                    <div className={classes.form}>
                        <div className={classes.qtyGroup}>
                            <input type="number" defaultValue={1}/>
                            <button type="button">
                                <i className={'icon-cart'}/>&nbsp;&nbsp;
                                <I18nText keyOfI18n={keyOfI18n.ADD_TO_CART}/>
                            </button>
                        </div>
                    </div>
                    <div className={classes.tools}>
                        <button
                            type="button"
                        >
                            <span className={'icon-heart'} />
                        </button>
                        <button
                            type="button"
                        >
                            <span className={'icon-mail2'} />
                        </button>
                        <button
                            type="button"
                        >
                            <span className={'icon-coin-dollar'} />
                        </button>
                    </div>
                    <div className={classes.shares}>
                        <h6>
                            <I18nText keyOfI18n={keyOfI18n.PRODUCT_DETAILS_SHARE_THIS_PRODUCT}/>
                        </h6>
                        <div className={classes.shareIcons}>
                            <SocialIcon
                                type={'whatsapp'}
                                onClick={() => window.open('https://web.whatsapp.com/send?text=' + window.location.href)}
                            />
                            <SocialIcon
                                type={'facebook'}
                                onClick={() => window.open('https://www.facebook.com/sharer/sharer.php?u=' + window.location.href)}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>;
};

export default connect(mapStateToProps, mapDispatchToProps)(ResponsiveDialog)