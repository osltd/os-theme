import React from 'react';
import {connect} from 'react-redux';
import styles from './cart.style';
import {withCookies} from 'react-cookie';

import PropTypes from 'prop-types';
import NumberFormat from 'react-number-format';
import { toast } from 'react-toastify';

import {handleImgValid} from "../../api/ApiUtils";
import agent from "../../agent";

import Header from '../Layout/Body/Header';
import LoadingPage from '../Layout/LoadingPage';

import {
    CART_UPDATE_ITEM,
    CART_DELETE_ITEM,
} from "../../constants/actionType";

import {I18nText} from "../Widget/I18nText";
import {keyOfI18n} from "../../constants/locale/interface";


// data
const mapStateToProps = state => ({
    items: state.cart.items
});

// timers for updating qty
let timers = {};


// events
const mapDispatchToProps = (dispatch, ownProps) => ({
    deleteItem: async id => {
        // get cart
        const cart = ownProps.cookies.get('cart');
        // update local model first
        await dispatch({
            type: CART_DELETE_ITEM,
            payload: {
                id
            }
        });
        // delete item
        cart && agent.Checkout.deleteItem(
            cart,
            id
        ).then(res => {
            // failed
            if (!res.data.result) {
                // return error
                toast.error((res.data.messages || []).join("\n"), {
                    position: toast.POSITION.TOP_RIGHT
                });
            } else {
                // return message
                toast.success('Item deleted.', {
                    position: toast.POSITION.TOP_RIGHT
                });
                // delete timer
                if (timers[id]) {
                    clearTimeout(timers[id]);
                    delete timers[id];
                }
            }
        })
        .catch(err => {
            // return error
            toast.error(err.message, {
                position: toast.POSITION.TOP_RIGHT
            });
        });
    },
    updateItemQty: async (id, qty) => {
        // get cart
        const cart = ownProps.cookies.get('cart');
        // update local model first
        await dispatch({
            type: CART_UPDATE_ITEM,
            payload: {
                id,
                qty
            },
        });
        // clear timer
        if (timers[id]) timers[id] = clearTimeout(timers[id]);
        // reset timer
        timers[id] = setTimeout(() => {
            timers[id] = clearTimeout(timers[id]);
            // cart exists, save item
            cart && agent.Checkout.saveItem(
                cart,
                id,
                qty
            )
            .then(res => {
                // failed
                if (!res.data.result) {
                    // return error
                    toast.error((res.data.messages || []).join("\n"), {
                        position: toast.POSITION.TOP_RIGHT
                    });
                } else {
                    // return message
                    toast.success('Item updated.', {
                        position: toast.POSITION.TOP_RIGHT
                    });
                }
            })
            .catch(err => {
                // return error
                toast.error(err.message, {
                    position: toast.POSITION.TOP_RIGHT
                });
            })
        }, 550);
    }
});


// views
const ShoppingCartTable = props => {
    const classes = styles();
    const {items, history} = props;

    if (items === null) return <LoadingPage/>;

    return <div>
        <Header
            title={'Shopping Cart'}
            classes={{}}
        />
        <div className={classes.wrapper}>
            {/* ------------------------- list ------------------------- */}
            <div className={classes.itemList}>
                {
                    items.length  > 0 ? items.map((item, idx) => {
                        return (
                            <div className={classes.itemWrapper}>
                                <div className={classes.thumbnail}>
                                    <img
                                        src={handleImgValid(item.media[0])}
                                        className={classes.img}
                                    />
                                </div>
                                <div className={classes.infoWrapper}>
                                    <div className={classes.name}>{item.name}</div>
                                    <div className={classes.variant}><i>{item.variant}</i></div>
                                </div>
                                <div className={classes.price}>
                                    <div className={classes.qtyValue}>
                                        <NumberFormat
                                            value={item.price}
                                            thousandSeparator={true}
                                            prefix={'HK$'}
                                            displayType={'text'}
                                        />
                                        &nbsp;x&nbsp;
                                        {item.qty}
                                    </div>
                                    <div className={classes.qtyBtns}>
                                        <button className={classes.qtyBtn} 
                                                onClick={() => {
                                                    props.updateItemQty(item.id, item.qty+1);
                                                }}
                                        >
                                            <i className="icon-arrow-up"></i>
                                        </button>
                                        <button className={classes.qtyBtn} 
                                                onClick={() => {
                                                    if(item.qty > 1){
                                                        props.updateItemQty(item.id, item.qty-1);
                                                    } else if(item.qty == 1){
                                                        // remove
                                                        props.deleteItem(item.id);
                                                    }
                                                }}
                                        >
                                            <i className="icon-arrow-down"></i>
                                        </button>
                                    </div>
                                </div>
                                <div className={classes.subTotal}>
                                    <NumberFormat
                                        value={item.price*item.qty}
                                        thousandSeparator={true}
                                        prefix={'HK$'}
                                        displayType={'text'}
                                    />
                                </div>
                                
                                <div className={classes.removeBtn}>
                                    <button
                                        type="button"
                                        className={classes.binIcon + ' ' + 'icon-bin'}
                                        onClick={e => props.deleteItem(item.id)}
                                    />
                                </div>  
                            </div>
                        )
                    }) :
                    <div className={classes.placeholder}>
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
                    </div>
                }
                {/* ------------------------- /Summary ------------------------- */}
                {items.length > 0 && <div className={classes.summary}>
                    <div className={classes.grandTotal}>
                        <I18nText keyOfI18n={keyOfI18n.TOTAL}/> 
                        : 
                        <NumberFormat
                            value={items.reduce((total, item) => total + (item.price * item.qty), 0)}
                            thousandSeparator={true}
                            prefix={'HK$'}
                            displayType={'text'}
                        />
                    </div>
                    <button
                        type="button"
                        className={classes.checkoutBtn}
                        onClick={e => history.push('/checkout')}
                    >
                        <I18nText keyOfI18n={keyOfI18n.CHECKOUT}/>
                    </button>
                </div>}
                {/* ------------------------- /Summary ------------------------- */}
            </div>
            {/* ------------------------- /list ------------------------- */}
        </div>
    </div>;
};


ShoppingCartTable.defaultProps = {};


ShoppingCartTable.propTypes = {
    //classes: PropTypes.object.isRequired,
};


export default withCookies(connect(mapStateToProps, mapDispatchToProps)(ShoppingCartTable))