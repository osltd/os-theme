import React from 'react';
import PropTypes from 'prop-types';
import {withStyles} from '@material-ui/core/styles';
import {connect} from "react-redux";
import {Button, CircularProgress, Grid, Typography} from '@material-ui/core'
import {CART_EDIT_BILLING_DETAIL} from "../../constants/actionType";
import InputBar from '../Widget/InputBar'
import agent from '../../agent'
import classNames from 'classnames'
import CountryCode from '../Widget/Input/Country'

import {withSnackbar} from 'notistack';

const TAX_RATE = 0.07;
const styles = theme => ({
    root: {
        width: '100%',
        marginTop: theme.spacing.unit * 3,
        overflowX: 'auto',
    },
    table: {
        minWidth: 700,
    }, img: {
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
    counter: {
        minWidth: '170px',
    },
    block: {
        //   border: ' 1px solid ' + theme.palette.secondary.light,
    },
    shippingOptions: {
        padding: '5px',

        border: '1px solid ' + theme.palette.secondary.light,
    },
    selectedOption: {
        backgroundColor: theme.palette.secondary.light,
        border: '1px solid ' + theme.palette.primary.dark,
    }
});

const mapStateToProps = state => ({
    shoppingCart: state.cart.shoppingCart,
    billingDetail: state.cart.billingDetail,
});


const mapDispatchToProps = dispatch => ({

        editBillingDetail: (key, value) => dispatch({
            type: CART_EDIT_BILLING_DETAIL,
            payload: {
                key: key,
                value: value,
            }
        }),

    }
)

class ShoppingCartTable extends React.Component {

    getRowPrice = product => product.product.variants.find(variant => variant.id === product.variantId).price * product.number
    getShippingRate = async () => {
        this.props.editBillingDetail(
            'shippingOptions', await agent.Checkout.getShippingRate({

                    items: this.props.shoppingCart.map(n => ({
                            id: n.variantId, qty: n.number,
                        })
                    )
                }
            )
        )
    }
    getShippingMethod = () => {
        const {classes} = this.props
        let hasValidShippingMethod = (this.props.billingDetail.shippingOptions && this.props.billingDetail.shippingOptions.length > 0)

        return <Grid item container justify={'space-between'} xs={12}>
            {hasValidShippingMethod ? <Grid item xs={12}>
                <Typography variant={'h6'}>
                    Shipping Options
                </Typography>
            </Grid> : null}
            {
                hasValidShippingMethod ? this.props.billingDetail.shippingOptions.map((n, i) => {
                        return (

                            <Grid
                                className={classNames(classes.shippingOptions,
                                    (n.courier.id === this.props.billingDetail.selectedShippingMethod) ? classes.selectedOption : null)}
                                item container xs={4}>
                                <Grid item>

                                    <Typography variant={'body1'}>
                                        name: {n.courier.name}
                                    </Typography>
                                    <Typography variant={'body1'}>
                                        charge: {n.charge}
                                    </Typography>
                                    <Typography variant={'body1'}>
                                        delivery time :{n.deliveryTime.min} days to {n.deliveryTime.max} days
                                    </Typography>
                                </Grid>


                                <Grid item>

                                    <Button
                                        className={classes.button}
                                        variant={'outlined'} color={'primary'}
                                        onClick={() => this.props.editBillingDetail('selectedShippingMethod', n.courier.id)}
                                    >selected</Button>
                                </Grid>
                            </Grid>)
                    }
                ) : ((this.props.billingDetail.address && !(this.props.billingDetail.shippingOptions)) ?
                    <CircularProgress size={40}/>
                    : null)
            }


        </Grid>

    }


    componentDidUpdate(prevProps, prevState, snapShot) {

        if (this.props.billingDetail.shippingOptions === undefined && this.props.billingDetail.address) {
            this.getShippingRate()
        }
    }

    render() {
        const {classes, billingDetail, shoppingCart} = this.props;
        return (
            <Grid container spacing={16} className={classes.root}>

                <Grid item xs={6}>
                    <InputBar
                        title={'First Name'}
                        placeholder={'First Name'}
                        onChange={value => this.props.editBillingDetail('firstName', value)}
                        value={billingDetail.firstName}
                    />
                </Grid>

                <Grid item xs={6}>
                    <InputBar
                        title={'Last Name'}
                        placeholder={'Last Name'}
                        onChange={value => this.props.editBillingDetail('lastName', value)}
                        value={billingDetail.lastName}

                    />
                </Grid>
                <Grid item xs={6}>
                    <InputBar
                        needValidation={true}

                        title={'Email Address'}
                        placeholder={'Email Address'}

                        onChange={value => this.props.editBillingDetail('email', value)}
                        value={billingDetail.email}
                    />

                </Grid>

                <Grid item xs={6}>
                    <InputBar
                        title={'City'}
                        placeholder={'City'}
                        onChange={value => this.props.editBillingDetail('city', value)}
                        value={billingDetail.city}
                    />

                </Grid> <Grid item xs={6}>
                <InputBar
                    title={'Country'}
                    placeholder={'Country'}
                    onChange={value => this.props.editBillingDetail('country', value)}
                    value={billingDetail.country}
                />

            </Grid>
                <Grid item xs={6}>
                    <InputBar
                        validation={
                            {
                                format: '###-###',
                            }
                        }
                        title={'Postcode/ZIP'}
                        placeholder={'Postcode/ZIP'}
                        onChange={value => this.props.editBillingDetail('zipCode', value)}
                        value={billingDetail.zipCode}
                    />

                </Grid>
                <Grid item xs={6}>
                    <CountryCode
                        value={billingDetail.countryCode}
                        onChange={value => this.props.editBillingDetail('countryCode', value)}
                    />
                </Grid>
                <Grid item xs={6}>
                    <InputBar
                        placeholder={'please enter ur phone number for contact'}
                        validation={
                            {
                                prefix: `${billingDetail.countryCode.value}`,
                            }
                        }
                        onChange={value => this.props.editBillingDetail('phone', value)}
                        value={billingDetail.phone}
                    />
                </Grid>
                <Grid item xs={12}>
                    <InputBar
                        title={'Street Address'}
                        placeholder={'Street Address'}
                        onChange={value => this.props.editBillingDetail('address', value)}
                        value={billingDetail.address}
                    />
                </Grid>

                <Grid item xs={12}>
                    <InputBar
                        validation={
                            {
                                format: '#### #### #### ####',
                            }
                        }
                        title={'visa number'}
                        placeholder={'please enter your visa number'}
                        type="visa"

                        onChange={value => this.props.editBillingDetail('visaNumber', value)}
                        value={billingDetail.visaNumber}

                    />

                </Grid>

                <Grid item xs={6}>
                    <InputBar
                        title={'Expire Date'}
                        placeholder={'MM/YY'}
                        validation={
                            {
                                format: '##/##',
                                mask: ['M', 'M', 'Y', 'Y'],
                            }
                        }
                        onChange={value => this.props.editBillingDetail('expiryDate', value)}
                        value={billingDetail.expiryDate}
                    />
                </Grid>
                <Grid item xs={6}>
                    <InputBar
                        title={'CVC'}
                        placeholder={'XXX'}
                        validation={
                            {
                                format: '###',
                            }
                        }
                        onChange={value => this.props.editBillingDetail('cvc', value)}
                        value={billingDetail.cvc}
                    />
                </Grid>

                {this.getShippingMethod()}
            </Grid>

        )
    }
}

ShoppingCartTable.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withSnackbar(connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(ShoppingCartTable)))
