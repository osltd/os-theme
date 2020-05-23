import React, { useEffect } from 'react';
import Oneshop from 'oneshop.web';
import './order.snapshot.css';
import { useLocation, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import actions from '../../../helpers/actions';
import Tooltip from 'react-tooltip';
import Cookies from 'universal-cookie';

// ------------------------ REDUX ------------------------
const mapStateToProps = state => ({
    shop : state.shop.session
});

const mapDispatchToProps = dispatch => ({
    setCartItems : (items) => dispatch({
        type    : actions.SET_CART_ITEMS,
        payload : items
    }),
    initCart : (cartId) => dispatch({
        type    : actions.INIT_CART,
        payload : cartId
    })
});
// ------------------------ /REDUX ------------------------


function OrderSnapshot(props) {

    // oneshop instance
    const OS = new Oneshop();
    // get passed props
    let order = (useLocation() || {}).state || null;
    // get cart items
    let { shop } = props;
    // get shop currency
    const currency = (shop.currency || "hkd").toUpperCase();

    // ---------------- LIFECYCLE ----------------
    useEffect(() => {
        // if order exists, reset cart
        if(order != null) resetCart();
    }, []);
    // ---------------- /LIFECYCLE ----------------


    // ------------- HELPER -------------
    function extractThumbnail(item){
        let thumbnail_url = "https://via.placeholder.com/150";
        if((item.media || []).length > 0) thumbnail_url = item.media[0];
        return thumbnail_url;
    }

    async function resetCart(){
        try {
            // retrieve cart id
            let cartId = (await OS.cart.create()).rows[0].id;
            // setup cookies
            const cookies = new Cookies();
            // save cart id
            cookies.set('cartId', cartId);
            // save to state
            props.initCart(cartId);
            // reset cart items
            props.setCartItems([]);
        } catch(error) {
            // retry
            resetCart();
        }
    }
    // ------------- HELPER -------------

    return order != null ? <div className="order-snapshot">
        <div className="order-snapshot-wrapper">
            <div className="content">
                <h1>Thank You!</h1>
                <div className="order-id">
                    <b>Order #{order.id}</b>
                </div>
                <div className="order-detail">
                    <div className="order-detail-row">
                        <div className="icon">
                            <i className="fas fa-male"></i>    
                        </div> 
                        {order.contact.first_name} {order.contact.last_name}
                    </div>
                    <div className="order-detail-row">
                        <div className="icon">
                            <i className="fas fa-envelope"></i> 
                        </div>
                        {order.contact.email}
                    </div>
                    <div className="order-detail-row">
                        <div className="icon">
                            <i className="fas fa-phone"></i>
                        </div>
                        {order.contact.phone}
                    </div>
                    <div className="order-detail-row">
                        <div className="icon">
                            <i className="fas fa-map-marker-alt"></i>
                        </div>
                        {order.shipping.address}
                    </div>
                    <div className="order-detail-row">
                        <div className="icon">
                            <i className="fas fa-sticky-note"></i>
                        </div>
                        {order.notes || "---"}
                    </div>
                </div>
                <div className="items">
                    {(order.items || []).map(item => (<div key={`order-snapshot-item-${item.id}`} className="item">
                        <div className="thumbnail">
                            <img src={extractThumbnail(item)} alt={`image of ${item.name}`}/>
                        </div>
                        <div className="info">
                            <div className="name">
                                {item.name}
                            </div>
                            <div className="description">
                                {item.variant}
                            </div>
                        </div>
                        <div className="unit-price">
                            {currency} {item.price.toFixed(2)} <i className="fas fa-times"></i>
                        </div>
                        <div className="qty">
                            {item.qty}
                        </div>
                        <div className="subtotal">
                            {currency} {(item.price * item.qty).toFixed(2)}
                        </div>
                    </div>))}
                </div>
                <div className="order-summary">
                    <div className="subtotal">
                        Subtotal: {currency} {order.sub_total.toFixed(2)}
                    </div>
                    {
                        (((order.breakdowns || [])[0] || {}).discounts || []).length > 0 ?
                        <div className="discount">
                            <i data-tip={`${order.breakdowns[0].discounts.map((d, idx) => `${idx+1}. <b>${d.title}</b> -${currency}${d.amount}`).join("<br/>")}`} className="fas fa-info-circle"></i> Discount: {currency} {order.discounted_amount.toFixed(2)}
                            <Tooltip type="dark" html={true} />
                        </div> : null
                    }
                    <div className="total">
                        Total: {currency} {order.gross_total.toFixed(2)}
                    </div>
                </div>
            </div>
        </div>
    </div> : <Redirect to="/products" />;
}


export default connect(mapStateToProps, mapDispatchToProps)(OrderSnapshot);

