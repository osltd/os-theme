import React, {useEffect, useRef} from 'react';
import {connect} from 'react-redux';
import NumberFormat from 'react-number-format';
import _ from 'lodash';
import agent from '../../agent';
import classNames from 'classnames';
import Header from '../Layout/Body/Header'
import {EDIT_PRODUCT_VIEW_MODE, LOAD_PRODUCTS, PRODUCT_EDIT_FILTER, PRODUCT_EDIT_SORT, PRODUCT_IS_LOADING} from "../../constants/actionType";
import LoadingPage from '../Layout/LoadingPage'
import styles from './product.style';
import {
    getTagsCountsArray,
    redirectUrl,
} from "../../api/ApiUtils";
import {keyOfI18n} from "../../constants/locale/interface";
import {I18nText} from "../Widget/I18nText";

const filterOptions = [
    {
        key : 'nameAsc',
        element : <I18nText keyOfI18n={keyOfI18n.SHOP_SORT_NAME_ASC}/>
    },
    {
        key : 'nameDes',
        element : <I18nText keyOfI18n={keyOfI18n.SHOP_SORT_NAME_DES}/>
    },
    {
        key : 'priceAsc',
        element : <I18nText keyOfI18n={keyOfI18n.SHOP_SORT_PRICE_ASC}/>
    },
    {
        key : 'priceDes',
        element : <I18nText keyOfI18n={keyOfI18n.SHOP_SORT_PRICE_DES}/>
    },
    {
        key : 'clear',
        element : <I18nText keyOfI18n={keyOfI18n.SHOP_SORT_CLEAR}/>
    },
];

const mapStateToProps = state => ({
    products: state.product.products,
    viewMode: state.product.viewMode,
    sort: state.product.sort,
    filter: state.product.filter,
    productIsLoading : state.product.productIsLoading
});


const mapDispatchToProps = dispatch => ({
    changeViewMode: (mode) => dispatch({
        type: EDIT_PRODUCT_VIEW_MODE,
        payload: mode,
    }),
    editProductSort: (key) => dispatch({
        type: PRODUCT_EDIT_SORT,
        payload: {
            key : "sortBy",
            value : key
        }
    }),
    editProductFilter: (key, value) => dispatch({
        type: PRODUCT_EDIT_FILTER,
        payload: {
            key: key,
            value: value
        }
    }),
    closeSortOptions: e => {
        var parent = e.target;
        while (parent && !/^sortSelect-/i.test(parent.className)) parent = parent.parentNode;
        if (parent) {
            var target = Object.values(parent.childNodes).filter(c => /^sortOptions-/i.test(c.className))[0];
            if (target) target.style.display = !/^block$/i.test(target.style.display) ? 'block' : 'none';
        }
    },
    loadProducts: async (page, currentProducts) => {
        // fetch products
        let products = await agent.Products.loadProducts(page);
        // append products
        if(products.length){
            dispatch({
                type : LOAD_PRODUCTS,
                payload : currentProducts.concat(products)
            });
        }
    }
});


