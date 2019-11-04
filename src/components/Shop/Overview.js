import React, {useEffect, useRef} from 'react';
import {createUseStyles} from 'react-jss';
import {connect} from 'react-redux';





import {Grid, Typography} from '@material-ui/core';
import List from '../Widget/List'
import Header from '../Layout/Body/Header'
import classNames from 'classnames';

import {EDIT_PRODUCT_VIEW_MODE, PRODUCT_EDIT_FILTER, PRODUCT_EDIT_SORT} from "../../constants/actionType";
import {withStyles} from '@material-ui/core/styles';
import WhiteDropDown from '../Widget/DropDown'
import LoadingPage from '../Layout/LoadingPage'
import _ from 'lodash'
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
        color: 'rgb(169, 169, 169)'
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
        fontSize: 12,
        color: '#333'
    },


    // for mobile
    '@media (max-width: 600px)': {
        wrapper: {
            padding: '0 5%'
        }
    },











    productCategory: {
        backgroundColor: '#F7F7F7',
    },
    toolBar: {
        padding: '10px',
        // backgroundColor: theme.palette.background.paper,
    },
    icon: {
        padding: '10px',
        cursor: 'pointer',
        alignItems: 'center',
        border: '1px solid black',

    }, listMode: {
        padding: '20px',
    },
    array: {
        paddingLeft: '5px',
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
    // let initFilter = () => {
    //     let query = props.history.location.search;
    //     let isTags = (query.slice(_.lastIndexOf(query, '?'), _.lastIndexOf(query, '=') + 1).indexOf('tags') !== -1);
    //     let queryTag = query.slice(_.lastIndexOf(query, '=') + 1, query.length);
    //     if (isTags && props.filter.tag !== queryTag) props.editProductFilter('tag', queryTag)

    // };

    // let sortData = () => {

    //     let data = Array.from(props.products);
    //     data = data.filter(n => (props.filter.tag) ? !!n.tags.find(k => k === props.filter.tag) : true);
    //     let sortBy = () => {
    //         const sort = filterOptions.NAME_ASC
    //         switch (sort) {
    //             case filterOptions.NAME_ASC:
    //                 return data.sort((a, b) => a.name < b.name ? -1 : a.name > b.name ? 1 : 0);
    //             case filterOptions.NAME_DES:
    //                 return data.sort((a, b) => (a.name < b.name ? -1 : a.name > b.name ? 1 : 0) * -1);
    //             case filterOptions.PRICE_ASC:
    //                 return data.sort((a, b) => {
    //                         let priceA = a.variants[0] ? a.variants[0].price : 0;
    //                         let priceB = b.variants[0] ? b.variants[0].price : 0;
    //                         return (priceA < priceB) ? -1 : 1
    //                     }
    //                 );
    //             case filterOptions.PRICE_DES:
    //                 return data.sort((a, b) => {
    //                         let priceA = a.variants[0] ? a.variants[0].price : 0;
    //                         let priceB = b.variants[0] ? b.variants[0].price : 0;
    //                         return (priceA > priceB) ? -1 : 1
    //                     }
    //                 );
    //             default:
    //                 return data
    //         }
    //     };
    //     return sortBy()

    // };
    // let getProductProperty = (products, type) => {
    //     switch (type) {
    //         case 'display':
    //             if (props.sort.page) {
    //                 let range = props.sort.page.split(' - ');
    //                 return products.filter((n, i) => (i >= range[0] - 1 && i <= range[1] - 1))

    //             }
    //             return products;
    //         case 'length':
    //             return products.length

    //     }
    // };
    // let initPageNumber = length => props.editProductSort('page', numberToPagination(length, null)[0].label);

    // let getPagination = (products) => {
    //     if (products.length === 0) return null;
    //     let options = numberToPagination(getProductProperty(products, 'length'),
    //         page => props.editProductSort('page', page));
    //     //todo('have error of Warning: Cannot update during an existing state transition (such as within `render`). Render methods should be a pure function of props and state.")

    //     if (props.sort.page === '' && (!(_.isEmpty(options[0].label))))

    //         props.editProductSort('page', options[0].label);
    //     return (<WhiteDropDown
    //         options={options}
    //         selectedValue={props.sort.page}
    //     />)
    // };
    // let getProductsList = (products) => {


    //     if (products.length === 0) {
    //         return <Typography variant={'subtitle1'}> <I18nText keyOfI18n={keyOfI18n.THERE_ARE_NO_PRODUCTS_UNDER}/>
    //             <strong>{
    //                 props.filter.tag
    //             }</strong> <I18nText keyOfI18n={keyOfI18n.CATEGORY_YET}/></Typography>


    //     }


    //     return props.viewMode === 'form' ?

    //         getProductProperty(products, 'display').map((n, i) =>
    //             <Grid item xs={12} sm={6} md={4} key={i}
    //             >
    //                 <ProductOverviewBox
    //                     name={refactorTextLength(n.name)}
    //                     id={n.id}
    //                     src={handleImgValid(n.photos[0])}
    //                     category={n.tags}
    //                     regPrice={n.variants[0] ? n.variants[0].price : 'not a reg price'}
    //                     promotePrice={n.promotePrice}
    //                 />
    //             </Grid>
    //         ) : getProductProperty(products, 'display').map((n, i) => (<ProductOverviewListForm
    //             key={i}
    //             src={handleImgValid(n.photos[0])}
    //             name={refactorTextLength(n.name)}
    //             category={n.tags}
    //             regPrice={n.variants[0] ? n.variants[0].price : <I18nText keyOfI18n={keyOfI18n.NOT_A_REG_PRICE}/>}
    //             promotePrice={n.promotePrice}
    //             description={n.description}
    //             id={n.id}
    //         />))
    // };

    // let popUp = useRef();
    // useEffect(() => initFilter());
    // const {classes} = props;
    // if (props.products === null) return <LoadingPage/>;


    // const products = sortData();
    // const isMobile = !isWidthUp('sm', props.width);
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
                        <img src={media.length > 0 ? media[0].url : '/notFound/not-found-image.jpg'}/> 
                    </div>
                    <div className={classes.tags}>{n.tags.join(',')}</div>
                    <h5 className={classes.name}>{n.name}</h5>
                    <div className={classes.price}>HK${prices.length > 1 ? `${prices[0]} - HK$${prices[prices.length - 1]}` : prices[0]}</div>
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
        {/* <div
            style={{
                ...(isMobile ? {
                    marginTop: 25
                } : {
                    display: 'flex'
                }),
                padding: `0 ${isWidthUp('lg', props.width) ? 9 : 5}%`
            }}
        >
            <div className={isMobile ? '' : classes.list}>
                <Grid item container xs={12} alignItems={'center'} justify={'space-between'}
                        direction={'row'}
                        className={classes.toolBar}>
                    <Grid item xs={6} md={2}>
                    <span
                        onClick={() => props.changeViewMode('form')}
                        className={classNames(classes.icon, 'icon-table')}/>
                        <span
                            onClick={() => props.changeViewMode('list')}
                            className={classNames('icon-list', classes.icon)}/>
                    </Grid>
                    <Grid item xs={6} md={3} container alignItems={'center'} direction={'row'}>
                        <Grid item>
                            <Typography variant={'body1'}>
                                <I18nText keyOfI18n={keyOfI18n.ITEMS}/>
                            </Typography>
                        </Grid>
                        <Grid item>
                            {
                                getPagination(products)
                            }
                        </Grid>
                        <Grid item>
                            <Typography variant={'body1'}>
                                {<I18nText
                                    keyOfI18n={keyOfI18n.OF}/>} {getProductProperty(products, 'length')}
                            </Typography>
                        </Grid>
                    </Grid>
                    <Grid item xs={6} md={3} container alignItems={'center'} direction={'row'}>

                        <Grid item>
                            <Typography variant={'body1'}>
                                <I18nText keyOfI18n={keyOfI18n.SORT_BY}/>
                            </Typography>
                        </Grid>
                        <Grid item>

                            
                        </Grid>
                    </Grid>
                    {
                        isWidthUp('md', props.width) ? null : <Grid xs={6} item>
                            <PopUp
                                innerRef={e => popUp = e}
                                title={
                                    <Grid container alignItems={'center'}>
                                        <Typography variant={'body1'}>
                                            {props.filter.tag ? <Typography
                                                    variant={'body1'}>{'tags:' + props.filter.tag}</Typography> :
                                                <I18nText keyOfI18n={keyOfI18n.PRODUCT_CATEGORY}/>}
                                        </Typography>
                                        <span className={classes.array + ' ' + 'icon-circle-down'}/>
                                    </Grid>

                                }
                                // popUp={getTagsList()}
                            />

                        </Grid>
                    }
                </Grid>

                <Grid item container className={classes.listMode}>
                    {
                        getProductsList(products)
                    }
                </Grid>
            </div>
        </div> */}
    </div>;
};

export default connect(mapStateToProps, mapDispatchToProps)(ShopOverview)