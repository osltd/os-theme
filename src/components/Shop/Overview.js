import React, {useContext, useEffect, useRef, useState} from 'react';
import {Grid, Typography} from '@material-ui/core';
import List from '../Widget/List'
import Header from '../Layout/Body/Header'
import classNames from 'classnames';
import {connect} from 'react-redux'
import {EDIT_PRODUCT_VIEW_MODE, PRODUCT_EDIT_FILTER, PRODUCT_EDIT_SORT} from "../../constants/actionType";
import {withStyles} from '@material-ui/core/styles';
import WhiteDropDown from '../Widget/DropDown'
import LoadingPage from '../Layout/LoadingPage'
import {Store} from '../../store/store'
import Pagination from './Sections/Pagination'
import TagList from './Sections/TagList'
import {
    arrayToFilter,
    getTagsCountsArray,
} from "../../api/ApiUtils";
import withWidth, {isWidthUp} from "@material-ui/core/withWidth/index";
import PopUp from '../Widget/PopUp'
import {sortData, initFilter} from "./Effect";

const styles = theme => ({
    productCategory: {
        backgroundColor: '#F7F7F7',

    },
    toolBar: {
        padding: '10px',
        backgroundColor: theme.palette.background.paper,
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
    const [tag,setTag] = useState('')
    const [sortBy,setSortBy]= useState('')
    const [page,setPage]=useState('')
    const {state, dispatch} = useContext(Store)
    const {classes,history } = props;
    const filterOptions = ['Name A-Z', 'Name Z-A', 'Price Low to High', 'Price High to Low'];
    let getProductProperty = (products, type) => {
        switch (type) {
            case 'display':
                if (props.sort.page) {
                    let range = props.sort.page.split(' - ');
                    return products.filter((n, i) => (i >= range[0] - 1 && i <= range[1] - 1))
                }
                return products
            case 'length':
                return products.length
        }
    };

    useEffect(() => initFilter(
        history.location.search,
        tag,
        x=>setTag(x)
    ), [])
    if (props.products === null) return <LoadingPage/>
    const products = sortData(products,
        )
    const HasProduct = prodtucts.length>0
    return (
        <Grid container justify={'center'}>
            <Grid item xs={12}>
                <Header
                    title={'shop'}
                    route={'home/shop'}
                />
            </Grid>
            {
                props.products.length > 0 ?
                    <Grid item lg={10} spacing={isWidthUp('md', props.width) ? 16 : 0} container>
                        {
                            isWidthUp('md', props.width) ?
                                <Grid item md={3}>
                                    <Typography variant={'h6'}>
                                        PRODUCT CATEGORIES
                                    </Typography>
                                    <TagList
                                       data={getTagsCountsArray(props.products, (tag, number) => {
                                        props.editProductFilter('tag', tag);
                                        initPageNumber(number)
                                    })}
                                    selectedValue={props.filter.tag}
                                        onClick={()=>console.log('gg')}
                                        tag={'11'}
                                    history
                                    />
                                    {getTagsList()}
                                </Grid> : null
                        }
                        <Grid item xs={12} md={9}>
                            <Grid item container xs={12} alignItems={'center'} justify={'space-between'}
                                  direction={'row'}
                                  className={classes.toolBar}>
                                <Grid item xs={2}>
                                <span
                                    onClick={() => props.changeViewMode('form')}
                                    className={classNames(classes.icon, 'icon-table')}/>
                                    <span
                                        onClick={() => props.changeViewMode('list')}
                                        className={classNames('icon-list', classes.icon)}/>
                                </Grid>
                                <Grid item xs={3} container alignItems={'center'} direction={'row'}>
                                    <Grid item>
                                        <Typography variant={'body1'}>
                                            Items
                                        </Typography>
                                    </Grid>
                                    <Grid item>
                                        <Pagination

                                        />
                                    </Grid>
                                    <Grid item>
                                        <Typography variant={'body1'}>
                                            of {getProductProperty(products, 'length')}
                                        </Typography>
                                    </Grid>
                                </Grid>
                                <Grid item xs={3} container alignItems={'center'} direction={'row'}>

                                    <Grid item>
                                        <Typography variant={'body1'}>
                                            sort by
                                        </Typography>
                                    </Grid>
                                    <Grid item>

                                        <WhiteDropDown
                                            options={
                                                arrayToFilter(
                                                    filterOptions, value => {
                                                        props.editProductSort('sortBy', value);
                                                        initPageNumber(getProductProperty(sortData(), 'length'))
                                                    }
                                                )}
                                            selectedValue={props.sort.sortBy}
                                        />
                                    </Grid>
                                </Grid>
                                {
                                    isWidthUp('md', props.width) ? null : <Grid item>
                                        <PopUp
                                            innerRef={e => popUp = e}
                                            title={
                                                <Grid container alignItems={'center'}>
                                                    <Typography variant={'body1'}>
                                                        {props.filter.tag ? <Typography
                                                            variant={'body1'}>{'tags:' + props.filter.tag}</Typography> : 'Product Category'}
                                                    </Typography>
                                                    <span className={classes.array + ' ' + 'icon-circle-down'}/>
                                                </Grid>

                                            }
                                            popUp={getTagsList()}
                                        />

                                    </Grid>
                                }
                            </Grid>
                            <Grid item container className={classes.listMode}>
                                {
                                    getProductsList(products)
                                }
                            </Grid>
                        </Grid>
                    </Grid> :
                    <Typography variant={'subtitle1'}> there are no products available yet</Typography>
            }
        </Grid>
    );
};

export default withWidth()(connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(ShopOverview)))