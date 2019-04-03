import React, {useContext, useEffect, useState} from 'react'
import {Grid, Theme, Typography} from '@material-ui/core'
import LoadingPage from '../Layout/LoadingPage'
import Pagination from './Sections/nonToner/Sections/Pagination'
import {initFilter, sortData} from "./Effect"
import {makeStyles} from "@material-ui/styles"
import Header from './Sections/Header'
import {filterOptions, viewModeType} from "../../constants/enum"
import {arrayToFilter, getTagsCountsArray} from "../../api/ApiUtils"
import DropDown from '../Widget/DropDown'
import NotToner from './Sections/nonToner'
import {RouteComponentProps} from "react-router"
import {reducer} from "../../context";
import Toner from './Sections/Toner'
import SectionsWrapper from "../Layout/SectionsWrapper";

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
    const [viewMode, setViewMode] = useState(viewModeType.FORM);
    const [tag, setTag] = useState(initFilter(history.location.search));
    const [sortBy, setSortBy] = useState(filterOptions.NAME_ASC);
    const [page, setPage] = useState('');
    useEffect(() => setTag(initFilter(history.location.search)), [props.location.search]);
    const {productReducer} = useContext(reducer);
    let {products} = productReducer.state;

    //if haven't get api response
    if (products === undefined) return <LoadingPage/>;
    //remove rent
    products = products.filter(n => !n.tags.includes('rent'));
    let sortedProduct = sortData(products, tag, sortBy);
    const hasProductsToShow = products.length > 0;

    let tagList = getTagsCountsArray(products, (n: string) => {
        if (n !== tag) {
            setPage('')
        }
        setTag(n)
    });

    //remove "all" tag
    if (tagList.length > 1) tagList.shift();
    tagList = tagList.filter(n => n.value !== 'sell' && n.value !== '');
    let getBody = () => {
        switch (true) {
            case !hasProductsToShow:
                return <Typography variant={'subtitle1'}> there are no products available yet</Typography>;
            case tag === 'toner':
                return <Toner products={sortedProduct}/>;

            default :
                return <Grid item xs={12}>
                    <Grid item container xs={12} alignItems={'center'} justify={'space-between'}
                          direction={'row'}
                          className={classes.toolBar}>
                        <SectionsWrapper
                            children={(<>
                                <Grid item xs={6} container alignItems={'center'} direction={'row'}>
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
                                <Grid item xs={6} container alignItems={'center'} direction={'row'}>

                                    <Grid item>
                                        <Typography variant={'body1'}>
                                            sort by
                                        </Typography>
                                    </Grid>
                                    <Grid item>
                                        <DropDown

                                            options={arrayToFilter(
                                            [filterOptions.NAME_ASC, filterOptions.NAME_DES,
                                                filterOptions.PRICE_ASC, filterOptions.PRICE_DES], (n: filterOptions) => {
                                                setSortBy(n);
                                                setPage('')
                                            })}
                                                  selectedValue={sortBy}
                                        />
                                    </Grid>
                                </Grid></>)}
                        />

                    </Grid>
                    <SectionsWrapper
                        children={(<NotToner products={sortedProduct} tag={tag} viewMode={viewMode}/>)}
                    />
                </Grid>
        }
    };
    return (
        <Grid container justify={'center'}>
            <Grid item xs={12}>
                <Header data={tagList} tag={tag}/>
            </Grid>
            {getBody()}
        </Grid>
    )
};

export default React.memo(ShopOverview)