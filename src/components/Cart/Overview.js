import React from 'react';
import {createUseStyles} from 'react-jss';
import {connect} from 'react-redux';

import Cookies from 'universal-cookie';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import NumberFormat from 'react-number-format';

import {redirectUrl, handleImgValid} from "../../api/ApiUtils";
import agent from "../../agent";

import Header from '../Layout/Body/Header';
import LoadingPage from '../Layout/LoadingPage';

import {
    CART_OPERATE_SHOPPING_CART,
    EDIT_PRODUCT_VIEW_MODE,
    PRODUCT_EDIT_FILTER,
    PRODUCT_EDIT_SORT,
    INIT_CART
} from "../../constants/actionType";

import {I18nText} from "../Widget/I18nText";
import {keyOfI18n} from "../../constants/locale/interface";


const cookies = new Cookies();


// styling
const styles = createUseStyles({
    wrapper: {
        padding: '0 9%'
    },
    footerColumn: {
        borderTop: '1px solid rgb(224, 224, 224)'
    }
});


// data
const mapStateToProps = state => ({
    items: state.cart.items,
});


// events
const mapDispatchToProps = dispatch => ({
    deleteItem: id => {
        const cart = cookies.get('cart');
        // delete item
        cart && agent.Checkout.deleteItem(
            cart,
            id
        ).then(res => {
            if (!res.data.result) {
                // return error
                alert((res.data.messages || []).join("\n"));
            } else {
                // reload items
                agent.Checkout.initCart(cart).then(res => dispatch(
                    {
                        type: INIT_CART,
                        payload: res.data.data.rows,
                    }
                )).catch(err => dispatch(
            
                    {
                        type: INIT_CART,
                        payload: [],
                    }
                ))
            }
        })
        .catch(err => {
            // return error
            alert(err.message);
        });
    },



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
        editShoppingCart: (key, value) => dispatch({
            type: CART_OPERATE_SHOPPING_CART,
            payload: {
                key: key,
                value: value,
            },
        })
    }
);


const ShoppingCartTable = props => {
    const classes = styles();
    const {items} = props;

    if (items === null) return <LoadingPage/>;

    return <div>
        <Header
            title={'Shopping Cart'}
            classes={{}}
        />
        <div className={classes.wrapper}>
            <table
                style={{
                    width: '100%',
                    backgroundColor: '#f7f7f7',
                    boxShadow: '0px 1px 5px 0px rgba(0,0,0,0.2), 0px 2px 2px 0px rgba(0,0,0,0.14), 0px 3px 1px -2px rgba(0,0,0,0.12)',
                    borderRadius: 4
                }}
            >
                <thead>
                    <tr>
                        <td
                            style={{
                                color: 'rgba(0, 0, 0, 0.54)'
                            }}
                        ><I18nText keyOfI18n={keyOfI18n.IMAGE}/></td>
                        <td
                            style={{
                                color: 'rgba(0, 0, 0, 0.54)'
                            }}
                        ><I18nText keyOfI18n={keyOfI18n.PRODUCT}/></td>
                        <td
                            style={{
                                color: 'rgba(0, 0, 0, 0.54)'
                            }}
                        ><I18nText keyOfI18n={keyOfI18n.PRICE}/></td>
                        <td
                            style={{
                                color: 'rgba(0, 0, 0, 0.54)'
                            }}
                        ><I18nText keyOfI18n={keyOfI18n.QUANTITY}/></td>
                        <td
                            style={{
                                color: 'rgba(0, 0, 0, 0.54)'
                            }}
                        ><I18nText keyOfI18n={keyOfI18n.TOTAL}/></td>
                        <td
                            style={{
                                color: 'rgba(0, 0, 0, 0.54)'
                            }}
                        ><I18nText keyOfI18n={keyOfI18n.REMOVE}/></td>
                    </tr>
                </thead>
                <tbody>
                    {items.map((item, idx) => <tr
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
                            <input type="number" value={item.qty}/>    
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
                    </tr>)}
                </tbody>
                <tfoot>
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
                                // onClick={e => browserHistory.push('/checkout')}
                            >
                                <I18nText keyOfI18n={keyOfI18n.CHECKOUT}/>
                            </button>
                        </td>
                    </tr>
                </tfoot>
            </table>
        </div>
    </div>;
};


// ShoppingCartTable.propTypes = {
//     classes: PropTypes.object.isRequired,
// };


export default connect(mapStateToProps, mapDispatchToProps)(ShoppingCartTable)