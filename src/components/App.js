import React, {lazy, Suspense, useContext, useEffect} from 'react';
import {connect} from "react-redux";
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import { withCookies } from 'react-cookie';

import _ from 'lodash';

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import "slick-carousel/slick/slick.css"
import "slick-carousel/slick/slick-theme.css"

import '../constants/icon/style.css'
import '../constants/Style.css'



import ErrorBoundary from "./Layout/ErrorHandling";
import ScrollToTop from './Layout/ScrollToTop'

import {
    AUTH_INIT_USER_PROFILE,
    CART_INIT_SHOPPING_CART,
    CATEGORY_INIT_CATEGORY,
    COMMON_INIT_SHOP_INFO,
    INIT_FEEDS,
    INIT_PRODUCTS,
    INIT_CART
} from "../constants/actionType";
import agent from '../agent'
import ConfirmPage from './Layout/ConfirmPage'
import LoadingPage from './Layout/LoadingPage'
import SearchPage from './Search/Overview'
import NotFound from './Layout/NotFound'
import MyCredits from './Layout/MyCredits'
import Register from './Auth/Register/Overview'
import Login from './Auth/Login/Overview'
import Validate from './Layout/Validate'
import actionType from "../context/actionType";
import {reducer} from "../context";









const Header = lazy(() => import('./Layout/Header'))
const Footer = lazy(() => import('./Layout/Footer'))

const mainPage = lazy(() => import('./MainPage/Overview'))
const Feeds = lazy(() => import('./Feed/Overview'))
const Feed = lazy(() => import('./Feed/Detail'))

const ProductsScreen = lazy(() => import('./Shop/Overview'))
const ProductScreen = lazy(() => import('./Product/Detail'))

const ShoppingCart = lazy(() => import('./Cart/Overview'))
const Checkout = lazy(() => import('./Checkout/Overview'))


const mapStateToProps = state => ({
    products: state.product.products,
});


const mapDispatchToProps = dispatch => ({
        initApp: (shoppingCart) => {

            agent.Products.initProducts().then(res =>
                dispatch(
                    {
                        type: INIT_PRODUCTS,
                        payload: res.data.data.rows,
                    }
                )
            ).catch(err => dispatch(
                {
                    type: INIT_PRODUCTS,
                    payload: [],
                }
            ));


            agent.Feeds.initFeeds().then(res => {
                    dispatch(
                        {
                            type: INIT_FEEDS,
                            payload: res.data.data.rows,
                        }
                    )
                }
            ).catch(err => {
                console.log(err)
                dispatch(

                    {
                        type: INIT_FEEDS,
                        payload: [],
                    }
                )
            });


            // get cart items
            agent.Checkout.initCart(shoppingCart).then(res => dispatch(
                {
                    type: INIT_CART,
                    payload: res.data.data.rows,
                }
            )).catch(err => dispatch(

                {
                    type: INIT_CART,
                    payload: [],
                }
            ));


            agent.Auth.getAccount().then(user =>
                dispatch(
                    {
                        type: AUTH_INIT_USER_PROFILE,
                        payload: (user.data && user.data.data) ? user.data.data.consumers[0] : {},
                    }
                )
            ).catch(err => dispatch(
                {
                    type: AUTH_INIT_USER_PROFILE,
                    payload: {},

                }
            ));


            agent.Products.initBusiness().then(res => {

                    if (res.data.data.rows) {
                        dispatch(
                            {
                                type: CATEGORY_INIT_CATEGORY,
                                payload: res.data.data.rows[0].tags.split(','),
                            }
                        );
                        dispatch(
                            {
                                type: COMMON_INIT_SHOP_INFO,
                                payload: res.data.data.rows[0],
                            }
                        );
                        // document.title = res.data.data.rows[0].name
                    }
                }
            ).catch(err => {

                    // document.title = 'One Shop';

                    dispatch(
                        {
                            type: CATEGORY_INIT_CATEGORY,
                            payload: []
                        }
                    )
                }
            );

            // dispatch({
            //     type: CART_INIT_SHOPPING_CART,
            //     payload: shoppingCart,
            // })
        },
        finishLoadingProducts: products =>
            dispatch(
                {
                    type: INIT_PRODUCTS,
                    payload: products,
                }
            )

    }
);

const App = props => {

    const {commonReducer} = useContext(reducer)
    let getAllProducts = async (page = 1, products = []) => {
        let data = await agent.Products.initProducts(`?page=${page}`).then(res => res.data.data.merchandises).catch(err => []);
        return (data && data.length > 0) ? getAllProducts(page + 1, _.concat(products, data)) : products
    };
    
    let initApp = async () => await props.initApp(
        props.cookies.get('cart')
    );


    useEffect(
        () => {
            //   setInterval(()=>agent.Auth.test(),100)
            let storedLocale = localStorage.getItem('locale')
            // console.log(storedLocale)
            if (storedLocale === 'en' || storedLocale === 'zh') {

                commonReducer.dispatch(
                    {
                        type: actionType.common.COMMON_INIT_I18N,
                        payload: {
                            locale: storedLocale
                        }
                    }
                )
            }

            initApp().then(
                async () =>
                    props.finishLoadingProducts(
                        await getAllProducts()
                    )
            );
        }, []);

    return (
        <BrowserRouter>
            <ScrollToTop>
                <ErrorBoundary>
                    <Suspense fallback={() => {}}>
                        <ToastContainer/>
                        <Header/>
                            <Switch>
                                <Route exact path={'/'} component={mainPage}/>
                                <Route exact path={'/404'} component={NotFound}/>
                                
                                <Route exact path={'/articles'} component={Feeds}/>
                                <Route exact path={'/articles/:id'} component={Feed}/>
                                
                                <Route exact path={'/products'} component={ProductsScreen}/>
                                <Route exact path={'/products/:id'} component={ProductScreen}/>

                                <Route exact path={'/shopping-cart'} component={ShoppingCart}/>
                                <Route exact path={'/checkout'} component={Checkout}/>


                                {/* <Route exact path={'/login'} component={Login}/>
                                <Route exact path={'/register'} component={Register}/>
                                
                                <Route exact path={'/confirmPage/:orderId'} component={ConfirmPage}/>
                                <Route exact path={'/loadingPage'} component={LoadingPage}/>
                                <Route exact path={'/search/:keyword'} component={SearchPage}/>
                                <Route exact path={'/validate/:id'} component={Validate}/> */}
                                <Route component={NotFound}/>
                            </Switch>

                        <MyCredits/>

                        <Footer/>
                    </Suspense>
                </ErrorBoundary>
            </ScrollToTop>
        </BrowserRouter>
    )
};

export default withCookies(connect(mapStateToProps, mapDispatchToProps)(App))