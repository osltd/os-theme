import React, {useEffect, useRef} from 'react';
import {createUseStyles} from 'react-jss';
import {connect} from 'react-redux';

import NumberFormat from 'react-number-format';
import _ from 'lodash';
import classNames from 'classnames';
import LazyLoad from 'react-lazy-load';



import {Grid, Typography} from '@material-ui/core';
import List from '../Widget/List'
import Header from '../Layout/Body/Header'

import {EDIT_PRODUCT_VIEW_MODE, PRODUCT_EDIT_FILTER, PRODUCT_EDIT_SORT} from "../../constants/actionType";
import {withStyles} from '@material-ui/core/styles';
import WhiteDropDown from '../Widget/DropDown'
import LoadingPage from '../Layout/LoadingPage'

import ProductOverviewListForm from '../Widget/Product/overviewList'
import {
    arrayToFilter,
    getTagsCountsArray,
    redirectUrl,
    handleImgValid,
    numberToPagination,
    refactorTextLength,

} from "../../api/ApiUtils";
import ProductOverviewBox from '../Widget/Product/overviewBox'
import withWidth, {isWidthUp} from "@material-ui/core/withWidth/index";
import PopUp from '../Widget/PopUp'
import {keyOfI18n} from "../../constants/locale/interface";
import {I18nText} from "../Widget/I18nText";

const filterOptions = [<I18nText keyOfI18n={keyOfI18n.SHOP_SORT_NAME_ASC}/>,
    <I18nText keyOfI18n={keyOfI18n.SHOP_SORT_NAME_DES}/>, <I18nText keyOfI18n={keyOfI18n.SHOP_SORT_PRICE_ASC}/>,
    <I18nText keyOfI18n={keyOfI18n.SHOP_SORT_PRICE_DES}/>];


