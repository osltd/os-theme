import React, {Fragment} from 'react';
import {Button, Divider, Grid, Typography} from '@material-ui/core';
import Header from '../Layout/Body/Header'
import {connect} from 'react-redux'
import {EDIT_PRODUCT_VIEW_MODE, PRODUCT_EDIT_FILTER, PRODUCT_EDIT_SORT} from "../../constants/actionType";
import {withStyles} from '@material-ui/core/styles';
import OrderSummary from './OrderSummary'
import BillingDetails from './BillingDetails'
import withWidth, {isWidthUp} from "@material-ui/core/withWidth/index";
import Collapse from '../Widget/Collapse'
import LoadingPage from '../Layout/LoadingPage'
import {redirectUrl} from "../../api/ApiUtils";


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
    },
    form: {
        margin: '40px',
        padding: '40px',
        border: '1px solid ' + theme.palette.secondary.light,

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
        if (!(this.props.shoppingCart)) return <LoadingPage/>
        if (this.props.shoppingCart.length < 1)
            return (<Grid container alignItems={'center'} justify={'center'}>

                <Header
                    title={'confirmPage'}/>
                <Grid item container xs={6} spacing={16} className={classes.form}>
                    <Grid item>

                        <Typography variant={'title'} color={'primary'}>
                            you haven't put any items in cart
                        </Typography>
                    </Grid>

                    <Grid item container alignItems={'center'} spacing={16}>
                        <Grid item>
                            <Typography variant={'subheading'} color={'primary'}>
                                go to
                            </Typography>
                        </Grid>
                        <Grid item>
                            <Button
                                variant='outlined'
                                onClick={() => redirectUrl('/shop',this.props.history)}

                            >
                                shop
                            </Button>
                        </Grid>
                        <Grid item>
                            <Typography variant={'subheading'} color={'primary'}>
                                to buy some
                            </Typography>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>)
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