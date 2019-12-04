import React from 'react';
import {createUseStyles} from 'react-jss';
import {connect} from 'react-redux';

import _ from 'lodash';
import moment from 'moment';
import h2p from 'html2plaintext';
import classNames from 'classnames';
import LazyLoad from 'react-lazy-load';

import Header from '../Layout/Body/Header';
import SearchBar from '../Widget/SearchBar/original'
import {getTagsCountsArray, refactorTextLength} from "../../api/ApiUtils";

import {FEED_EDIT_FILTER} from "../../constants/actionType";
import LoadingPage from '../Layout/LoadingPage'
import {I18nText} from "../Widget/I18nText";
import {keyOfI18n} from "../../constants/locale/interface";
import {useI18nText} from "../../hooks/useI18nText";
import {redirectUrl} from "../../api/ApiUtils";


const styles = createUseStyles({
    // for desktop & tablet
    feeds: {
        
    },
    wrapper: {
        display: 'flex',
        padding: '0 9%'
    },
    menu: {
        width: '25%'
    },
    list: {
        width: 'calc(75% - 35px)',
        marginLeft: 35,
        display: 'flex',
        flexWrap: 'wrap'
    },
    
    searchBox: {
        marginBottom: 35
    },
    categoryList: {
        listStyle: 'none',
        padding: 0,
        margin: 0,
        '& > li:first-child > button': {
            borderTop: '1px solid rgb(169, 169, 169)'
        }
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
    menuTool: {
        display: 'none',
        transform: 'rotate(90deg)',
        padding: 0,
        margin: '-18px 18px 0 0',
        borderWidth: 0,
        width: 25,
        height: 60,
        cursor: 'pointer',
        backgroundColor: 'transparent'
    },
    opened: {
        transform: 'rotate(90deg) !important'
    },

    placeholder: {
        fontFamily: '-apple-system,BlinkMacSystemFont,sans-serif'
    },
    item: {
        width: 'calc(33.3% - 30px)',
        backgroundColor: 'transparent',
        borderWidth: 0,
        flexBasis: 'auto',
        boxShadow: '0px 1px 2px rgba(0, 0, 0, 0.1)',
        cursor: 'pointer',
        margin: 15,
        padding: 0,
        display: 'flex',
        flexDirection: 'column'
    },
    media: {
        '& > img': {
            width: '100%'
        }
    },
    
    '@media (max-width: 1279px)': {
        item: {
            width: '100%'
        }
    },

    // for mobile
    '@media (max-width: 600px)': {
        feeds: {
            paddingTop: 25,
            '& > div:first-child': {
                display: 'none'
            }
        },
        wrapper: {
            display: 'block',
            padding: '0 5%'
        },
        menu: {
            width: '100%'
        },
        list: {
            width: '100%',
            marginLeft: 0
        },

        categoryList: {
            display: 'none',
            marginBottom: 20
        },

        menuTool: {
            display: 'block',
            transform: 'rotate(270deg)',
            paddingTop: 45
        }
    }
});


const mapStateToProps = state => ({
    feeds: state.feed.feeds,
    sort: state.feed.sort,
    filter: state.feed.filter
});


const mapDispatchToProps = dispatch => ({
        editFeedFilter: (key, value) => dispatch({
            type: FEED_EDIT_FILTER,
            payload: {
                key: key,
                value: value,
            },
        }),

    }
);


const ResponsiveDialog = props => {
    const classes = styles();
    const {feeds} = props;

    const renderMenu = () => <div className={classes.menu}>
        <div className={classes.searchBox}>
            <h3 className={classes.menuTitle}>
                <I18nText keyOfI18n={keyOfI18n.SEARCH}/>
            </h3>
            <div>
                <SearchBar
                    value={props.filter.keyword}
                    // onChange={value => this.onChange(value)}
                    placeholder={useI18nText(keyOfI18n.TYPE_KEYWORDS)}/>
            </div>
        </div>
        <div>
            <div className={classes.menuHead}>
                <h3 className={classes.menuTitle}>
                    <I18nText keyOfI18n={keyOfI18n.FEED_CATEGORY}/>
                </h3>
                <button
                    type="button"
                    className={classNames(classes.menuTool, 'icon-play3')}
                    onClick={e => {
                        const btn = e.target;
                        const categoryList = btn.parentNode.nextSibling;
                        const value = window.getComputedStyle(categoryList).getPropertyValue('display') == 'none' ? 'block' : 'none';
                        categoryList.style.display = value;
                        btn.classList[{
                            none: 'remove',
                            block: 'add'
                        }[value]](classes.opened);
                        btn.style['padding' + {
                            none: 'Top',
                            block: 'Bottom'
                        }[value]] = '45px';
                        btn.style['padding' + {
                            none: 'Bottom',
                            block: 'Top'
                        }[value]] = 0;
                    }}
                ></button>
            </div>
            <ul className={classes.categoryList}>
                {getTagsCountsArray(feeds, tag => props.editFeedFilter('tag', tag)).map((t, i) => <li
                    key={i}
                >
                    <button
                        type="button"
                        className={classes.menuItem}
                    >{t.label}</button>
                </li>)}
            </ul>
        </div>
    </div>;
    const renderList = () => <div className={classes.list}>
        {feeds == undefined ? <LoadingPage/> : (
            feeds.length < 1 ? <p className={classes.placeholder}>
                    <I18nText keyOfI18n={keyOfI18n.NO_POST_AVAILABLE}/>
            </p> : feeds.map((n, i) => {
                const desc = h2p(n.sections[0].description);
                const short = desc.substr(0, 150);
                const media = (n.sections[0].media || []).filter(m => /^(jpe?g|png|gif|bmp|mp4|qt|mov)$/i.test(m.ext));
                return <button
                    key={i}
                    type="button"
                    className={classes.item}
                    onClick={() => redirectUrl('/articles/' + n.id, props.history)}
                >
                    {media.length > 0 && <div className={classes.media}>
                        <LazyLoad>
                            <img src={media[0].url} width="100%"/> 
                        </LazyLoad>
                    </div>}
                    <h5>{n.sections[0].title}</h5>
                    <div>{moment(n.time).format('ll')}</div>
                    <p style={{
                        margin: 0,
                        padding: 15
                    }}>{short == desc ? short : `${short}...`}</p>
                </button>;
            })
        )}
    </div>;

    return <div className={classes.feeds}>
        <Header/>
        <div className={classes.wrapper}>
            {renderMenu()}
            {renderList()}
        </div>
    </div>;
};

export default connect(mapStateToProps, mapDispatchToProps)(ResponsiveDialog)