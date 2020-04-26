import React, {useEffect, useState} from 'react';
import styles from './mainpage.style';
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';
import h2p from 'html2plaintext';
import {CircularProgress} from '@material-ui/core';
import {
    ARTICLE_INIT_FEATURED,
    ARTICLE_INIT_TIPS,
    MERCHANDISE_INIT_FEATURED,
    LOAD_BEST_SELLERS
} from '../../constants/actionType';
import agent from '../../agent';
import {I18nText} from "../Widget/I18nText";
import {keyOfI18n} from "../../constants/locale/interface";
import {redirectUrl} from "../../api/ApiUtils";


const mapStateToProps = state => ({
    featuredMerchandises: state.product.featuredMerchandises,
    featuredArticles: state.feed.featuredArticles,
    tips: state.feed.tips,
    shopInfo: state.common.shopInfo,
    bestSellers: state.product.bestSellers,
    feeds : state.feed.feeds
});


const mapDispatchToProps = dispatch => ({
    initBestSellers: () => {
        agent.Products.getBestSellers()
        .then(res => dispatch({
            type    : LOAD_BEST_SELLERS,
            payload : res.data.data.rows || []
        }))
        .catch(err => {})
    },
    substring: str => {
        return `${str.substr(0, 130)}...`;
    }
});


const MainPageOverview = props => {

    const classes = styles();
    const {featuredMerchandises, featuredArticles, tips, history, shopInfo, bestSellers, feeds} = props;

    let [refreshing, setRefreshing] = useState(false);

    useEffect(() => {
        if( bestSellers === undefined) props.initBestSellers();
        return () => {};
    }, [featuredArticles, tips, featuredMerchandises]);

    return <div>

        {/* --------------------- HEADLINE ------------------------ */}
        {
            (feeds || []).length > 0 && 
            <div>
                <li
                    style={{
                        height: 500,
                        display: 'flex',
                        alignItems: 'flex-end',
                        justifyContent: 'flex-end',
                        cursor : "pointer",
                        position: 'relative'
                    }}
                    onClick={() => redirectUrl('/articles/' + feeds[0].id, props.history)}
                >
                    <img
                        style={{
                            objectFit : "cover",
                            width : "100%",
                            height : "100%"
                        }} 
                        src={feeds[0].sections[0].media[0].url}
                    />
                    <span
                        style={{
                            position : "absolute",
                            textShadow: '0px 1px 4px #000',
                            color: '#fff',
                            fontSize: 15,
                            fontSize : "2em",
                            bottom: 10,
                            right: 15
                        }}
                    >{feeds[0].sections[0].title}</span>
                </li>
            </div>
        }
        

        {/* --------------------- ARTICLES ------------------------ */}
        {(feeds || []).length > 1 && <div className={classes.tips}>
            <h2 style={{ fontSize: 21, fontFamily: '-apple-system,BlinkMacSystemFont,sans-serif', paddingLeft : "15px"}}>
                <I18nText keyOfI18n={keyOfI18n.LATEST_INFO}/>
            </h2>
            <div className={classes.tipsWrapper}>
                {[...feeds].slice(1, 5).map((article, idx) => <li
                    key={idx}
                    className={classes.tipsItem}
                    onClick={() => redirectUrl('/articles/' + article.id, props.history)}
                >
                    {(article.sections[0] || {}).media.length > 0 && <div
                        style={{
                            flex: 4,
                            height: 250,
                            backgroundImage: `url(${article.sections[0].media[0].url})`,
                            backgroundSize: 'cover',
                            backgroundPosition: 'center',
                            cursor : "pointer"
                        }}
                    />}
                    <div
                        style={{
                            flex: 6,
                            display: 'flex',
                            flexDirection: 'column',
                            padding: 25,
                            alignItems: 'center',
                            justifyContent: 'center'
                        }}
                    >
                        <h5
                            style={{
                                margin: 0
                            }}
                        >{article.sections[0].title}</h5>
                        <p>{props.substring(h2p(article.sections[0].description))}</p>
                    </div>
                </li>)}
            </div>
        </div>}


        {/* ------------------- Featured Products --------------------- */}
        {(featuredMerchandises || []).length > 0 && <div className={classes.featuredMerchandises}>
            <h2 style={{ fontSize: 21, fontFamily: '-apple-system,BlinkMacSystemFont,sans-serif', paddingLeft : "15px" }}>
                <I18nText keyOfI18n={keyOfI18n.FEATURED_PRODUCTS}/>
            </h2>
            <div className={classes.featuredMerchandisesWrapper}>
                {featuredMerchandises.map((item, idx) => <button
                    key={idx}
                    type="button"
                    className={classes.featuredMerchandisesItem}
                    onClick={() => history.push(`/products/${item.id}`)}
                >
                    <div
                        style={{
                            backgroundImage: `url(${((((item.variants||[])[0]||{}).media||[])[0]||{}).url})`,
                            backgroundPosition: 'top center',
                            backgroundSize: 'cover',
                            height: 280
                        }}
                    />
                    <br/>
                    <div>
                        <div className={classes.itemName}>{item.name}</div>
                        <div className={classes.itemPrice}>{`${shopInfo.currency.toUpperCase()} ${[((item.variants||[])[0]||{}).price,((item.variants||[])[(item.variants||[]).length-1]||{}).price].join('-')}`}</div>
                    </div>
                </button>)}
            </div>
        </div>}



        {/* ------------------- Hot Sales Products --------------------- */}
        {(bestSellers || []).length > 0 && <div className={classes.featuredMerchandises}>
            <h2 style={{ fontSize: 21, fontFamily: '-apple-system,BlinkMacSystemFont,sans-serif', paddingLeft : "15px" }}>
                <I18nText keyOfI18n={keyOfI18n.BEST_SELLERS}/>
            </h2>
            <ul className={classes.featuredMerchandisesWrapper}>
                {[...bestSellers].slice(0, 5).map((item, idx) => <button
                    key={idx}
                    type="button"
                    className={classes.featuredMerchandisesItem}
                    onClick={() => history.push(`/products/${item.id}`)}
                >
                    <div
                        style={{
                            backgroundImage: `url(${((((item.variants||[])[0]||{}).media||[])[0]||{}).url})`,
                            backgroundPosition: 'center',
                            backgroundSize: 'contain',
                            backgroundRepeat : "no-repeat",
                            width : "100%",
                            height: 280,
                            marginBottom : "15px"
                        }}
                    />
                    <br/>
                    <div className={classes.itemName}>{item.name}</div>
                    <div className={classes.itemPrice}>{`${((shopInfo || {}).currency || 'HKD').toUpperCase()} ${item.price}`}</div>
                </button>)}
            </ul>
        </div>}

        
    </div>;
};


export default connect(mapStateToProps, mapDispatchToProps)(withRouter(MainPageOverview))