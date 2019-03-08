import React, {Fragment} from 'react';
import {Button, Divider, Grid, Typography} from '@material-ui/core';
import Header from '../Layout/Body/Header'
import {connect} from 'react-redux'
import {EDIT_PRODUCT_VIEW_MODE, PRODUCT_EDIT_FILTER, PRODUCT_EDIT_SORT} from "../../constants/actionType";
import OrderSummary from './Sections/OrderSummary'
import BillingDetails from './BillingDetails'
import withWidth, {isWidthUp} from "@material-ui/core/withWidth/index";
import Collapse from '../Widget/Collapse'
import LoadingPage from '../Layout/LoadingPage'
import {redirectUrl} from "../../api/ApiUtils";
import PromoCode from './PromoCode'
import {withSnackbar} from 'notistack'
import _ from 'lodash'
import * as styleGuide from "../../constants/snackBarGuide";
import {makeStyles} from "@material-ui/styles";

const useStyles = makeStyles(theme => ({
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

}));
const mapStateToProps = state => ({
    shoppingCart: state.cart.shoppingCart,
    user: state.auth.user,

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

const CheckoutOverview = props => {
    const classes = useStyles();

    const rendering = (!(props.shoppingCart) || props.user === null);
    const needLogin = (_.isEmpty(props.user));
    const NoProductsInCart = (props.shoppingCart.length < 1);

    switch (true) {
        case rendering:
            return <LoadingPage/>;
        case needLogin: {
            redirectUrl('/login', props.history, false);
            props.enqueueSnackbar('please log in first in order to checkout your products', styleGuide.warningSnackbar);
            return null
        }
        case NoProductsInCart:
            return (<Grid container alignItems={'center'} justify={'center'}>

                <Header
                    title={'confirmPage'}/>
                <Grid item container xs={6} spacing={16} className={classes.form}>
                    <Grid item>

                        <Typography variant={'h6'} color={'primary'}>
                            You haven't put any items in cart
                        </Typography>
                    </Grid>

                    <Grid item container alignItems={'center'} spacing={16}>
                        <Grid item>
                            <Typography variant={'subtitle1'} color={'primary'}>
                                go to
                            </Typography>
                        </Grid>
                        <Grid item>
                            <Button
                                variant='outlined'
                                onClick={() => redirectUrl('/products', props.history)}

                            >
                                Products
                            </Button>
                        </Grid>
                        <Grid item>
                            <Typography variant={'subtitle1'} color={'primary'}>
                                to buy some
                            </Typography>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>);
        default:
            return (
                <Grid container justify={'center'}>
                    <Grid item sm={12}>
                        <Header title={'Checkout'}/>
                    </Grid>
                    <Grid item container justify={'center'} spacing={32} md={10}>

                        {(isWidthUp('md', props.width)) ?
                            (<Fragment>
                                <Grid item xs={6}>
                                    <Typography
                                        className={classes.title}
                                        variant={'h4'}>
                                        Your Order Summary
                                    </Typography>
                                    <Divider/>
                                    <OrderSummary/>
                                    <Typography
                                        className={classes.title}
                                        variant={'h4'}>
                                        Promo Code
                                    </Typography>
                                    <Divider/>
                                    <PromoCode/>
                                </Grid>
                                <Grid item xs={6}>
                                    <Typography
                                        className={classes.title}
                                        variant={'h4'}>
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
                                                variant={'h4'}>
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
                                        variant={'h4'}>
                                        Billing Details

                                    </Typography>
                                    <Divider/>
                                    <BillingDetails/>

                                </Grid>
                            </Fragment>)

                        }
                    </Grid>


                </Grid>
            )
    }
};

export default withSnackbar(withWidth()(connect(mapStateToProps, mapDispatchToProps)(CheckoutOverview)))