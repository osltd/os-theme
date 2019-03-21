import React, {useContext, useEffect} from 'react';
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import ErrorBoundary from "./Layout/ErrorHandling";
import ScrollToTop from './Layout/ScrollToTop'
import mainPage from './MainPage/Overview'
import ShoppingCart from './Cart/Overview'
import Header from './Layout/Header'
import Shop from './Shop/Overview'
import Footer from './Layout/Footer'
import Feed from './Feed/Overview'
import Product from './Product/Overview'
import FeedDetail from './Feed/Detail'
import "slick-carousel/slick/slick.css"
import "slick-carousel/slick/slick-theme.css"
import {connect} from "react-redux";
import {
    AUTH_INIT_USER_PROFILE,
    CART_INIT_SHOPPING_CART,
    CATEGORY_INIT_CATEGORY,
    COMMON_INIT_SHOP_INFO,
    INIT_FEEDS,
    INIT_PRODUCTS
} from "../constants/actionType";
import '../constants/icon/style.css'
import agent from '../agent'
import withWidth, {isWidthUp} from "@material-ui/core/withWidth/index";
import Checkout from './Checkout/Overview'
import ConfirmPage from './Layout/ConfirmPage'
import LoadingPage from './Layout/LoadingPage'
import '../constants/Style.css'
import SearchPage from './Search/Overview'
import _ from 'lodash'
import NotFound from './Layout/NotFound'
import MyCredits from './Layout/MyCredits'
import Register from './Auth/Register/Overview'
import Login from './Auth/Login/Overview'
import Validate from './Layout/Validate'
import actionType from "../context/actionType";
import {language} from "../I18N";
import {reducer} from "../context";

const mapStateToProps = state => ({
    products: state.product.products,
});


const mapDispatchToProps = dispatch => ({
        initApp: (shoppingCart) => {

            agent.Products.initProducts().then(res =>
                dispatch(
                    {
                        type: INIT_PRODUCTS,
                        payload: res.data.data.merchandises,
                    }
                )
            ).catch(err => dispatch(
                {
                    type: INIT_PRODUCTS,
                    payload: [],
                }
            ));

            agent.Feeds.initFeeds().then(res =>
                dispatch(
                    {
                        type: INIT_FEEDS,
                        payload: res.data.data.posts,
                    }
                )
            ).catch(err => dispatch(
                {
                    type: INIT_FEEDS,
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

                    if (res.data.data.shops) {
                        dispatch(
                            {
                                type: CATEGORY_INIT_CATEGORY,
                                payload: res.data.data.shops[0].tags.split(','),
                            }
                        );
                        dispatch(
                            {
                                type: COMMON_INIT_SHOP_INFO,
                                payload: res.data.data.shops[0],
                            }
                        );
                        document.title = res.data.data.shops[0].name
                    }
                }
            ).catch(err => {

                    document.title = 'One Shop';

                    dispatch(
                        {
                            type: CATEGORY_INIT_CATEGORY,
                            payload: []
                        }
                    )
                }
            );

            dispatch({
                type: CART_INIT_SHOPPING_CART,
                payload: shoppingCart,
            })
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
    const {commonReducer}= useContext(reducer)
    let getAllProducts = async (page = 1, products = []) => {
        let data = await agent.Products.initProducts(`?page=${page}`).then(res => res.data.data.merchandises).catch(err => []);
        return (data && data.length > 0) ? getAllProducts(page + 1, _.concat(products, data)) : products
    };
    let initApp = async () => await props.initApp(
        JSON.parse(localStorage.getItem('shoppingCart')),
        //todo(init to [] storage)
    );
    useEffect(()=>{
        commonReducer.dispatch(
            {
                type: actionType.common.COMMON_INIT_I18N,
                payload: {locale: language()}
            }
        );
    },[])

    useEffect(
        () => {

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
                    <Header/>
                    <div style={(isWidthUp('md', props.width)) ? {paddingTop: '76px'} : null}>
                        <Switch>
                            <Route exact path={'/'} component={mainPage}/>
                            <Route exact path={'/404'} component={NotFound}/>
                            <Route exact path={'/login'} component={Login}/>
                            <Route exact path={'/register'} component={Register}/>
                            <Route exact path={'/products'} component={Shop}/>
                            <Route exact path={'/feeds'} component={Feed}/>
                            <Route exact path={'/feeds/:id'} component={FeedDetail}/>
                            <Route exact path={'/products/:id'} component={Product}/>
                            <Route exact path={'/checkout'} component={Checkout}/>
                            <Route exact path={'/shoppingCart'} component={ShoppingCart}/>
                            <Route exact path={'/confirmPage/:orderId'} component={ConfirmPage}/>
                            <Route exact path={'/loadingPage'} component={LoadingPage}/>
                            <Route exact path={'/search/:keyword'} component={SearchPage}/>
                            <Route exact path={'/validate/:id'} component={Validate}/>
                            <Route component={NotFound}/>
                        </Switch>
                    </div>
                    <MyCredits/>

                    <Footer/>
                </ErrorBoundary>
            </ScrollToTop>
        </BrowserRouter>

    )

};

//todo('add in stock logic')

export default connect(mapStateToProps, mapDispatchToProps)(withWidth()(App))
