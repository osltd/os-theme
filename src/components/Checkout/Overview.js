import React from 'react';
import {connect} from 'react-redux';
import {createUseStyles} from 'react-jss';
import styles from './checkout.styles';
import {withCookies} from 'react-cookie';

import _ from 'lodash';
import NumberFormat from 'react-number-format';
import { toast } from 'react-toastify';
import classNames from 'classnames';
import PhoneInput from 'react-phone-number-input';
import 'react-phone-number-input/style.css';

import agent from "../../agent";

import Header from '../Layout/Body/Header'
import {EDIT_PRODUCT_VIEW_MODE, PRODUCT_EDIT_FILTER, PRODUCT_EDIT_SORT, INIT_CART, CART_UPDATE_ORDER_INFO, SHIPPING_RATES} from "../../constants/actionType";
import Select from 'react-select';
import {I18nText} from "../Widget/I18nText";
import {keyOfI18n} from "../../constants/locale/interface";
import {useI18nText} from "../../hooks/useI18nText";
import { CircularProgress } from '@material-ui/core';



const mapStateToProps = state => ({
    items: state.cart.items,
    order: state.cart.order,
    rates : state.cart.rates || [],
    shop : state.common.shopInfo || {}
    // user: state.auth.user,
});
const mapDispatchToProps = (dispatch, ownProps) => ({
    getShippingMethods : async (shop, address, cb) => {
        let autoShopOptions = [];
        // allows auto ship?
        if(shop.auto_ship){
            // fetch auto ship options
            autoShopOptions = await agent.Checkout.getShippingRate({
                cart : ownProps.cookies.get('cart'),
                shipping : {
                    address : address,
                    country : "HK"
                }
            }).map(r => ({
                id               : r.id,
                title            : r.name,
                charge           : Object.values(r.rates)[0],
                address_required : true,
            }));
        }
        let customShipOptions = (((await agent.Checkout.getShippingMethods())[0] || {}).shipping_methods || []).map(r => ({
            id               : r.code,
            title            : r.title,
            charge           : r.charge,
            address_required : r.shipping_address_required
        }));
        // summarize
        dispatch({
            type : SHIPPING_RATES,
            payload : [...autoShopOptions, ...customShipOptions]
        });
        // callback
        cb && cb();
    },
    placeOrder: async (order, cb) => {
        var payload = {...order};
        try {
            // get shopping cart
            let cart = ownProps.cookies.get('cart'), result = null;
            // no shopping cart
            if (!cart) {
                result = await agent.Checkout.getCart();
                cart = (((((result || {}).data || {}).data || {}).rows || []).shift() || {}).id;
                if (cart) ownProps.cookies.set('cart', cart);
            }
            // add item
            result = await agent.Checkout.placeOrderWithoutLogin({
                ...payload,
                items: cart
            });
            if (((result || {}).data || {}).result) {
                // remove cart
                ownProps.cookies.remove('cart');
                // clear items
                dispatch({
                    type: INIT_CART,
                    payload: [],
                });
                // return result
                toast.success('Order placed successfully!', {
                    position: toast.POSITION.TOP_RIGHT
                });
                // callback
                cb && cb();
            }
        } catch (error) {
            // return error
            toast.error(((error.response.data || {}).messages || []).join("\n") || error.message, {
                position: toast.POSITION.TOP_RIGHT
            });
            // callback
            cb && cb();
        }
    },
    updateOrder: info => dispatch({
        type: CART_UPDATE_ORDER_INFO,
        payload: info,
    }),
    checkCoupons: async codes => {
        if (codes.length < 1) {
            // return error
            toast.error('Please enter the coupon code(s).', {
                position: toast.POSITION.TOP_RIGHT
            });
        } else {
            try {
                // check coupons
                var result = await agent.Checkout.getPromoCode(codes);
                // success
                if (((result || {}).data || {}).result) {
                    var errors = [];
                    var coupons = ((result.data.data || {}).rows || []).reduce((container, coupon) => {
                        container[coupon.code] = coupon;
                        return container;
                    }, {});
                    codes.split(/ *, */).filter(c => c).forEach(coupon => {
                        if (!coupons[coupon]) {
                            errors.push(`${coupon} is invalid.`);
                        }
                    });
                    if (errors.length > 0) {
                        // return result
                        toast.error(errors.join("\n"), {
                            position: toast.POSITION.TOP_RIGHT
                        });
                    } else {
                        // return result
                        toast.success('All coupons are valid.', {
                            position: toast.POSITION.TOP_RIGHT
                        });
                    }
                }
            } catch (error) {
                // return error
                toast.error(((error.response.data || {}).messages || []).join("\n") || error.message, {
                    position: toast.POSITION.TOP_RIGHT
                });
            }
        }
    }
});

