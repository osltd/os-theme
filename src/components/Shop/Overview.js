import React from 'react';
import {Grid, Toolbar, Typography} from '@material-ui/core';
import List from '../Widget/List'
import SlickWithPagination from '../Widget/Slick/WithPagination'
import Header from '../Layout/Body/Header'
import classNames from 'classnames';
import {connect} from 'react-redux'
import {EDIT_PRODUCT_VIEW_MODE} from "../../constants/actionType";
import {withStyles} from '@material-ui/core/styles';
import WhiteDropDown from '../Widget/WhiteDropDown'
import ProductOverviewListForm from '../Widget/Product/overviewList'

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

    },listMode:{
        padding:'20px',
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
                        <Toolbar>
                            <Grid container alignItems={'center'} justify={'space-between'} className={classes.toolBar}>
                                <Grid item>
                                    <span
                                        onClick={() => this.props.changeViewMode('form')}

                                        className={classNames(classes.icon, 'icon-table')}/>
                                    <span
                                        onClick={() => this.props.changeViewMode('list')}

                                        className={classNames('icon-list', classes.icon)}/>
                                </Grid>
                                <Grid item>
                                    <Typography variant={'body2'}>
                                        Items 1 - 9 of 17

                                    </Typography>
                                </Grid>
                                <Grid item container alignItems={'center'} xs={4}>
                                    <Grid item>

                                        <Typography variant={'body2'}>
                                            sort by
                                        </Typography>
                                    </Grid>
                                    <Grid item xs={8}>
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
                        </Toolbar>
                        {this.props.viewMode === 'form' ?
                            <SlickWithPagination
                                data={this.props.products}
                            /> :<Grid className={classes.listMode}>
                                {this.props.products.map((n, i) => (<ProductOverviewListForm
                                    key={i}
                                    src={n.src}
                                    name={n.name}
                                    category={n.category}
                                    regPrice={n.regPrice}
                                    promotePrice={n.promotePrice}
                                    description={n.description}

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