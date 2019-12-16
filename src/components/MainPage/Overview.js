import React, {useEffect} from 'react';
import {createUseStyles} from 'react-jss';
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';

import h2p from 'html2plaintext';

import {
    ARTICLE_INIT_FEATURED,
    ARTICLE_INIT_TIPS,
    MERCHANDISE_INIT_FEATURED
} from '../../constants/actionType';
import agent from '../../agent';


const styles = createUseStyles({
    featuredMerchandises: {
        padding: '0 3%'
    },
    featuredMerchandisesWrapper: {
        display: 'flex',
        margin: 0,
        padding: 0
    },
    featuredMerchandisesItem: {
        width: 'calc(20% - 20px)',
        margin: 10,
        backgroundColor: 'transparent',
        borderWidth: 0,
        cursor: 'pointer'
    },

    tips: {
        padding: '0 3%'
    },
    tipsWrapper: {
        margin: 0,
        display: 'flex',
        flexWrap: 'wrap',
        padding: 0
    },
    tipsItem: {
        display: 'flex',
        width: 'calc(50% - 20px)',
        backgroundColor: '#f7f7f7',
        margin: 10
    }
    
    // section: {
    //     width: '100%',
    //     margin: '0 80px'
    // },
    // productCategory: {
    //     paddingTop: '40px',

    //     paddingBottom: '40px',
    //     // backgroundColor: theme.palette.background.paper
    // },
    // text: {
    //     textAlign: 'center',
    //     // color: theme.palette.secondary.light,
    //     marginBottom: '30px',
    //     wordWrap: 'break-word',
    //     wordBreak: 'break-all'

    // },
    // title: {
    //     paddingTop: '20px',
    //     marginTop: '50px',
    //     fontWeight: '700',
    //     // color: theme.palette.primary.dark,
    //     marginBottom: '20px',
    //     textAlign: 'center'
    // }
});


const mapStateToProps = state => ({
    featuredMerchandises: state.product.featuredMerchandises,
    featuredArticles: state.feed.featuredArticles,
    tips: state.feed.tips,
    shopInfo: state.common.shopInfo
});


const mapDispatchToProps = dispatch => ({
    initFeaturedArticles: () => {
        try {
            agent.Feeds.getFeaturedArticles()
            .then(res => {
                dispatch({
                    type    : ARTICLE_INIT_FEATURED,
                    payload : res.data.data.rows || []
                })
            })
            .catch(err => {

            })
        } catch(err) {

        }
    },
    initTips: () => {
        try {
            agent.Feeds.getTips()
            .then(res => {
                dispatch({
                    type    : ARTICLE_INIT_TIPS,
                    payload : res.data.data.rows || []
                })
            })
            .catch(err => {

            })
        } catch(err) {

        }
    },
    initFeaturedMerchandises: () => {
        try {
            agent.Products.getFeaturedMerchandises()
            .then(res => {
                dispatch({
                    type    : MERCHANDISE_INIT_FEATURED,
                    payload : res.data.data.rows || []
                })
            })
            .catch(err => {

            })
        } catch(err) {

        }
    }
});


const MainPageOverview = props => {
    const classes = styles();
    const {featuredMerchandises, featuredArticles, tips, history, shopInfo} = props;

    useEffect(() => {
        if (featuredArticles === undefined) props.initFeaturedArticles();
        if (tips === undefined) props.initTips();
        if (featuredMerchandises === undefined) props.initFeaturedMerchandises();
        return () => {

        };
    }, [featuredArticles, tips, featuredMerchandises]);

    return <div>
        <div>
            {(featuredArticles || []).map((article, idx) => <li
                key={idx}
                style={{
                    backgroundImage: `url(${article.sections[0].media[0].url})`,
                    backgroundSize: 'cover',
                    height: 390,
                    display: 'flex',
                    alignItems: 'flex-end',
                    justifyContent: 'flex-end'
                }}
            >
                <span
                    style={{
                        textShadow: '0px 1px 4px #000',
                        color: '#fff',
                        fontSize: 15,
                        margin: 15
                    }}
                >{article.sections[0].title}</span>
            </li>)}
        </div>

        <br/><br/><br/><br/>

        <div className={classes.tips}>
            <h2 style={{ fontSize: 21, fontFamily: '-apple-system,BlinkMacSystemFont,sans-serif' }}>Latest Information</h2>
            <ul className={classes.tipsWrapper}>
                {(tips || []).slice(0, 4).map((article, idx) => <li
                    key={idx}
                    className={classes.tipsItem}
                >
                    {(article.sections[0] || {}).media.length > 0 && <div
                        style={{
                            flex: 4,
                            height: 250,
                            backgroundImage: `url(${article.sections[0].media[0].url})`,
                            backgroundSize: 'cover',
                            backgroundPosition: 'center'
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
                        <p>{h2p(article.sections[0].description)}</p>
                    </div>
                </li>)}
            </ul>
        </div>

        <br/><br/><br/><br/>
        
        <div className={classes.featuredMerchandises}>
            <h2 style={{ fontSize: 21, fontFamily: '-apple-system,BlinkMacSystemFont,sans-serif' }}>Featured Products</h2>
            <ul className={classes.featuredMerchandisesWrapper}>
                {(featuredMerchandises || []).map((item, idx) => <button
                    key={idx}
                    type="button"
                    className={classes.featuredMerchandisesItem}
                    onClick={() => history.push(`/products/${item.id}`)}
                >
                    <div
                        style={{
                            backgroundImage: `url(${item.media[0].url})`,
                            backgroundPosition: 'top center',
                            backgroundSize: 'cover',
                            height: 280
                        }}
                    />
                    <br/>
                    <div>
                        <div>{item.name}</div>
                        <div>{`${item.price} ${shopInfo.currency.toUpperCase()}`}</div>
                    </div>
                </button>)}
            </ul>
        </div>
    </div>;
};


export default connect(mapStateToProps, mapDispatchToProps)(withRouter(MainPageOverview))