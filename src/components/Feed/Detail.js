import React, {useState} from 'react';
import {createUseStyles} from 'react-jss';
import {connect} from 'react-redux';

import moment from 'moment';

import Header from '../Layout/Body/Header';
import List from '../Widget/List'
import {getTagsCountsArray, redirectUrl, refactorTextLength} from "../../api/ApiUtils";
import {FEED_EDIT_FILTER} from "../../constants/actionType";
import LoadingPage from '../Layout/LoadingPage'
import Media from '../Widget/Media'
import classNames from 'classnames'
import ReactHtmlParser from "react-html-parser";
import {useI18nText} from "../../hooks/useI18nText";
import {keyOfI18n} from "../../constants/locale/interface";
import {I18nText} from "../Widget/I18nText";


const styles = createUseStyles({
    // for desktop & tablet
    wrapper: {
        padding: '0 9%'
    },
    navigator: {
        marginBottom: 45
    },
    viewer: {
        display: 'flex'
    },
    menu: {
        width: '25%'
    },
    content: {
        width: 'calc(75% - 50px)',
        marginLeft: 50
    },

    categoryList: {
        display: 'block',
        listStyle: 'none',
        padding: 0,
        margin: 0,
        '& > li:first-child > button': {
            borderTop: '1px solid rgb(169, 169, 169)'
        }
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

    menuHead: {
        display: 'flex'
    },
    menuTitle: {
        flex: 1,
        fontFamily: '-apple-system,BlinkMacSystemFont,sans-serif',
        fontSize: 19,
        fontWeight: 400,
        padding: 0,
        marginTop: 0,
        backgroundColor: 'transparent'
    },
    menuItem: {
        width: '100%',
        color: '#000',
        listStyle: 'none',
        borderBottom: '1px solid rgb(169, 169, 169)',
        borderLeftWidth: 0,
        borderRightWidth: 0,
        borderTopWidth: 0,
        textTransform: 'uppercase',
        backgroundColor: 'transparent',
        margin: 0,
        cursor: 'pointer',
        padding: 10,
        textAlign: 'left',
        fontFamily: '-apple-system,BlinkMacSystemFont,sans-serif',
        fontSize: 14,
        '&:hover': {
            backgroundColor: '#f4f4f4'
        }
    },

    head: {
        display: 'flex',
        marginBottom: 25
    },
    share: {
        flex: 1,
        fontFamily: '-apple-system,BlinkMacSystemFont,sans-serif'
    },
    date: {
        fontFamily: '-apple-system,BlinkMacSystemFont,sans-serif'
    },
    section: {
        marginTop: 60,
        '&:first-child': {
            marginTop: 0
        }
    },
    title: {
        fontFamily: '-apple-system,BlinkMacSystemFont,sans-serif'
    },
    description: {
        fontFamily: '-apple-system,BlinkMacSystemFont,sans-serif'
    },

    // for mobile
    '@media (max-width: 600px)': {
        wrapper: {
            padding: '0 5%'
        },
        viewer: {
            display: 'block'
        },
        menu: {
            display: 'none'
        },
        content: {
            width: '100%',
            marginLeft: 0
        }
    }  
});


const mapStateToProps = state => ({
    feeds   : state.feed.feeds,
    products: state.product.products,
});


const mapDispatchToProps = dispatch => ({
        editFeedFilter: (key, value) => dispatch({
            type: FEED_EDIT_FILTER,
            payload: {
                key: key,
                value: value,
            },
        })
    }
);

const FeedDetail = (props) => {
    const classes = styles();

    const {feeds, match, editFeedFilter, history} = props;
    const feed = feeds ? feeds.find(n => n.id.toString() === match.params.id) : null;

    if (feeds == undefined) return <LoadingPage/>;
    if (!feed) return null;


    const renderMenu = () => <div className={classes.menu}>
        <div>
            <div className={classes.menuHead}>
                <h3 className={classes.menuTitle}>
                    <I18nText keyOfI18n={keyOfI18n.FEED_CATEGORY}/>
                </h3>
            </div>
            <ul className={classes.categoryList}>
                {getTagsCountsArray(feeds, tag => editFeedFilter('tag', tag)).map((t, i) => <li key={i}>
                    <button
                        type="button"
                        className={classes.menuItem}
                    >{t.label}</button>
                </li>)}
            </ul>
        </div>
    </div>;
    const renderContent = () => <div className={classes.content}>
        <div className={classes.head}>
            <div className={classes.share}>
                <i className={'icon-icons8-edit'}/>&nbsp;
                {useI18nText(keyOfI18n.NO_AUTHORS)}
            </div>
            <div className={classes.date}>
                <i className={'icon-icons8-calendar'}/>&nbsp;
                {moment(feed.time).format('MMM Do YYYY')}
            </div>
        </div>
        <div>
            {feed.sections.map((n, i) => <section
                key={i}
                className={classes.section}
            >
                {i ? <h2 className={classes.title}>{n.title}</h2> : null}
                <Media data={feed.sections[i].medias}/>
                <p className={classes.description}>{ReactHtmlParser(n.description)}</p>
            </section>)}
        </div>
    </div>;


    return <div>
        <Header title={refactorTextLength(feed.sections[0].title)}/>
        <div className={classes.wrapper}>
            <div className={classes.navigator}>
                <button
                    type="button"
                    className={classes.backArrow}
                    onClick={() => redirectUrl('/articles', history)}
                >
                    <i className={classNames('icon-circle-left', classes.backIcon)}/>&nbsp;
                    <b><I18nText keyOfI18n={keyOfI18n.FEED_DETAIL_BACK_TO_FEED_LIST}/></b>
                </button>
            </div>
            <div className={classes.viewer}>
                {renderMenu()}
                {renderContent()}
            </div>
        </div>
    </div>;
};


export default connect(mapStateToProps, mapDispatchToProps)(FeedDetail)

