import React from 'react';
import PropTypes from 'prop-types';
import {withStyles} from '@material-ui/core/styles';
import {Button, Grid, ListItem, Table, Typography} from '@material-ui/core';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import {
    formatExpiryDate,
    formatMoney,
    handleImgValid,
    redirectUrl,
    refactorTextLength,
    refactorTitle
} from "../../api/ApiUtils";
import {connect} from "react-redux";
import * as styleGuide from '../../constants/styleGuide'
import {withSnackbar} from 'notistack';
import Terms from '../Widget/Terms'
import agent from '../../agent'
import {withRouter} from "react-router-dom";
import {CART_EMPTY_BILLING_DETAIL, CART_INIT_SHOPPING_CART} from '../../constants/actionType'
import swal from '@sweetalert/with-react'

const TAX_RATE = 0.07;

const styles = theme => ({
    root: {
        width: '100%',
        marginTop: theme.spacing.unit * 3,
        overflowX: 'auto',
    },
    table: {}, img: {
        width: '100px',
        margin: '10px',
    }
    ,
    binIcon: {
        cursor: 'pointer',
        '&:hover': {
            '&:before': {
                color: '#ff8173',
            }
        }
    },
    button: {
        margin: '20px 0',
    },
    counter: {
        minWidth: '170px',
    },
    block: {
        //   border: ' 1px solid ' + theme.palette.secondary.light,
    }
});

const mapStateToProps = state => ({
    billingDetail: state.cart.billingDetail,
    shoppingCart: state.cart.shoppingCart,
});


const mapDispatchToProps = dispatch => ({
        emptyShoppingCart: () => dispatch({
            type: CART_INIT_SHOPPING_CART
        }),
        emptyBillingDetail: () => dispatch({
            type: CART_EMPTY_BILLING_DETAIL,
        })
    }
)

class OrderSummary extends React.Component {
    getRowPrice = product => product.product.variants.find(variant => variant.id === product.variantId).price * product.number
    placeOrder = async () => {
        const {billingDetail} = this.props
        const data = {
            "address": billingDetail.address,

            "items": this.props.shoppingCart.map(n => ({
                    id: n.variantId, qty: n.number,
                })
            )
            ,
            "coupons":billingDetail.coupons?billingDetail.coupons.code:'',
            "contact": {
                "name": {"first": billingDetail.firstName, "last": billingDetail.lastName},
                "city": billingDetail.city,
                "zipCode": billingDetail.zipCode,
                "country": billingDetail.country,
            },
            "payment": {"number": billingDetail.visaNumber, "cvc": billingDetail.cvc, "date": formatExpiryDate(billingDetail.expiryDate)
            },
            "startPurchase": false,

            "shipping": billingDetail.selectedShippingMethod,
        }
        console.log(data)
        const {classes} = this.props
        redirectUrl('/loadingPage', this.props.history, false)

        await  agent.Checkout.placeOrder(data).then(res => {
                let selectShippingMethod = (this.props.billingDetail.shippingOptions && this.props.billingDetail.shippingOptions.length > 0) ?
                    this.props.billingDetail.shippingOptions.find(
                        n => n.courier.id === this.props.billingDetail.selectedShippingMethod
                    ) : 'no shipping method provided'
                if (typeof res.data === 'string') {
                    this.props.enqueueSnackbar(res.data+' please log in first'
                        , styleGuide.errorSnackbar)
                    this.props.history.goBack()
                    return null
                }
                if (res.data && res.data.messages && res.data.messages.length > 0) {
                    res.data.messages.map(n =>
                        this.props.enqueueSnackbar(n, styleGuide.errorSnackbar)
                    )
                    this.props.history.goBack()

                    return null
                }
                let result = res.data.data.orders
                if (result && result.length > 0) {
                    //if (!(selectShippingMethod)) {selectShippingMethod = this.props.billingDetail.shippingOptions[0]}
                    console.log('gooooood')
                    swal({

                        content: (<Grid container direction={'column'}>
                            <Grid item>
                                <Typography variant={'h6'}>
                                    {
                                        "your contact id is " + result[0].id

                                    }
                                </Typography>
                            </Grid>
                            <Grid item>
                                <Typography variant={'body1'}>
                                    {
                                        false && " your contact number is " + this.props.billingDetail.phone
                                    }
                                </Typography>
                            </Grid>
                            <Grid item>
                                {
                                    this.props.shoppingCart.map((n, i) =>
                                        <ListItem
                                            key={i}

                                        >
                                            <Grid container spacing={16} alignItems={'center'}>
                                                <Grid item sm={3}>

                                                    <img
                                                        style={{width: '100%', minWidth: '50px'}}
                                                        src={handleImgValid(n.product.photos[0])}
                                                    />

                                                </Grid>
                                                <Grid item sm={9}>
                                                    <Typography variant={'body1'}>
                                                        {refactorTextLength(n.product.name)}
                                                    </Typography>
                                                    <Typography variant={'caption'}>
                                                        {n.number} X
                                                        $ {n.product.variants.find(variant => variant.id === n.variantId).price
                                                    }
                                                    </Typography>
                                                    <Typography variant={'caption'}>

                                                        {n.product.variants.find(variant => variant.id === n.variantId).description}
                                                    </Typography>
                                                </Grid>
                                            </Grid>
                                        </ListItem>)

                                }
                                {

                                    this.props.billingDetail.coupons  && <ListItem

                                >
                                    <Grid container spacing={16} alignItems={'center'}>
                                        <Grid item sm={3}>

                                            <img
                                                style={{width: '100%', minWidth: '50px'}}
                                                src={'/img/checkout/coupon.png'}
                                            />

                                        </Grid>
                                        <Grid item sm={9}>
                                            <Typography variant={'body1'}>
                                                {billingDetail.coupons.title}
                                            </Typography>

                                            <Typography variant={'caption'}>

                                                {(billingDetail.coupons.type === 'FIXED') ? '-$ ' + formatMoney(billingDetail.coupons.discount) :
                                                    `-${billingDetail.coupons.discount}%`}
                                            </Typography>
                                        </Grid>
                                    </Grid>
                                </ListItem>
                                }
                            </Grid>
                            <Grid item>
                                <Typography variant={'body1'}>
                                    Total amount
                                    is {'$ ' + formatMoney(

                                        this.getDiscountedPrice(    this.props.shoppingCart.reduce((acc, cur) => acc + this.getRowPrice(cur),
                                            0 ),   billingDetail.coupons
                                        )

                                    )}
                                </Typography>
                                {/*<Typography variant={'body1'}>*/}
                                {/*thanks for choosing {*/}
                                {/*selectShippingMethod.courier.name*/}
                                {/*}.</Typography>*/}
                                {/*<Typography variant={'body1'}>*/}

                                {/*the items will be there in {*/}
                                {/*selectShippingMethod.deliveryTime.min*/}

                                {/*} to {*/}
                                {/*selectShippingMethod.deliveryTime.max*/}

                                {/*} days</Typography>*/}
                            </Grid>
                        </Grid>)
                    });
                    this.props.emptyShoppingCart()

                    this.props.emptyBillingDetail()
                    redirectUrl('/', this.props.history, false)

                }


            }
        ).catch(err => {
            console.log(err)
            if (err.response && err.response.data.messages.length > 0) {
                err.response.data.messages.map(n =>
                    this.props.enqueueSnackbar(n, styleGuide.errorSnackbar)
                )
                this.props.history.goBack()

            }

        })

    }
    getDiscountedPrice = (amount,coupon)=>coupon ?((coupon.type==='FIXED')?amount-coupon.discount:amount*(1-coupon.discount*.01)):amount



