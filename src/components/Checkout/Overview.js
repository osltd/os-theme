import React from 'react';
import {connect} from 'react-redux';
import {createUseStyles} from 'react-jss';
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


const styles = createUseStyles({
    wrapper: {
        padding: '0 9%',
        display: 'flex'
    },
    formGroup: {
        flex: 1,
        margin: '0 10px',
        '&:first-child': {
            marginLeft: 0
        },
        '&:last-child': {
            marginRight: 0
        }
    },
    formInput: {
        width: '100%',
        height: 40,
        borderRadius: 2,
        border: '1px #dadada solid',
        padding: '0 15px',
        transition : "border 0.3s",
        '&:focus' : {
            border: '1px black solid',
        }
    },
    inputSet: {
        margin: '15px -5px -5px',
        '&:first-child': {
            marginTop: -5
        }
    },
    inputGroup: {
        display: 'flex'
    },
    inputWrapper: {
        display: 'flex',
        flex: 1,
        margin: 5
    },
    phoneInput: {
        display: 'flex',
        '& > div': {
            flex: 1
        },
        '& > div > input': {
            width: '100%'
        }
    },

    item : {
        display : 'flex',
        flexDirection : 'row',
        flexWrap : 'wrap',
        width : "calc(100% - 30)",
        padding : 15
    },
    itemThumb : {
        padding : "0px 10px",
        width : 50,
        height : 50,
        objectFit : 'contain'
    },
    itemInfo : {
        display : 'flex',
        flex : 1,
        flexDirection : 'row',
        alignItems : 'center',
        flexWrap : 'wrap'
    },
    itemName : {
        flex : 1,
        minWidth : 200,
        fontSize : 16,
        '& > span' : {
            fontSize : 14,
            color : '#333'
        }
    },
    itemPrice : {
        padding : "15px 0px",
        fontSize : 14,
        '& > span' : {
            fontSize : 14
        }
    },
    couponForm : {
        width : "100%",
        display : 'flex',
        flexDirection : 'row',
        flexWrap : 'wrap',
        margin : "15px 0px",
        '& > div' : {
            flex : 3,
            //minWidth : 200
        },
        '& > input' : {
            minWidth : 200,
            height: 30,
            borderRadius : 3
        }
    },
    checkCouponBtn : {
        backgroundColor : 'transparent',
        border : 'none',
        cursor : "pointer",
        transition : "opacity 0.3s",
        fontSize : 14,
        '&:hover' : {
            opacity : 0.6
        }
    },
    summary : {
        padding : 15
    },
    summaryRow : {
        display : 'flex',
        flexDirection : 'row',
        flexWrap : 'wrap',
        justifyContent : 'space-between',
        padding : "5px 0px",
        fontSize : 14,
        '& > *' : {
            fontSize : 14
        }
    },
    actionBtn : {
        backgroundColor : 'transparent',
        border : 'none',
        display : 'flex',
        width : "100%",
        justifyContent : 'center',
        alignItems : 'center',
        fontSize : 14,
        border : '1px black solid',
        transition : 'opacity 0.3s',
        borderRadius : 3,
        padding : 10,
        cursor : 'pointer',
        '&:hover, &:disabled' : {
            opacity : 0.6,
            border : '1px #BBB solid',
        }
    },
    termsnConditions : {
        paddingTop : 25,
        '& > span' : {
            color : "#777",
            fontSize : 12
        }
    },
    placeholder : {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
        padding: '35px 0',
        fontSize : 24
    },

    // for tablet
    '@media (max-width: 1200px)': {
        inputGroup: {
            display: 'block'
        },
        inputSet: {
            '&:last-child': {
                marginTop: 30
            }
        }
    },



    // for mobile
    '@media (max-width: 600px)': {
        wrapper: {
            display: 'block'
        },
        formGroup: {
            margin: 0,
            '&:last-child': {
                marginTop: 60
            }
        },
        inputGroup: {
            display: 'block'
        },
        inputSet: {
            '&:last-child': {
                marginTop: 30
            }
        }
    }
});


