import React, {useState} from 'react';
import PropTypes from 'prop-types';
import {withStyles} from '@material-ui/core/styles';
import {Button, Table, Typography} from '@material-ui/core';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import {connect} from "react-redux";
import {withSnackbar} from 'notistack';
import agent from '../../agent'
import InputBar from '../Widget/InputBar'
import TagsSearchBar from '../Widget/Input/tag'
import {withRouter} from "react-router-dom";
import {stringToTags} from '../../api/ApiUtils'
import * as styleGuide from "../../constants/styleGuide";
import {CART_EDIT_BILLING_DETAIL} from "../../constants/actionType";
import _ from 'lodash'
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
    coupons: state.cart.billingDetail.coupons,
    shoppingCart: state.cart.shoppingCart,

});


const mapDispatchToProps = dispatch => ({

        setCoupons: (value) => dispatch({
            type: CART_EDIT_BILLING_DETAIL,
            payload: {
                key: 'coupons',
                value: value,
            }
        }),

    }
)

const PromoCode = props => {
    const [promoCode, setPromoCode] = useState('')
    let itemsOf = product => {

        return product.number
    }
    let getRowPrice = product => product.product.variants.find(variant => variant.id === product.variantId).price * product.number

    const {classes, shoppingCart, setCoupons, coupons} = props;
    return (
        <Paper className={classes.root}>
            <Table className={classes.table}>
                <TableBody>
                    <TableRow>
                        <TableCell colSpan={2}>
                            <InputBar
                                disabled={(coupons)}

                                placeholder={'Type your promo code here'}
                                onChange={value => setPromoCode(value)}
                                value={promoCode}
                            />
                        </TableCell>
                        <TableCell colSpan={2}>
                            <Button
                                disabled={(coupons)}

                                onClick={
                                    () => {
                                        if (promoCode === '') {
                                            props.enqueueSnackbar('Please Type in Promo Code First', styleGuide.errorSnackbar)
                                            return null
                                        }

                                        agent.Checkout.getPromoCode(promoCode).then(
                                            res => {
                                                if (res.data.data.total === 0) {
                                                    props.enqueueSnackbar('Promo Code does not exist', styleGuide.errorSnackbar)
                                                    setPromoCode('')
                                                    return null
                                                }

                                                if (res.data.data.total === 1) {
                                                    let data = res.data.data.discounts[0]

                                                    if (
                                                        props.shoppingCart.reduce((acc, cur) => acc + itemsOf(cur), 0) < data.requirements.items

                                                    ) {

                                                        props.enqueueSnackbar(`You need to buy more to reach items requirement ${data.requirements.items}`, styleGuide.errorSnackbar)

                                                        setPromoCode('')

                                                        return null

                                                    }

                                                    if (
                                                        props.shoppingCart.reduce((acc, cur) => acc + getRowPrice(cur), 0) < data.requirements.amount

                                                    ) {
                                                        props.enqueueSnackbar(`You need to buy more to reach amount requirement HKD ${data.requirements.amount} `, styleGuide.errorSnackbar)
                                                        setPromoCode('')

                                                        return null
                                                    }
                                                    if (!(new Date(data['start_time']).getTime() <
                                                        Date.now() <
                                                        new Date(data['end_time']).getTime())) {
                                                        props.enqueueSnackbar(`Promo Code you provide is not in vaild Date `, styleGuide.errorSnackbar)
                                                        setPromoCode('')

                                                        return null
                                                    }

                                                    props.enqueueSnackbar('Promo Code valid', styleGuide.successSnackbar)

                                                    setCoupons(res.data.data.discounts[0])

                                                }

                                            }
                                        ).catch(
                                            err => props.enqueueSnackbar('Something wrong, please refresh and try again', styleGuide.errorSnackbar)
                                        )
                                    }
                                }
                                className={classes.button}
                                variant={'outlined'} color={'primary'}
                            >Check</Button>
                        </TableCell>
                    </TableRow>
                    {
                        false && <TableRow>

                   <TagsSearchBar
                        defaultValue={
                            stringToTags(promoCode)
                        }
                            onChange={value => setPromoCode( _.join(_.map(value, 'value'), ','))}






                   />

                    </TableRow>}
                    <TableRow>
                        <TableCell colSpan={2}>
                            <Typography
                                variant={'body1'} color={'primary'}
                            >
                                {(coupons) ?
                                    `

                                                                   Promo Code valid
                           ` : 'no Promo code available'
                                }
                            </Typography>
                        </TableCell>

                    </TableRow>
                </TableBody>
            </Table>
        </Paper>
    )
}

PromoCode.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withRouter(withSnackbar(connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(PromoCode))))