    constructor(props) {
        super(props);
        // Add some default error states
        this.state = {
            checked: false,
        };
    }

    render() {
        const {classes, shoppingCart,billingDetail} = this.props;
        return (
            <Paper className={classes.root}>
                <Table className={classes.table}>
                    <TableHead>
                        <TableRow>
                            <TableCell className={classes.block}>Product</TableCell>
                            <TableCell className={classes.block} numeric>Price</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>

                         {shoppingCart.map((n, i) =>
                        <TableRow key={i}>
                            <TableCell className={classes.block}>
                                {refactorTitle(n.product.name)} X {n.number}( {n.product.variants.find(variant => variant.id === n.variantId).description})
                            </TableCell>
                            <TableCell className={classes.block} numeric>
                                {'$ ' + formatMoney(n.product.variants.find(variant => variant.id === n.variantId).price * n.number)}
                            </TableCell>
                        </TableRow>)

                    }

                        {billingDetail.coupons && <TableRow >
                            <TableCell className={classes.block}>
                                {billingDetail.coupons.title}

                            </TableCell>
                            <TableCell className={classes.block} numeric>
                                {(billingDetail.coupons.type==='FIXED')?'-$ ' + formatMoney(billingDetail.coupons.discount):
                                `-${billingDetail.coupons.discount}%`}
                            </TableCell>
                        </TableRow>


                        }
                            <TableRow >
                                <TableCell className={classes.block}>
                                    Total amount
                                </TableCell>
                                <TableCell className={classes.block} numeric>
                                    {'$ ' + formatMoney(

                                        this.getDiscountedPrice(    this.props.shoppingCart.reduce((acc, cur) => acc + this.getRowPrice(cur),
                                            0 ),   billingDetail.coupons
                                        )

                                    )}
                                </TableCell>
                            </TableRow>




                        <TableRow>
                            <TableCell colSpan={2}>
                                <Terms
                                    checked={this.state.checked}
                                    onChange={() => this.setState(
                                        {
                                            checked: !this.state.checked

                                        }
                                    )}
                                />
                            </TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell colSpan={2}>
                                <Button
                                    disabled={!this.state.checked}
                                    className={classes.button}
                                    variant={'outlined'} color={'primary'}
                                    onClick={this.placeOrder}
                                >Place Order</Button>
                            </TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
            </Paper>
        );
    }
}

OrderSummary.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withRouter(withSnackbar(connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(OrderSummary))))
