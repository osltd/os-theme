import React, {useContext, useEffect, useState} from 'react'
import {Grid, Theme, Typography} from '@material-ui/core'
import LoadingPage from '../Layout/LoadingPage'
import Pagination from './Sections/Pagination'
import {initFilter, sortData} from "./Effect"
import {makeStyles} from "@material-ui/styles"
import Header from '../Layout/Body/Header'
import {filterOptions, viewModeType} from "../../constants/enum"
import TagList from './Sections/TagList'
import {arrayToFilter, getTagsCountsArray} from "../../api/ApiUtils"
import classNames from 'classnames'
import DropDown from '../Widget/DropDown'
import ProductsList from './Sections/ProductsList'
import {RouteComponentProps} from "react-router"
import {useThemeWidth} from "../../hooks/useThemeWidth"
import {reducer} from "../../context";

const useStyles = makeStyles((theme: Theme) => ({
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
}));

type Props = RouteComponentProps

const ShopOverview: React.FunctionComponent<Props> = props => {
    const {history} = props;
    const classes = useStyles();
    const themeWidth = useThemeWidth();
    const [viewMode, setViewMode] = useState(viewModeType.FORM);
    const [tag, setTag] = useState(initFilter(history.location.search));
    useEffect(
        () => setTag(initFilter(history.location.search)),
        [props.location.search]
    );
    const [sortBy, setSortBy] = useState(filterOptions.NAME_ASC);
    const [page, setPage] = useState('');
    const {productReducer} = useContext(reducer);
    const {products} = productReducer.state;

    if (products === undefined) return <LoadingPage/>;
    let sortedProduct = sortData(products, tag, sortBy);
    const hasProductsToShow = products.length > 0;

    return (
        <Grid container justify={'center'}>
            <Grid item xs={12}>
                <Header
                    title={'shop'}
                />
            </Grid>

            {
                hasProductsToShow ?
                    <Grid item lg={10} spacing={themeWidth.isWidthUp.md ? 16 : 0} container>
                        {
                            themeWidth.isWidthUp.md ?
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
                                            })}
                                                  selectedValue={sortBy}
                                        />
                                    </Grid>
                                </Grid>
                                {
                                    themeWidth.isWidthUp.md ? null : <Grid item>

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
    )
};

export default React.memo(ShopOverview)