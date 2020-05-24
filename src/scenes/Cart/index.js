import React, { useState } from 'react';
import Oneshop from 'oneshop.web';
import './cart.css';
import { connect } from 'react-redux';
import actions from '../../helpers/actions';
import { MoonLoader } from 'react-spinners';
import { Link } from 'react-router-dom';



// ------------------------ REDUX ------------------------
const mapStateToProps = state => ({
    cart : state.cart,
    shop : state.shop.session
});

const mapDispatchToProps = dispatch => ({
    setCartItems : (items) => dispatch({
        type    : actions.SET_CART_ITEMS,
        payload : items
    })
});
// ------------------------ /REDUX ------------------------


function Cart(props){

    // oneshop instance
    const OS = new Oneshop();
    // loading state
    let [isLoading, setIsLoading] = useState(false);
    // get cart items
    let { cart, shop } = props;

    // ------------------------ HELPERS ------------------------
    function extractThumbnail(item){
        let thumbnail_url = "https://via.placeholder.com/150";
        if((item.media || []).length > 0) thumbnail_url = item.media[0];
        return thumbnail_url;
    }

    
    async function removeItem(itemId){
        // set loading
        setIsLoading(true);
        // success?
        try {
            // remove item
            await OS.cart.item.remove(cart.id, itemId);
            // refresh cart
            await refreshCart();
            // removed
            setIsLoading(false);
        } catch (error) {
            // show error
            alert("Failed to remove item");
            // finish loading
            setIsLoading(false);
        }
    }

    async function editItemQty(itemId, qty){
        // set loading
        setIsLoading(true);
        // success?
        try {
            // remove item
            await OS.cart.item.add(cart.id, {
                id  : itemId,
                qty : qty
            });
            // refresh cart
            await refreshCart();
            // removed
            setIsLoading(false);
        } catch (error) {
            // show error
            alert("Failed to edit item qty");
            // finish loading
            setIsLoading(false);
        }
    }

    async function refreshCart(){
        // get cart item
        try {
            let items = await OS.cart.item.get(cart.id);
            // set items
            props.setCartItems(items);
        } catch (error) {
            // error on get items
            alert("Failed to get cart item");
        }
    }
    // ------------------------ /HELPERS ------------------------



    // ------------------------ REDNERS ------------------------
    function renderList(){
        return <div className="items">
            {
                isLoading ? 
                <div className="loading-mask">
                    <MoonLoader 
                        size={20}
                        color={"#000000"}
                        loading={true}
                    />
                </div> : null
            }
            {(cart.items || []).map((item, idx) => (
                <div key={`item-${idx}`} className="item">
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
                    <div className="form">
                        <div className="unit-price">
                            {(shop.currency || "hkd").toUpperCase()} {item.price.toFixed(2)} <i className="fas fa-times"></i>
                        </div>
                        <div className="qty">
                            {item.qty}
                        </div>
                        <div className="qty-btns">
                            <button onClick={() => editItemQty(item.id, item.qty + 1)}>
                                <i className="fas fa-sort-up"></i>
                            </button>
                            <button onClick={() => item.qty < 2 ? removeItem(item.id) : editItemQty(item.id, item.qty - 1)}>
                                <i className="fas fa-sort-down"></i>
                            </button>
                        </div>
                    </div>
                    <div className="subtotal">
                        {(shop.currency || "hkd").toUpperCase()} {(item.price * item.qty).toFixed(2)}
                    </div>
                    <div className="remove-btn-wrapper">
                        <button onClick={() => removeItem(item.id)}>
                            <i className="fas fa-trash"></i>
                        </button>
                    </div>
                </div>
            ))}
            <div className="checkout-btn-wrapper">
                <div className="total">
                    Total : {(shop.currency || "hkd").toUpperCase()} {(cart.items || []).reduce((total, item) => {
                        return (total + (item.qty * item.price));
                    }, 0).toFixed(2)}
                </div>
                <Link to="/checkout">
                    Checkout
                </Link>
            </div>
        </div>
    }

    function renderPlaceholder(){
        return <div className="placeholder">
            <i className="fas fa-shopping-cart"></i>
            <div className="message">
                Your shopping cart is empty.
            </div>
            <Link to="/products">Shop Now</Link>
        </div>
    }
    // ------------------------ REDNERS ------------------------


    return (
        <div className="cart">
            <h1>My Cart</h1>
            <div className="list">
                {(cart.items || []).length ? renderList() : renderPlaceholder()}
            </div>
        </div>
    );

}

export default connect(mapStateToProps, mapDispatchToProps)(Cart);