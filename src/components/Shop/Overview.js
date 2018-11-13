import React from 'react';
import {Grid, Typography} from '@material-ui/core';
import List from '../Widget/List'
import Header from '../Layout/Body/Header'
import classNames from 'classnames';
import {connect} from 'react-redux'
import {EDIT_PRODUCT_VIEW_MODE} from "../../constants/actionType";
import {withStyles} from '@material-ui/core/styles';
import WhiteDropDown from '../Widget/WhiteDropDown'
import ProductOverviewListForm from '../Widget/Product/overviewList'
import {arrayToPagination, refactorTextLength} from "../../api/ApiUtils";
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
    feeds: state.feed.feeds,
    category: state.category.category,
    viewMode: state.product.viewMode
});


const mapDispatchToProps = dispatch => ({

        changeViewMode: (mode) =>
            dispatch({
                    type: EDIT_PRODUCT_VIEW_MODE,
                    payload: mode,
                }
            )
        ,
    }
)

class ResponsiveDialog extends React.Component {

    render() {
        const {classes} = this.props
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
                            data={this.props.products}
                            title={'PRODUCT CATEGORIES'}
                        />
                        <List
                            data={this.props.products}
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
                                    this.props.products.length>0 &&  <WhiteDropDown
                                        options={
                                            arrayToPagination(this.props.products,cd=>console.log(cd))}
                                    />
                                }


                                </Grid>
                                <Grid item>
                                    <Typography variant={'body2'}>
                                        of {this.props.products.length}
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
                                        options={[
                                            {label: 'Name A-Z', onClick: () => console.log('Name A-Z')}, {
                                                label: 'Name Z-A', onClick: () => console.log('Name A-Z'),

                                            }, {
                                                label: 'Price Low to High', onClick: () => console.log('Name A-Z'),

                                            }, {
                                                label: 'Price High to Low', onClick: () => console.log('Name A-Z'),
                                            }
                                        ]}
                                    />
                                </Grid>
                            </Grid>
                        </Grid>
                        {this.props.viewMode === 'form' ?
                            <Grid item container>

                                {this.props.products.map((n, i) =>
                                    <Grid item xs={3}>
                                        <ProductOverviewBox
                                            name={refactorTextLength(n.name)}
                                            id={n.id}

                                            src={n.photos[0].url}
                                            category={n.category}
                                            regPrice={n.variants[0] ? n.variants[0].price : 'not a reg price'}
                                            promotePrice={n.promotePrice}
                                            key={i}


                                        />
                                    </Grid>
                                )}

                            </Grid>
                            : <Grid className={classes.listMode}>
                                {this.props.products.map((n, i) => (<ProductOverviewListForm
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
                        }
                    </Grid>

                </Grid>
            </Grid>
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(ResponsiveDialog))