const styles = createUseStyles({
    wrapper: {
        display: 'flex',
        padding: '0 9%'
    },


    menu: {
        width: '25%'
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
    categoryList: {
        listStyle: 'none',
        padding: 0,
        margin: 0,
        '& > li:first-child > button': {
            borderTop: '1px solid rgb(169, 169, 169)'
        }
    },


    list: {
        width: 'calc(75% - 35px)',
        marginLeft: 35
    },
    topbar: {
        display: 'flex',
        borderTop: '1px solid rgb(169, 169, 169)',
        borderBottom: '1px solid rgb(169, 169, 169)',
        padding: '5px 0',
        alignItems: 'center',
        '& > div': {
            flex: 1
        },
        '& > div:nth-child(2)': {
            flex: 2.5
        }
    },
    modes: {
        '& > button': {
            marginLeft: 5,
            border: '1px solid #eee',
            backgroundColor: '#f7f7f7'
        },
        '& > button:first-child': {
            marginLeft: 0
        }
    },
    icon: {
        padding: 10,
        cursor: 'pointer',
        alignItems: 'center',
        border: '1px solid black',
    },
    status: {
        fontFamily: '-apple-system,BlinkMacSystemFont,sans-serif',
        textAlign: 'center',
        textTransform: 'uppercase'
    },
    sort: {
        fontFamily: '-apple-system,BlinkMacSystemFont,sans-serif',
        textAlign: 'right',
        textTransform: 'uppercase'
    },
    context: {
        display: 'flex',
        flexWrap: 'wrap'
    },
    item: {
        width: 'calc(33.3% - 50px)',
        backgroundColor: 'transparent',
        flexBasis: 'auto',
        margin: 25,
        padding: '10px 15px',
        cursor: 'pointer',
        border: '1px solid #fff',
        '&:hover': {
            borderColor: '#ededed'
        }
    },
    tags: {
        fontFamily: '-apple-system,BlinkMacSystemFont,sans-serif',
        fontSize: 13,
        color: 'rgb(169, 169, 169)',
        wordBreak: 'break-word'
    },
    name: {
        margin: '3px 0 15px',
        padding: 0
    },
    media: {
        marginBottom: 15,
        '& > img': {
            width: '100%'
        }
    },
    price: {
        '& > span > b': {
            fontWeight: 400,
            fontSize: 12,
            color: '#333'
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

        topbar: {
            display: 'none'
        },

        categoryList: {
            display: 'none',
            marginBottom: 20
        },

        menuTool: {
            display: 'block',
            transform: 'rotate(270deg)',
            paddingTop: 45
        },

        item: {
            width: 'calc(50% - 50px)',
            padding: 0
        },
        name: {
            fontSize: 14
        }
    }
});


const mapStateToProps = state => ({
    products: state.product.products,
    viewMode: state.product.viewMode,
    sort: state.product.sort,
    filter: state.product.filter,
});


const mapDispatchToProps = dispatch => ({

    changeViewMode: (mode) =>
        dispatch({
                type: EDIT_PRODUCT_VIEW_MODE,
                payload: mode,
            }
        )
    ,
    editProductSort: (key, value) => dispatch({
        type: PRODUCT_EDIT_SORT,
        payload: {
            key: key,
            value: value,
        },
    }),
    editProductFilter: (key, value) => dispatch({
        type: PRODUCT_EDIT_FILTER,
        payload: {
            key: key,
            value: value,
        },
    }),
});


const ShopOverview = props => {
    const classes = styles();
    const products = props.products;


    const renderMenu = () => <div className={classes.menu}>
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
                {getTagsCountsArray(products, tag => props.editProductFilter('tag', tag)).map((t, i) => <li key={i}>
                    <button
                        type="button"
                        className={classes.menuItem}
                    >{t.label}</button>
                </li>)}
            </ul>
        </div>
    </div>;
    const renderList = () => <div className={classes.list}>
        <div className={classes.topbar}>
            <div className={classes.modes}>
                <button
                    type="button"
                    // onClick={() => props.changeViewMode('form')}
                    className={classNames(classes.icon, 'icon-table')}
                />
                <button
                    type="button"
                    // onClick={() => props.changeViewMode('list')}
                    className={classNames('icon-list', classes.icon)}
                />
            </div>
            <div className={classes.status}>
                <I18nText keyOfI18n={keyOfI18n.ITEMS}/>
                <I18nText keyOfI18n={keyOfI18n.OF}/>
            </div>
            <div className={classes.sort}>
                <I18nText keyOfI18n={keyOfI18n.SORT_BY}/>
            </div>
        </div>
        <div className={classes.context}>
            {products == undefined ? <LoadingPage/> : products.map((n, i) => {
                const media = (n.media || []).filter(m => /^(jpe?g|png|gif|bmp|mp4|qt|mov)$/i.test(m.ext));
                const prices = [n.price].concat(n.variants.map(v => v.price)).filter((p, i, a) => a.indexOf(p) == i).sort((a, b) => a - b);
                return <button
                    key={i}
                    type="button"
                    className={classes.item}
                    onClick={() => redirectUrl('/products/' + n.id, props.history)}
                >
                    <div className={classes.media}>
                        <LazyLoad>
                            <img src={media.length > 0 ? media[0].url : '/notFound/not-found-image.jpg'} width="100%"/>
                        </LazyLoad>
                    </div>
                    <div className={classes.tags}>{n.tags.join(',')}</div>
                    <h5 className={classes.name}>{n.name}</h5>
                    <div className={classes.price}>{prices.length > 1 ? <span>
                        <NumberFormat
                            value={prices[0]}
                            thousandSeparator={true}
                            prefix={'HK$'}
                            displayType={'text'}
                            renderText={v => <b>{v}</b>}
                        />&nbsp;
                        -&nbsp;
                        <NumberFormat
                            value={prices[prices.length - 1]}
                            thousandSeparator={true}
                            prefix={'HK$'}
                            displayType={'text'}
                            renderText={v => <b>{v}</b>}
                        />
                    </span> : <span>
                        <NumberFormat
                            value={prices[0]}
                            thousandSeparator={true}
                            prefix={'HK$'}
                            displayType={'text'}
                            renderText={v => <b>{v}</b>}
                        />
                    </span>}</div>
                </button>;
            })}
        </div>
    </div>;


    return <div>
        <Header
            title={<I18nText keyOfI18n={keyOfI18n.SHOP}/>}
            route={'home/shop'}
        />
        <div className={classes.wrapper}>
            {renderMenu()}
            {renderList()}
        </div>
    </div>;
};

export default connect(mapStateToProps, mapDispatchToProps)(ShopOverview)