const ShopOverview = props => {

    const classes = styles();
    var products = [...(props.products || [])];

    // init
    if(!products.length){
        // load products
        props.loadProducts(1, []);
    }

    // ----------- has sorting?
    if(props.sort.sortBy && props.sort.sortBy.length && !/^clear$/.test(props.sort.sortBy)){
        products = products.sort((a, b) => {
            if(/^nameAsc$/.test(props.sort.sortBy)){
                return a.name > b.name;
            } else 
            if(/^nameDes$/.test(props.sort.sortBy)){
                return a.name < b.name;
            } else 
            if(/^priceAsc$/.test(props.sort.sortBy)){
                return a.price > b.price;
            } else 
            if(/^priceDes$/.test(props.sort.sortBy)){
                return a.price < b.price;
            }
        });
    } else {
        // filter cleared, clone original array
        products = [...(props.products || [])];
    }

    // ----------- has filter?
    if(props.filter.tag){
        products = products.filter(p => p.tags.includes(props.filter.tag));
    }

    // ----------------------------------------------------------------  Menu ----------------------------------------------------------------
    const renderMenu = () => <div className={classes.menu}>
        <ul key="menu" className={classes.categoryList}>
            {getTagsCountsArray(props.products || [])
            .reduce((unique, item) => unique.map(i => (i.value || "").toLowerCase()).includes((item.value || "").toLowerCase()) ? unique : [...unique, item], [])
            .map((t, i) => (
                <button
                    type="button"
                    style={{border: ((props.filter || {}).tag || '') == t.value ? "1px solid black" : "none"}}
                    className={classes.menuItem}
                    onClick={() => { 
                        console.log(props.filter);
                        props.editProductFilter('tag', t.value); 
                    }}
                >
                    {t.label.toUpperCase()}
                </button>
            ))}
        </ul>
    </div>;
    // ----------------------------------------------------------------  /Menu ----------------------------------------------------------------

    // ----------------------------------------------------------------  Product List ----------------------------------------------------------------

    const renderProductList = () => <div className={classes.list}>
        {/* ------------------ Top bar ------------------ */}
        <div key="product-list" className={classes.topbar}>
            <div className={classes.modes}>
                <button
                    type="button"
                    onClick={() => props.changeViewMode('form')}
                    className={classNames(classes.icon, 'icon-table')}
                />
                <button
                    type="button"
                    onClick={() => props.changeViewMode('list')}
                    className={classNames('icon-list', classes.icon)}
                />
            </div>
            <div className={classes.status}>
                {/* <I18nText keyOfI18n={keyOfI18n.ITEMS}/>&nbsp;
                <I18nText keyOfI18n={keyOfI18n.OF}/> */}
            </div>
            <div className={classes.sortSelect}>
                <div style={{display:'flex', flexDirection:'row', alignItems:'center'}}>
                    {props.sort.sortBy && !/^clear$/.test(props.sort.sortBy) ? filterOptions.filter(o => o.key == props.sort.sortBy)[0].element : null}
                    <button type="button" 
                            onClick={props.closeSortOptions} 
                            className={classNames('icon-filter', classes.icon)} >
                    </button>
                </div>
                <ul className={classes.sortOptions}>
                    {filterOptions.map(o => (<li>
                        <button type="button" onClick={(e) => {
                            props.editProductSort(o.key); 
                            // close
                            props.closeSortOptions(e);
                        }}>
                            {o.element}
                        </button>
                    </li>))}
                </ul>
            </div>
        </div>
        {/* ------------------ /Top bar ------------------ */}


        {/* ------------------ product list ------------------ */}
        <div className={classes.context}>
            {/^form$/.test(props.viewMode) ? renderProductGrids() : renderProductRows()}
            <div className={classes.loadMoreBtnWrapper}>
                <button onClick={() => {
                    props.loadProducts(Math.ceil((props.products || []).length/15) + 1, products);
                }}>
                    <I18nText keyOfI18n={keyOfI18n.LOAD_MORE}/>
                </button>
            </div>
        </div>
        {/* ------------------ /product list ------------------ */}
    </div>;

    


    /**
     * 
     *  ------------------------------- LIST -------------------------------
     *  @function renderProductRows
     * 
     */
    const renderProductRows = function(){
        return products.map((n, i) => {
            const media = (n.media || []).filter(m => /^(jpe?g|png|gif|bmp|mp4|qt|mov)$/i.test(m.ext));
            const variants = n.variants || [];
            const prices = [n.price].concat(n.variants.map(v => v.price)).filter((p, i, a) => a.indexOf(p) == i).sort((a, b) => a - b);
            
            return <button
                key={i}
                type="button"
                className={classes.rowItem}
                onClick={() => redirectUrl('/products/' + n.id, props.history)}
            >
                <div className={classes.rowItemMedia}>
                    <img src={(function(){
                        // preset thumbnail url
                        var thumbnail = '/notFound/not-found-image.jpg';
                        // has media?
                        if(media.length && media[0].url){
                            thumbnail = media[0].url.replace('.cloud/','.cloud/380xAUTO/');
                        } else {
                            // get from variants
                            variants.forEach(v => {
                                if(v.media.length > 0 && thumbnail == '/notFound/not-found-image.jpg'){
                                    thumbnail = v.media[0].url;
                                }
                            });
                        }
                        return thumbnail;
                    })()} width="100%"/>
                </div>
                <div className={classes.rowItemInfo}>
                    {/* ---- Name ----- */}
                    <div className={classes.rowItemName}>
                        {n.name}
                    </div>
                    {/* ----- stock status ------ */}
                    <div className={classes.stockStatus}>
                        {
                            (n.variants || []).map(v => v.stock).reduce((c, o) => (c+o), 0) <= 0 ?
                            <span style={{ color : "#e0674f" }}>
                                <i><I18nText keyOfI18n={keyOfI18n.PRODUCT_DETAIL_OUT_OF_STOCK}/></i>
                            </span> :
                            null
                        }
                    </div>
                    {/* ---- media ----- */}
                    <div className={classes.rowItemPrice}>
                        {(function(){
                            if(prices.length > 1){
                                return (
                                    <span>
                                        <NumberFormat
                                            value={prices[0]}
                                            thousandSeparator={true}
                                            prefix={'HK$'}
                                            displayType={'text'}
                                            renderText={v => v}
                                        /> -&nbsp;
                                        <NumberFormat
                                            value={prices[prices.length - 1]}
                                            thousandSeparator={true}
                                            prefix={'HK$'}
                                            displayType={'text'}
                                            renderText={v => v}
                                        />
                                    </span>
                                );
                            } else {
                                return <span>
                                    <NumberFormat
                                        value={prices[0]}
                                        thousandSeparator={true}
                                        prefix={'HK$'}
                                        displayType={'text'}
                                        renderText={v => v}
                                    />
                                </span>
                            }
                        })()}
                    </div>
                    {/* ---- Description ----- */}
                    {(n.description || "").trim().length ? <div className={classes.rowItemDescription}>
                        {(n.description || "").length > 80 ? n.description.substr(0,100) + "..." : n.description}
                    </div> : null}
                    {/* ---- tags ----- */}
                    {n.tags.length ? <div className={classes.tags}>#{n.tags.join(' #')}</div> : null}
                </div>
            </button>;
        });
    };



    /**
     * 
     *  ------------------------------- GRID -------------------------------
     * 
     */
    const renderProductGrids = function(){
        return products.map((n, i) => {
            const media = (n.media || []).filter(m => /^(jpe?g|png|gif|bmp|mp4|qt|mov)$/i.test(m.ext));
            const variants = n.variants || [];
            const prices = [n.price].concat(n.variants.map(v => v.price)).filter((p, i, a) => a.indexOf(p) == i).sort((a, b) => a - b);
            
            return <button
                key={i}
                type="button"
                className={classes.item}
                onClick={() => redirectUrl('/products/' + n.id, props.history)}
            >
                <div className={classes.media}>
                    <img src={(function(){
                        // preset thumbnail url
                        var thumbnail = '/notFound/not-found-image.jpg';
                        // has media?
                        if(media.length && media[0].url){
                            thumbnail = media[0].url.replace('.cloud/','.cloud/380xAUTO/');
                        } else {
                            // get from variants
                            variants.forEach(v => {
                                if(v.media.length > 0 && thumbnail == '/notFound/not-found-image.jpg'){
                                    thumbnail = v.media[0].url;
                                }
                            });
                        }
                        return thumbnail;
                    })()} width="100%"/>
                </div>
                <div className={classes.name}>
                    {n.name}
                </div>
                {/* ----- stock status ------ */}
                <div className={classes.stockStatus}>
                    <span style={{ color : "#e0674f" }}>
                        {
                            (n.variants || []).map(v => v.stock).reduce((c, o) => (c+o), 0) <= 0 ?
                            <i><I18nText keyOfI18n={keyOfI18n.PRODUCT_DETAIL_OUT_OF_STOCK}/></i> :
                            <i>&nbsp;</i>
                        }
                    </span>
                </div>
                <div className={classes.price}>
                    {(function(){
                        if(prices.length > 1){
                            return (
                                <span>
                                    <NumberFormat
                                        value={prices[0]}
                                        thousandSeparator={true}
                                        prefix={'HK$'}
                                        displayType={'text'}
                                        renderText={v => v}
                                    /> -&nbsp;
                                    <NumberFormat
                                        value={prices[prices.length - 1]}
                                        thousandSeparator={true}
                                        prefix={'HK$'}
                                        displayType={'text'}
                                        renderText={v => v}
                                    />
                                </span>
                            );
                        } else {
                            return <span>
                                <NumberFormat
                                    value={prices[0]}
                                    thousandSeparator={true}
                                    prefix={'HK$'}
                                    displayType={'text'}
                                    renderText={v => v}
                                />
                            </span>
                        }
                    })()}
                </div>
                {n.tags.length ? <div className={classes.tags}>#{n.tags.join(' #')}</div> : null}
            </button>;
        });
    };



    // ----------------------------------------------------------------  Product List ----------------------------------------------------------------

    return <div>
        <Header
            title={<I18nText keyOfI18n={keyOfI18n.SHOP}/>}
            route={'home/shop'}
        />
        <div className={classes.wrapper}>
            {
                !products.length ?
                <LoadingPage/> 
                :
                [renderMenu(), renderProductList()]
            }
        </div>
    </div>;
};

export default connect(mapStateToProps, mapDispatchToProps)(ShopOverview)