const mapStateToProps = state => ({
    items: state.cart.items,
    order: state.cart.order,
    rates : state.cart.rates || []
    // user: state.auth.user,
});
const mapDispatchToProps = (dispatch, ownProps) => ({
    quoteShippingFee : async (items, address) => {
        var result = await agent.Checkout.getShippingRate({
            items : items.map(i => ({ id : i.id, qty : i.qty})),
            shipping : {
                address : address,
                country : "HK"
            }
        });
        if((result || []).length){
            console.log(result);
            return dispatch({
                type : SHIPPING_RATES,
                payload : result
            });
        } else {
            // return error
            toast.error('Failed to calculate shipping fee', {
                position: toast.POSITION.TOP_RIGHT
            });
        }
    },
    placeOrder: async order => {
        // if (!order.agree) {
        //     // return error
        //     toast.error('Please accept the terms and conditions to continue your action.', {
        //         position: toast.POSITION.TOP_RIGHT
        //     });
        // } else {
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
                ...order,
                items: cart
            });
            if (((result || {}).data || {}).result) {
                // remove cart
                ownProps.cookies.remove('cart');
                // clear items
                dispatch(
                    {
                        type: INIT_CART,
                        payload: [],
                    }
                );
                // return result
                toast.success('Order successed.', {
                    position: toast.POSITION.TOP_RIGHT
                });
            }
        } catch (error) {
            // return error
            toast.error(((error.response.data || {}).messages || []).join("\n") || error.message, {
                position: toast.POSITION.TOP_RIGHT
            });
        }
        //}
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
    const {items, order, rates} = props;
    const isFormValid = (function(){
        let order = props.order || {
            contact : {},
            shipping : {},
            payment : {}
        };
        return ((order.contact || {}).first_name || "").length && 
               ((order.contact || {}).last_name || "").length && 
               ((order.contact || {}).phone || "").length && 
               ((order.shipping || {}).address || "").length && 
               ((order.payment || {}).card || "").length && 
               ((order.payment || {}).exp_date || "").length && 
               ((order.payment || {}).csc || "").length;
    })();



    // -------------------------------- Checkout form --------------------------------
    const renderForms = () => (<div className={classes.wrapper}>

        {/* ------------------------- Left col ------------------------- */}
        <div className={classes.formGroup} style={{flex : 3}}>
            <h3>
                <I18nText keyOfI18n={keyOfI18n.CHECKOUT_BILLING_DETAIL}/>
            </h3>
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
                            />
                        </div>
                    </div>
                    <div className={classes.inputWrapper}>
                        <input
                            type="text"
                            className={classes.formInput}
                            placeholder={useI18nText(keyOfI18n.CHECKOUT_BILLING_STREET_ADDRESS)}
                            onChange={e => props.updateOrder({
                                ...props.order,
                                shipping: {
                                    ...(props.order || {}).shipping,
                                    address: e.target.value
                                }
                            })}
                        />
                    </div>
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
                                    var shopId = Object.keys((props.order || {}).shippings || {})[0] || '';
                                    var courierId = ((props.order || {}).shippings || {})[shopId];
                                    var selectedCourier = rates.filter(r => r.id == courierId)[0] || {};
                                    return (selectedCourier.rates || {})[shopId];
                                })() || '-'}
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
                            rates.length ? 
                            <div>
                                <Select 
                                    placeholder={"Select Courier"}
                                    onChange={({value}) => props.updateOrder({
                                        ...props.order,
                                        shippings : {
                                            [value.split(":")[0]] : value.split(":")[1]
                                        }
                                    })}
                                    options={rates.map(r => ({
                                        value : `${Object.keys(r.rates)[0]}:${r.id}`,
                                        label : `${r.name} - HK$${Object.values(r.rates)[0]}`
                                    }))}
                                />
                                <div className={classes.termsnConditions}>
                                    <span><I18nText keyOfI18n={keyOfI18n.TERM_AND_CONDITIONS}/></span>
                                </div>
                                <button className={classes.actionBtn} 
                                        style={{marginTop:15}}
                                        onClick={e => {
                                            props.placeOrder(props.order);
                                        }}
                                        disabled={!isFormValid || !Object.keys(order.shippings || {}).length}>
                                    <I18nText keyOfI18n={keyOfI18n.PLACE_ORDER}/>
                                </button>
                            </div> : 
                            <button className={classes.actionBtn}
                                onClick={e =>props.quoteShippingFee(items, props.order.shipping.address)}
                                disabled={!isFormValid}>
                                <I18nText keyOfI18n={keyOfI18n.CONTINUE_SHIPPING}/>
                            </button>
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