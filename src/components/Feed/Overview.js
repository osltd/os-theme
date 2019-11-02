import React from 'react';
import {createUseStyles} from 'react-jss';
import {connect} from 'react-redux';

import _ from 'lodash';
import moment from 'moment';
import h2p from 'html2plaintext';




import withWidth, {isWidthUp} from '@material-ui/core/withWidth/index';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ExpandLessIcon from '@material-ui/icons/ExpandLess';




import FeedOverviewBox from '../Widget/Feed/overviewBox'
import Header from '../Layout/Body/Header'
import Media from '../Widget/Media'
import List from '../Widget/List'
import SearchBar from '../Widget/SearchBar/original'
import {getTagsCountsArray, refactorTextLength} from "../../api/ApiUtils";

import Gallery from './Gallery'
import {FEED_EDIT_FILTER} from "../../constants/actionType";
import LoadingPage from '../Layout/LoadingPage'
import {I18nText} from "../Widget/I18nText";
import {keyOfI18n} from "../../constants/locale/interface";
import {useI18nText} from "../../hooks/useI18nText";
import {redirectUrl} from "../../api/ApiUtils";



const styles = createUseStyles({
    // for desktop & tablet
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
        margin: 0,
        borderWidth: 0,
        width: 25,
        height: 25,
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
        padding: 0
    },
    
    '@media (max-width: 1279px)': {
        item: {
            width: '100%'
        }
    },

    // for mobile
    '@media (max-width: 600px)': {
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
            transform: 'rotate(270deg)'
        }
    }
});


const mapStateToProps = state => ({
    feeds: state.feed.feeds,
    sort: state.feed.sort,
    filter: state.feed.filter,

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
                    className={classes.menuTool}
                    onClick={e => {
                        const categoryList = e.target.parentNode.parentNode.nextSibling;
                        const btn = e.target.nodeName == 'I' ? e.target.parentNode : e.target;
                        const value = window.getComputedStyle(categoryList).getPropertyValue('display') == 'none' ? 'block' : 'none';
                        categoryList.style.display = value;
                        btn.classList[{
                            none: 'remove',
                            block: 'add'
                        }[value]](classes.opened);
                    }}
                >
                    <i className={'icon-play3'}/>
                </button>
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
                return <button
                    key={i}
                    type="button"
                    className={classes.item}
                    onClick={() => redirectUrl('/articles/' + n.id, props.history)}
                >
                    {(n.sections[0].media || []).length > 0 && <Media
                        box={true}
                        data={n.sections[0].media}
                    />}
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

    return <div>
        <Header/>
        <div className={classes.wrapper}>
            {renderMenu()}
            {renderList()}
        </div>
    </div>;
};

export default connect(mapStateToProps, mapDispatchToProps)(ResponsiveDialog)