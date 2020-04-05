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
        //backgroundColor: '#f7f7f7',
        //boxShadow: '0px 1px 5px 0px rgba(0,0,0,0.2), 0px 2px 2px 0px rgba(0,0,0,0.14), 0px 3px 1px -2px rgba(0,0,0,0.12)',
        //borderRadius: 4,
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
        padding: '35px 0',
        fontSize : 24
    },

    itemList : {
        display : 'flex',
        flexDirection : 'column',
        width : "100%",
        alignItems : 'center'
    },
    itemWrapper : {
        display : 'flex',
        flexDirection : 'row',
        width : "100%",
        flex : 1,
        flexWrap : 'wrap',
        alignItems : 'center',
        borderBottom : '1px #DDD solid',
        paddingBottom : 15,
        '& > input' : {
            height : 30
        },
        maxWidth : 1000
    },
    thumbnail : {
        paddingRight : 15,
        paddingLeft : 15,
        minWidth : 150,
        '& > img' : {
            objectFit : 'contain',
            width : "100%",
            maxWidth : 150,
            height : "auto"
        },
    },
    infoWrapper : {
        flex : 2,
        padding : 15,
        flexWrap : 'wrap',
        minWidth : 250
    },
    name : {
        fontSize : 18,
        paddingBottom : 5
    },
    variant : {
        '& > i' : {
            fontSize : 14,
            color : "#666"   
        }
    },
    price : {
        display : 'flex',
        flexDirection : 'row',
        alignItems : 'center',
        padding : "0px 15px",
        flex : 1
    },
    qtyBtns : {
        display : 'flex',
        flexDirection : 'column'
    },
    qtyBtn : {
        border : 'none',
        backgroundColor : 'transparent',
        width : 50,
        cursor : "pointer",
        transition : "opacity 0.3s",
        '&:hover' : {
            opacity : 0.6
        },
        '&:disabled' : {
            opacity : 0.3
        },
        height : 25
    },
    qtyValue : {
        fontSize : 18
    },
    subTotal : {
        fontSize : 18,
        fontWeight : 600,
        flex : 1,
        minWidth : 100
    },
    removeBtn : {
        '& > button' : {
            backgroundColor : 'transparent',
            border : 'none'
        }
    },
    summary : {
        display : 'flex',
        flexDirection : 'column',
        alignItems : 'flex-end',
        justifyContent : 'center',
        flexWrap : 'wrap',
        maxWidth : 1000,
        width : "100%"
    },
    grandTotal : {
        fontSize : 24,
        padding : "15px 15px",
        '& > span' : {
            fontSize : 24
        }
    },
    checkoutBtn : {
        cursor : "pointer",
        display : 'flex',
        padding : "10px 30px",
        alignItems : 'center',
        justifyContent : 'center',
        border : '1px black solid',
        borderRadius : 3,
        minWidth : 250,
        maxWidth : 350,
        width : "100%",
        backgroundColor : 'transparent',
        transition : "background-color 0.3s, color 0.3s",
        '&:hover' : {
            backgroundColor : 'black',
            color : 'white'
        }
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