const CheckoutOverview = props => {
    const classes = styles();
    const {items, order, rates, shop} = props;
    const isShippingAddressRequired = (function(){
        return order.shippings != undefined && 
        rates.filter(r => r.id == Object.values(order.shippings)[0])[0].address_required === true;
    })();
    const isValidToShip = (function(){
        let order = props.order || {
            contact : {},
            shipping : {},
            payment : {}
        };
        return ((order.contact || {}).first_name || "").length && 
               ((order.contact || {}).last_name || "").length && 
               ((order.contact || {}).phone || "").length && 
               ((order.payment || {}).card || "").length && 
               ((order.payment || {}).exp_date || "").length && 
               ((order.payment || {}).csc || "").length;
    })();
    const isValidToPlaceOrder = (function(){
        const { shippings } = order;
        if(
            shippings != undefined && 
           (Object.keys(shippings) || []).length > 0 &&
           Object.keys(shippings)[0] == shop.id &&
           isValidToShip
        ){
            if(!isShippingAddressRequired){
                return true;
            } else if( isShippingAddressRequired && ((order.shipping || {}).address || '').length > 0 ){
                return true;
            } else {
                return false;
            }
        } else {
            return false;
        }
    })()



    // -------------------------------- Checkout form --------------------------------
    const renderForms = () => (<div className={classes.wrapper}>

        {/* ------------------------- Left col ------------------------- */}
        <div className={classes.formGroup} style={{flex : 3}}>
            <h3><I18nText keyOfI18n={keyOfI18n.CHECKOUT_BILLING_DETAIL}/></h3>
            <div>
                <div className={classes.inputSet}>
                    <div className={classes.inputGroup}>
                        <div className={classes.inputWrapper}>
                            <input
                                type="text"
                                className={classes.formInput}
                                placeholder={useI18nText(keyOfI18n.FIRST_NAME)}
                                onChange={e => props.updateOrder({
                                    ...props.order,
                                    contact: {
                                        ...(props.order || {}).contact,
                                        first_name: e.target.value
                                    }
                                })}
                                disabled={order.processing === true}
                            />
                        </div>
                        <div className={classes.inputWrapper}>
                            <input
                                type="text"
                                className={classes.formInput}
                                placeholder={useI18nText(keyOfI18n.LAST_NAME)}
                                onChange={e => props.updateOrder({
                                    ...props.order,
                                    contact: {
                                        ...(props.order || {}).contact,
                                        last_name: e.target.value
                                    }
                                })}
                                disabled={order.processing === true}
                            />
                        </div>
                    </div>
                    <div className={classes.inputGroup}>
                        <div className={classes.inputWrapper}>
                            <input
                                type="text"
                                className={classes.formInput}
                                placeholder={useI18nText(keyOfI18n.EMAIL_ADDRESS)}
                                onChange={e => props.updateOrder({
                                    ...props.order,
                                    contact: {
                                        ...(props.order || {}).contact,
                                        email: e.target.value
                                    }
                                })}
                                disabled={order.processing === true}
                            />
                        </div>
                        <div className={classes.inputWrapper}>
                            <PhoneInput
                                type="text"
                                className={classNames(classes.formInput,classes.phoneInput)}
                                placeholder={useI18nText(keyOfI18n.CHECKOUT_BILLING_DETAIL_PHONE_PLACEHOLDER)}
                                onChange={value => props.updateOrder({
                                    ...props.order,
                                    contact: {
                                        ...(props.order || {}).contact,
                                        phone: value
                                    }
                                })}
                                disabled={order.processing === true}
                            />
                        </div>
                    </div>
                    {isShippingAddressRequired &&
                    <div className={classes.inputWrapper}>
                        <input
                            type="text"
                            className={classes.formInput}
                            placeholder={useI18nText(keyOfI18n.CHECKOUT_BILLING_STREET_ADDRESS)}
                            onChange={e => props.updateOrder({
                                ...props.order,
                                shipping: {
                                    ...(props.order || {}).shipping,
                                    address: e.target.value,
                                    country : "HK"
                                }
                            })}
                            disabled={order.processing === true}
                        />
                    </div>}
                </div>
                {/* -------- payment -------- */}
                <h3 style={{paddingTop : "15px"}}>
                    <I18nText keyOfI18n={keyOfI18n.CHECKOUT_PAYMENT_INFOFORMATION}/>
                </h3>
                <div className={classes.inputSet}>
                    <div className={classes.inputWrapper}>
                        <NumberFormat
                            format="#### #### #### ####"
                            className={classes.formInput}
                            placeholder={useI18nText(keyOfI18n.CHECKOUT_BILLING_DETAIL_VISA_PLACEHOLDER)}
                            onValueChange={({value}) => props.updateOrder({
                                ...props.order,
                                payment: {
                                    ...(props.order || {}).payment,
                                    card: value
                                }
                            })}
                            disabled={order.processing === true}
                        />
                    </div>
                    <div className={classes.inputGroup}>
                        <div className={classes.inputWrapper}>
                            <NumberFormat
                                format="##/##"
                                className={classes.formInput}
                                placeholder={useI18nText(keyOfI18n.CHECKOUT_BILLING_EXPIRY_DATE)}
                                mask={['M', 'M', 'Y', 'Y']}
                                onValueChange={({formattedValue}) => props.updateOrder({
                                    ...props.order,
                                    payment: {
                                        ...(props.order || {}).payment,
                                        exp_date: formattedValue
                                    }
                                })}
                                disabled={order.processing === true}
                            />
                        </div>
                        <div className={classes.inputWrapper}>
                            <NumberFormat
                                format="###"
                                className={classes.formInput}
                                placeholder={useI18nText(keyOfI18n.CHECKOUT_BILLING_CVC)}
                                onValueChange={({value}) => props.updateOrder({
                                    ...props.order,
                                    payment: {
                                        ...(props.order || {}).payment,
                                        csc: value
                                    }
                                })}
                                disabled={order.processing === true}
                            />
                        </div>
                    </div>
                </div>
                {/* -------- /payment -------- */}                                    
            </div>
        </div>
        {/* ------------------------- /Left col ------------------------- */}


        {/* ------------------------- Right col ------------------------- */}
        <div className={classes.formGroup} style={{flex : 2}}>
            <div>
                <h3>
                    <I18nText keyOfI18n={keyOfI18n.CHECKOUT_YOUR_ORDER_SUMMARY}/>
                </h3>
                
                <div style={{
                    width: 'calc(100% - 30px)',
                    border: '1px #dadada solid',
                    borderRadius: 2,
                    padding:"15px"
                }}>
                    {/* ----- Items list ----- */}
                    {(items || []).map((item, idx) => (
                        <div key={`item-${idx}`} className={classes.item}>
                            <img className={classes.itemThumb} src={(item.media || [])[0]} />
                            <div className={classes.itemInfo}>
                                <div className={classes.itemName}>
                                    {item.name}<br/>
                                    <span>{item.variant}</span>
                                </div>
                                <div className={classes.itemPrice}>
                                    <NumberFormat
                                        value={item.price}
                                        thousandSeparator={true}
                                        prefix={'HK$'}
                                        displayType={'text'}
                                    /> x {item.qty}
                                </div>
                            </div>
                        </div>
                    ))}
                    {/* ----- Items list ----- */}

                    <div style={{height : 0.5, backgroundColor:'#dadada' }}></div> {/* --- seperation line --- */}

                    {/* ----- coupon code ----- */}
                    <div className={classes.couponForm}>
                        <div className={classes.inputWrapper}>
                            <input
                                type="text"
                                className={classes.formInput}
                                placeholder={useI18nText(keyOfI18n.PROMO_CODE_TYPE_YOUR_PROMO_CODE_HERE)}
                                onChange={e => props.updateOrder({
                                    ...props.order,
                                    coupons: e.target.value
                                })}
                                disabled={order.processing === true}
                            />
                        </div>
                        <div style={{display:'flex', justifyContent:'center', flex : 1}}>
                            <button type="button"
                                    className={classes.checkCouponBtn}
                                    onClick={e => props.checkCoupons((props.order || {}).coupons || '')}
                                    disabled={!((order || {}).coupons || "").length}
                            >
                                <I18nText keyOfI18n={keyOfI18n.PROMO_CODE_CHECK_BTN}/>
                            </button>
                        </div>
                    </div>
                    {/* ----- /coupon code ----- */}

                    <div style={{height : 0.5, backgroundColor:'#dadada' }}></div> {/* --- seperation line --- */}

                    {/* ----- Summary ----- */}
                    <div className={classes.summary}>
                        {/* --- sub total --- */}
                        <div className={classes.summaryRow}>
                            <I18nText keyOfI18n={keyOfI18n.CHECKOUT_SUBTOTAL}/>
                            <NumberFormat
                                value={(items || []).reduce((total, item) => total += item.qty*item.price, 0)}
                                thousandSeparator={true}
                                prefix={'HK$'}
                                displayType={'text'}
                            />
                        </div>
                        {/* --- shipping fee --- */}
                        <div className={classes.summaryRow}>
                            <I18nText keyOfI18n={keyOfI18n.CHECKOUT_SHIPPING_FEE}/>
                            <NumberFormat
                                value={(() => {
                                    if(order.shippings == undefined){
                                        return '-';
                                    } else {
                                        return rates.filter(r => r.id == Object.values(order.shippings)[0])[0].charge;
                                    }
                                })()}
                                thousandSeparator={true}
                                prefix={'HK$'}
                                displayType={'text'}
                            />
                        </div>
                    </div>
                    {/* ----- /Summary ----- */}

                    <div style={{height : 0.5, backgroundColor:'#dadada' }}></div> {/* --- seperation line --- */}

                    {/* ----- Buttons ----- */}
                    <div className={classes.summary}>
                        {   
                            order.processing === true ? 
                            <div style={{ width : "100%", display : "flex", justifyContent : "center"}}>
                                <CircularProgress size={15} color="#000" />
                            </div>
                            :
                            (rates.length ? 
                            // select a shippings method
                            <div>
                                <div style={{fontSize:13, textTransform:'uppercase', paddingBottom:"7px"}}>
                                    <I18nText keyOfI18n={keyOfI18n.CHECKOUT_SHIPPING_METHOD}/>
                                </div>
                                <div>
                                    <Select 
                                        placeholder={<I18nText keyOfI18n={keyOfI18n.CHECKOUT_SELECT_COURIER}/>}
                                        onChange={({value}) => props.updateOrder({
                                            ...props.order,
                                            shippings : {
                                                [value.split(":")[0]] : value.split(":")[1]
                                            }
                                        })}
                                        options={rates.map(r => ({
                                            value : `${shop.id}:${r.id}`,
                                            label : `${r.title} - HK$${r.charge}`
                                        }))}
                                    />
                                </div>
                               
                                <div className={classes.termsnConditions}>
                                    <span><I18nText keyOfI18n={keyOfI18n.TERM_AND_CONDITIONS}/></span>
                                </div>
                                <button className={classes.actionBtn} 
                                        style={{marginTop:15}}
                                        onClick={e => {
                                            props.updateOrder({
                                                ...props.order,
                                                processing : true
                                            });
                                            props.placeOrder(props.order, () => {
                                                props.updateOrder({
                                                    ...props.order,
                                                    processing : false
                                                });
                                            });
                                        }}
                                        disabled={!isValidToShip || !isValidToPlaceOrder}>
                                    <I18nText keyOfI18n={keyOfI18n.PLACE_ORDER}/>
                                </button>
                            </div> :
                            // click to load rates and shippings methods
                            <button className={classes.actionBtn}
                                onClick={e => {
                                    props.updateOrder({
                                        ...props.order,
                                        processing : true
                                    });
                                    props.getShippingMethods(shop, ((props.order || {}).shipping || {}).address, () => {
                                        props.updateOrder({
                                            ...props.order,
                                            processing : false
                                        });
                                    });
                                }}
                                disabled={!isValidToShip}>
                                <I18nText keyOfI18n={keyOfI18n.CONTINUE_SHIPPING}/>
                            </button>)
                        }
                    </div>
                    {/* ----- /Buttons ----- */}
                </div>
                
            </div>
        </div>
        {/* ------------------------- /Right col ------------------------- */}

    </div>);
    // -------------------------------- /Checkout form --------------------------------

    const renderPlaceholder = () => (<div className={classes.placeholder}>
        <div style={{fontSize:24}}>
            <I18nText keyOfI18n={keyOfI18n.CHECKOUT_YOU_HAVE_NOT_PUT_ANY_ITEMS_IN_CART}/>
        </div>
        <div style={{fontSize:24, display : 'flex', flexDirection : 'row', alignItems : 'center', padding : "5px 0px"}}>
            <I18nText keyOfI18n={keyOfI18n.GOTO}/>
            &nbsp;
            <button
                type='button'
                style={{fontSize:24, border : 'none', backgroundColor : 'transparent', textDecoration:'underline', cursor : 'pointer'}}
                onClick={e => props.history.push('/products')}
            >
                <I18nText keyOfI18n={keyOfI18n.PRODUCTS}/>
            </button>
        </div>
    </div>)


    return <div>
        <Header title={useI18nText(keyOfI18n.CHECKOUT)}/>
        {!(items || []).length ? renderPlaceholder() : renderForms()}
    </div>;
};

export default withCookies(connect(mapStateToProps, mapDispatchToProps)(CheckoutOverview));