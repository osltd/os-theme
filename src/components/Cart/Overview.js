import React from 'react';
import {connect} from 'react-redux';
import {createUseStyles} from 'react-jss';
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


// styling
const styles = createUseStyles({
    wrapper: {
        padding: '0 9%'
    },
    table: {
        width: '100%',
        backgroundColor: '#f7f7f7',
        boxShadow: '0px 1px 5px 0px rgba(0,0,0,0.2), 0px 2px 2px 0px rgba(0,0,0,0.14), 0px 3px 1px -2px rgba(0,0,0,0.12)',
        borderRadius: 4,
        padding : "15px"
    },
    headerColumn: {
        color: 'rgba(0, 0, 0, 0.54)'
    },
    footerColumn: {
        borderTop: '1px solid rgb(224, 224, 224)'
    },
    placeholder: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
        padding: '35px 0'
    }
});


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
            <table className={classes.table}>
                <thead>
                    <tr>
                        <td className={classes.headerColumn}><I18nText keyOfI18n={keyOfI18n.IMAGE}/></td>
                        <td className={classes.headerColumn}><I18nText keyOfI18n={keyOfI18n.PRODUCT}/></td>
                        <td className={classes.headerColumn}><I18nText keyOfI18n={keyOfI18n.PRICE}/></td>
                        <td className={classes.headerColumn}><I18nText keyOfI18n={keyOfI18n.QUANTITY}/></td>
                        <td className={classes.headerColumn}><I18nText keyOfI18n={keyOfI18n.TOTAL}/></td>
                        <td className={classes.headerColumn}><I18nText keyOfI18n={keyOfI18n.REMOVE}/></td>
                    </tr>
                </thead>
                <tbody>
                    {items.length > 0 ? items.map((item, idx) => <tr
                        key={idx}
                    >
                        <td>
                            <img
                                src={handleImgValid(item.media[0])}
                                className={classes.img}
                                height="65"
                            />    
                        </td>
                        <td>
                            <div>{item.name}</div>
                            <div>{item.variant}</div>
                        </td>
                        <td>
                            <NumberFormat
                                value={item.price}
                                thousandSeparator={true}
                                prefix={'HK$'}
                                displayType={'text'}
                            />
                        </td>
                        <td>
                            <input
                                type="number"
                                name={item.id}
                                value={item.qty}
                                onChange={e => props.updateItemQty(e.target.name, e.target.value)}
                            />    
                        </td>
                        <td>
                            <NumberFormat
                                value={item.qty*item.price}
                                thousandSeparator={true}
                                prefix={'HK$'}
                                displayType={'text'}
                            />
                        </td>
                        <td>
                            <button
                                type="button"
                                className={classes.binIcon + ' ' + 'icon-bin'}
                                onClick={e => props.deleteItem(item.id)}
                            />
                        </td>
                    </tr>) : <tr>
                        <td colSpan="6">
                            <div className={classes.placeholder}>
                                <div>
                                    <I18nText keyOfI18n={keyOfI18n.CHECKOUT_YOU_HAVE_NOT_PUT_ANY_ITEMS_IN_CART}/>
                                </div>
                                <div>
                                    <I18nText keyOfI18n={keyOfI18n.GOTO}/>
                                    &nbsp;
                                    <button
                                        type='button'
                                        onClick={e => props.history.push('/products')}

                                    >
                                        <I18nText keyOfI18n={keyOfI18n.PRODUCTS}/>
                                    </button>
                                </div>
                            </div>
                        </td>
                    </tr>}
                </tbody>
                {items.length > 0 && <tfoot>
                    <tr>
                        <td colSpan="4" className={classes.footerColumn}>
                            <I18nText keyOfI18n={keyOfI18n.TOTAL}/>
                        </td>
                        <td className={classes.footerColumn}>
                            <NumberFormat
                                value={items.reduce((total, item) => total + (item.price * item.qty), 0)}
                                thousandSeparator={true}
                                prefix={'HK$'}
                                displayType={'text'}
                            />
                        </td>
                        <td className={classes.footerColumn}>
                            <button
                                type="button"
                                onClick={e => history.push('/checkout')}
                            >
                                <I18nText keyOfI18n={keyOfI18n.CHECKOUT}/>
                            </button>
                        </td>
                    </tr>
                </tfoot>}
            </table>
        </div>
    </div>;
};


ShoppingCartTable.defaultProps = {};


ShoppingCartTable.propTypes = {
    //classes: PropTypes.object.isRequired,
};


export default withCookies(connect(mapStateToProps, mapDispatchToProps)(ShoppingCartTable))