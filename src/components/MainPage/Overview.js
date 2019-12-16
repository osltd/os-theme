import React, {useEffect} from 'react';
import {createUseStyles} from 'react-jss';
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';

import h2p from 'html2plaintext';

import {
    ARTICLE_INIT_FEATURED,
    ARTICLE_INIT_TIPS
} from '../../constants/actionType';
import agent from '../../agent';


const styles = createUseStyles({
    featuredItems: {
        display: 'flex',
        padding: '0 9%'
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
    featuredItems: state.collection.items,
    featuredArticles: state.feed.featuredArticles,
    tips: state.feed.tips
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
    }
});


const MainPageOverview = props => {
    const classes = styles();
    const {featuredItems, featuredArticles, tips, history} = props;

    useEffect(() => {
        if (featuredArticles === undefined) props.initFeaturedArticles();
        if (tips === undefined) props.initTips();
        return () => {

        };
    }, [featuredArticles, tips]);

    return <div>
        <div>
            {(featuredArticles || []).map((article, idx) => <li
                key={idx}
                style={{
                    backgroundImage: `url(${article.sections[0].media[0].url})`,
                    backgroundSize: 'cover',
                    height: 390
                }}
            >
                
            </li>)}
        </div>
        <br/><br/><br/>
        <ul
            style={{
                padding: '0 3%',
                margin: 0,
                display: 'flex',
                flexWrap: 'wrap'
            }}
        >
            {(tips || []).map((article, idx) => <li
                key={idx}
                style={{
                    display: 'flex',
                    width: 'calc(50% - 20px)',
                    backgroundColor: '#f7f7f7',
                    margin: 10
                }}
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
        <br/><br/><br/>
        <div className={classes.featuredItems}>
            {featuredItems.map((item, idx) => <button
                key={idx}
                type="button"
                onClick={() => history.push(`/products/${item.id}`)}
            >{item.name}</button>)}
        </div>
    </div>;
};


export default connect(mapStateToProps, mapDispatchToProps)(withRouter(MainPageOverview))