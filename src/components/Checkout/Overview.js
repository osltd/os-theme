import React, {Fragment} from 'react';
import {Divider, Grid, Typography} from '@material-ui/core';
import Header from '../Layout/Body/Header'
import {connect} from 'react-redux'
import {EDIT_PRODUCT_VIEW_MODE, PRODUCT_EDIT_FILTER, PRODUCT_EDIT_SORT} from "../../constants/actionType";
import {withStyles} from '@material-ui/core/styles';
import OrderSummary from './OrderSummary'
import BillingDetails from './BillingDetails'
import withWidth, {isWidthUp} from "@material-ui/core/withWidth/index";
import Collapse from '../Widget/Collapse'

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
    }, title: {
        padding: '30px'
    }
})

const mapStateToProps = state => ({
    shoppingCart: state.cart.shoppingCart,
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


    render() {

        const {classes} = this.props

        return (
            <Grid container justify={'center'}>
                <Grid item sm={12}>
                    <Header title={'Checkout'}/>
                </Grid>
                <Grid item container justify={'center'} spacing={32} md={10}>

                    {(isWidthUp('md', this.props.width)) ?
                        (<Fragment>
                            <Grid item xs={6}>
                                <Typography
                                    className={classes.title}
                                    variant={'display1'}>
                                    Your Order Summary
                                </Typography>
                                <Divider/>
                                <OrderSummary/>
                            </Grid>
                            <Grid item xs={6}>
                                <Typography
                                    className={classes.title}
                                    variant={'display1'}>
                                    Billing Details

                                </Typography>
                                <Divider/>
                                <BillingDetails/>
                            </Grid>
                        </Fragment>)
                        : (<Fragment>
                            <Grid item xs={11}>
                                <Collapse
                                    arrow={true}
                                    title={<Fragment>
                                        <Typography
                                            className={classes.title}
                                            variant={'display1'}>
                                            Your Order Summary
                                        </Typography>

                                        <Divider/>
                                    </Fragment>}
                                    collapse={
                                        <OrderSummary/>

                                    }
                                />
                            </Grid>
                            <Grid item xs={11}>
                                <Typography
                                    className={classes.title}
                                    variant={'display1'}>
                                    Billing Details

                                </Typography>
                                <Divider/>
                                <BillingDetails/>

                            </Grid>
                        </Fragment>)

                    }
                </Grid>


            </Grid>
        );
    }
}

export default withWidth()(connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(ShopOverview)))