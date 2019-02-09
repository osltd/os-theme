import React, {useContext, useEffect, useState} from 'react';
import {Grid, Theme, Typography, WithStyles} from '@material-ui/core';
import LoadingPage from '../Layout/LoadingPage'
import {Reducer} from '../../store/store'
import Pagination from './Sections/Pagination'
import {initFilter, sortData} from "./Effect";
import {useTheme} from "@material-ui/styles";
import {unstable_useMediaQuery as useMediaQuery} from '@material-ui/core/useMediaQuery'
import {Breakpoint} from "@material-ui/core/styles/createBreakpoints";
import Header from '../Layout/Body/Header'
import {breakpoints, filterOptions, viewModeType} from "../../constants/enum"
import TagList from './Sections/TagList'
import {arrayToFilter, getTagsCountsArray} from "../../api/ApiUtils";
import classNames from 'classnames'
import DropDown from '../Widget/DropDown'
import ProductsList from './Sections/ProductsList'
import createStyles from "@material-ui/core/styles/createStyles";
import {RouteComponentProps} from "react-router";
import {makeStyles} from "@material-ui/styles";

const useStyles  =makeStyles( (theme: Theme) =>{
    console.log('this should be the theme')

    console.log(theme)

    return ({
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
})})
type Props = RouteComponentProps

const ShopOverview: React.FunctionComponent<Props> = props => {

    const classes = useStyles()
    const theme: Theme = useTheme();
    const isWidthUp = (breakpoint: Breakpoint): boolean => useMediaQuery(theme.breakpoints.up(breakpoint));
    const [viewMode, setViewMode] = useState(viewModeType.FORM);
    const [tag, setTag] = useState('');
    const [sortBy, setSortBy] = useState(filterOptions.NAME_ASC);
    const [page, setPage] = useState('');
    const {state, dispatch} = useContext(Reducer);

    let products = state.products;
    if (products === undefined) return <LoadingPage/>;

    let sortedProduct = sortData(products, tag, sortBy);

    const hasProductsToShow = products.length > 0;


    const {history} = props;
    useEffect(() => initFilter(
        history.location.search,
        tag,
        x => setTag(x)
    ), []);


    return (
        <Grid container justify={'center'}>
            <Grid item xs={12}>
                <Header
                    title={'shop'}
                />
            </Grid>

            {
                hasProductsToShow ?
                    <Grid item lg={10} spacing={isWidthUp(breakpoints.md) ? 16 : 0} container>
                        {
                            isWidthUp(breakpoints.md) ?
                                <Grid item md={3}>
                                    <Typography variant={'h6'}>
                                        PRODUCT CATEGORIES
                                    </Typography>
                                    <TagList data={getTagsCountsArray(products, (n: string) => {
                                        console.log(tag);
                                        console.log(n
                                        );
                                        if (n !== tag) {
                                            setPage('')

                                        }
                                        console.log(`new page is ${page}`);
                                        setTag(n)

                                    })}
                                             tag={tag}/>
                                </Grid> : null
                        }
                        <Grid item xs={12} md={9}>
                            <Grid item container xs={12} alignItems={'center'} justify={'space-between'}
                                  direction={'row'}
                                  className={classes.toolBar}>
                                <Grid item xs={2}>
                            <span
                                onClick={() => setViewMode(viewModeType.FORM)}
                                className={classNames(classes.icon, 'icon-table')}/>
                                    <span
                                        onClick={() => setViewMode(viewModeType.LIST)}
                                        className={classNames('icon-list', classes.icon)}/>
                                </Grid>
                                <Grid item xs={3} container alignItems={'center'} direction={'row'}>
                                    <Grid item>
                                        <Typography variant={'body1'}>
                                            Items
                                        </Typography>
                                    </Grid>
                                    <Grid item>
                                        <Pagination length={sortedProduct.length} onClick={(n: string) => setPage(n)}
                                                    page={page}/>

                                    </Grid>
                                    <Grid item>
                                        <Typography variant={'body1'}>
                                            of {sortedProduct.length}
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
                                        <DropDown options={arrayToFilter(
                                            [filterOptions.NAME_ASC, filterOptions.NAME_DES,
                                                filterOptions.PRICE_ASC, filterOptions.PRICE_DES], (n: filterOptions) => {
                                                setSortBy(n);
                                                setPage('')
                                            }
                                        )


                                        }
                                                  selectedValue={sortBy}
                                        />
                                    </Grid>
                                </Grid>
                                {
                                    isWidthUp(breakpoints.md) ? null : <Grid item>

                                    </Grid>
                                }
                            </Grid>
                            <ProductsList products={sortedProduct} tag={tag} viewMode={viewMode}/>
                        </Grid>
                    </Grid>
                    :
                    <Typography variant={'subtitle1'}> there are no products available yet</Typography>


            }
        </Grid>
    );
};

export default (ShopOverview)