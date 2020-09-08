import React, { useEffect } from 'react';
import {BrowserRouter} from 'react-router-dom';
import Routes from '../Routes';
import { connect } from 'react-redux';
import actions from '../../helpers/actions';
import oneshop from 'oneshop.web';
import { MoonLoader } from 'react-spinners';
import Cookies from 'universal-cookie';

const mapStateToProps = (state, ownProps) => ({
    shop    : state.shop.session,
    cart    : state.cart,
    profile : state.user.profile
});

const mapDispatchToProps = (dispatch, ownProps) => ({
    setShop : (shop) => dispatch({
        type    : actions.SET_SHOP,
        payload : shop
    }),
    initCart : (cartId) => dispatch({
        type    : actions.INIT_CART,
        payload : cartId
    }),
    setCartItems : (items) => dispatch({
        type    : actions.SET_CART_ITEMS,
        payload : items
    }),
    setProfile : profile => dispatch({
        type    : actions.SET_USER,
        payload : profile
    })
});

function App(props){

    // create oneshop instance
    const OS = new oneshop();
    // setup cookies
    const cookies = new Cookies();
    // get props
    const { shop, cart, profile } = props;
    
    // ---------------- LIFECYCLE ----------------
    useEffect(() => {
        // shop not loaded yet
        if(!shop){
            // set get shop handler
            (function getShop(){
                OS.shop.settings()
                // get shop settings
                .then(rows => {
                    // get shop
                    props.setShop(rows[0]);
                })
                .catch(error => {
                    // try again
                    getShop();
                });
            })();
        }
        // load cart items if cart exists
        !cart.id ? setupCart() : validateCart();
        // profile not exists?
        if(!profile) getProfile();
    }, []);
    // ---------------- /LIFECYCLE ----------------


    // ---------------- HELPERS ----------------
    async function setupCart(){
        try {
            // retrieve cart id
            let cartId = (await OS.cart.create()).rows[0].id;
            // save cart id
            cookies.set('cartId', cartId, { samesite : 'None', secure : true });
            // save to state
            props.initCart(cartId);
        } catch(error) {
            // retry
            setupCart();
        }
    }

    async function validateCart(){
        try {
            // try to get items
            let cart_items = await OS.cart.item.get(cart.id);    
            // save cart items
            props.setCartItems(cart_items);
        } catch (error) {
            // cart not valid, setup
            setupCart();
        }
    }

    async function getProfile(){
        try {
            // try to get items
            let profile = await OS.consumer.profile.get();
            // save profile
            props.setProfile(profile[0]);
        } catch (error) {}
    }
    // ---------------- /HELPERS ----------------

    return (
        // shop and cart not loaded yet?
        shop == null || cart.id == null? 
        // show loader
        <div style={{ width:"100%", height:"100vh", display:"flex", justifyContent: "center", "alignItems":"center" }}>
            <MoonLoader 
                size={30}
                color={"#000000"}
                loading={true}
            /> 
        </div>
        :
        // show web
        <BrowserRouter>
            <Routes/>
        </BrowserRouter>
    );
}

export default connect(mapStateToProps, mapDispatchToProps)(App);