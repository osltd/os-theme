import React from 'react';
import {Grid, Typography} from '@material-ui/core';
import List from '../Widget/List'
import Header from '../Layout/Body/Header'
import classNames from 'classnames';
import {connect} from 'react-redux'
import {EDIT_PRODUCT_VIEW_MODE, PRODUCT_EDIT_FILTER, PRODUCT_EDIT_SORT} from "../../constants/actionType";
import {withStyles} from '@material-ui/core/styles';
import WhiteDropDown from '../Widget/WhiteDropDown'
import ProductOverviewListForm from '../Widget/Product/overviewList'
import {arrayToFilter, getTagsCountsArray, numberToPagination, refactorTextLength, sort_by} from "../../api/ApiUtils";
import ProductOverviewBox from '../Widget/Product/overviewBox'

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
    }
})

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
    }
)

class ShopOverview extends React.Component {


    sortData = () => {
        let data = Array.from(this.props.products)
        data = data.filter(n => (this.props.filter.tag) ? !!n.tags.find(k => k === this.props.filter.tag) : true)
        let sortBy = () => {
            switch (this.props.sort.sortBy) {
                case 'Name A-Z':
                    return data.sort(sort_by('name', null))
                case 'Name Z-A':
                    return data.sort(sort_by('name', null, true))
                case 'Price Low to High':
                    return data.sort((a, b) => {
                            let priceA = a.variants[0] ? a.variants[0].price : 0
                            let priceB = b.variants[0] ? b.variants[0].price : 0
                            return (priceA < priceB) ? -1 : 1
                        }
                    )
                case       'Price High to Low':
                    return data.sort((a, b) => {
                            let priceA = a.variants[0] ? a.variants[0].price : 0
                            let priceB = b.variants[0] ? b.variants[0].price : 0
                            return (priceA > priceB) ? -1 : 1
                        }
                    )
                default:
                    return data
            }
        }
        return sortBy()

    }
    getProductProperty = (products, type) => {
        switch (type) {
            case 'display':
                if (this.props.sort.page) {
                    let range = this.props.sort.page.split(' - ')
                    return products.filter((n, i) => (i >= range[0] - 1 && i <= range[1] - 1))

                }
                return products
            case 'length':
                return products.length

        }
    }
    initPageNumber = length =>
        this.props.editProductSort('page', numberToPagination(length, null)[0].label)


    render() {

        const {classes} = this.props
        const products = this.sortData()

        const filterOptions = ['Name A-Z', 'Name Z-A', 'Price Low to High', 'Price High to Low']
        return (
            <Grid container justify={'center'}>
                <Grid item sm={12}>
                    <Header
                        title={'shop'}
                        route={'home/shop'}

                    />
                </Grid>
                <Grid item lg={10} container>
                    <Grid item xs={12} lg={3}>
                        <List
                            data={getTagsCountsArray(this.props.products, (tag, number) => {
                                this.props.editProductFilter('tag', tag)
                                this.initPageNumber(number)
                            })}
                            selectedValue={this.props.filter.tag}
                            title={'PRODUCT CATEGORIES'}
                        />

                    </Grid>
                    <Grid item sm={12} lg={9}>
                        <Grid item container xs={12} alignItems={'center'} className={classes.toolBar}>
                            <Grid item xs={4}>
                                <span
                                    onClick={() => this.props.changeViewMode('form')}
                                    className={classNames(classes.icon, 'icon-table')}/>
                                <span
                                    onClick={() => this.props.changeViewMode('list')}
                                    className={classNames('icon-list', classes.icon)}/>
                            </Grid>
                            <Grid item xs={4} container alignItems={'center'} direction={'row'}>
                                <Grid item>
                                    <Typography variant={'body2'}>
                                        Items
                                    </Typography>

                                </Grid>
                                <Grid item>

                                    {
                                        products.length > 0 && <WhiteDropDown
                                            options={
                                                numberToPagination(this.getProductProperty(products, 'length'),
                                                    page => this.props.editProductSort('page', page))}
                                            selectedValue={this.props.sort.page}
                                        />
                                    }


                                </Grid>
                                <Grid item>
                                    <Typography variant={'body2'}>
                                        of {this.getProductProperty(products, 'length')}
                                    </Typography>
                                </Grid>
                            </Grid>
                            <Grid item container xs={4} alignItems={'center'} direction={'row'}>

                                <Grid item>
                                    <Typography variant={'body2'}>
                                        sort by
                                    </Typography>
                                </Grid>
                                <Grid item>

                                    <WhiteDropDown
                                        options={
                                            arrayToFilter(
                                                filterOptions, value => {
                                                    this.props.editProductSort('sortBy', value)
                                                    this.initPageNumber(this.getProductProperty(this.sortData(), 'length'))
                                                }
                                            )}
                                        selectedValue={this.props.sort.sortBy}

                                    />
                                </Grid>
                            </Grid>
                        </Grid>
                        <Grid item container className={classes.listMode}>

                            {this.props.viewMode === 'form' ?

                                this.getProductProperty(products, 'display').map((n, i) =>
                                    <Grid item xs={3} key={i}
                                    >
                                        <ProductOverviewBox
                                            name={refactorTextLength(n.name)}
                                            id={n.id}
                                            src={n.photos[0].url}
                                            category={n.tags}
                                            regPrice={n.variants[0] ? n.variants[0].price : 'not a reg price'}
                                            promotePrice={n.promotePrice}
                                        />
                                    </Grid>
                                )

                                :
                                this.getProductProperty(products, 'display').map((n, i) => (<ProductOverviewListForm
                                    key={i}
                                    src={n.photos[0].url}
                                    name={refactorTextLength(n.name)}
                                    category={n.category}
                                    regPrice={n.variants[0] ? n.variants[0].price : 'not a reg price'}
                                    promotePrice={n.promotePrice}
                                    description={n.description}
                                    id={n.id}
                                />))}
                        </Grid>

                    </Grid>

                </Grid>
            </Grid>
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(ShopOverview))