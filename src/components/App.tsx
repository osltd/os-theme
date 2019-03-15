import React, {useContext, useEffect} from 'react';
import {Route, RouteComponentProps, Switch} from 'react-router-dom';
import mainPage from './MainPage'
import ShoppingCart from './Cart'
import Header from './Layout/Header'
import Shop from './Shop'
import Footer from './Layout/Footer'
import Feed from './Feed/Overview'
import ProductOverview from './Product'
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
import Checkout from './Checkout/Overview'
import LoadingPage from './Layout/LoadingPage'
import SearchPage from './Search'
import NotFound from './Layout/NotFound'
import Register from './Auth/Register'
import Login from './Auth/Login'
import {Product} from "../interfaces/server/Product";
import {useThemeWidth} from "../hooks/useThemeWidth";
import {reducer} from "../context";
import actionType from "../context/actionType";
import {language} from "../I18N";
import {getAllProducts} from "./Effect";
import {isMember} from "../hooks/isMember";
import MyCredits from "./Layout/MyCredits";

const mapStateToProps = (state: any) => ({
    products: state.product.products,
});


const mapDispatchToProps = (dispatch: any) => ({
        initApp: (shoppingCart: string) => {
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
        finishLoadingProducts: (products: Array<Product>) =>
            dispatch(
                {
                    type: INIT_PRODUCTS,
                    payload: products,
                }
            )

    }
);

interface Props extends RouteComponentProps {
    [key: string]: any
}

const App: React.FunctionComponent<Props> = props => {
    const {productReducer, feedReducer, authReducer, commonReducer} = useContext(reducer);
    const themeWidth = useThemeWidth();
    const member = isMember();
    let getShoppingCart = (): string => {

        let shoppingCart: string | null = localStorage.getItem('shoppingCart');
        return JSON.parse((shoppingCart) ? shoppingCart : '{}')
    };
    let initApp = async () => await props.initApp(getShoppingCart());

    useEffect(() => window.scrollTo(0, 0), [props.location]);

    useEffect(() => {

        initApp().then(
            async () => {
                commonReducer.dispatch(
                    {
                        type: actionType.common.COMMON_INIT_I18N,
                        payload: {locale: language()}
                    }
                );
                await getAllProducts(productReducer);
                agent.Feeds.initFeeds().then(res =>
                    feedReducer.dispatch(
                        {
                            type: actionType.feed.FEED_INIT_FEEDS,
                            payload: res.data.data.posts,
                        }
                    )
                ).catch(err => feedReducer.dispatch(
                    {
                        type: actionType.feed.FEED_INIT_FEEDS,
                        payload: {
                            feeds: []
                        },
                    }
                ));


            }
        )

    }, []);
    useEffect(
        () => {
            agent.Auth.getOrder();
            agent.Auth.getAccount().then((user: any) => {
                    authReducer.dispatch(
                        {
                            type: actionType.auth.AUTH_INIT_USER,
                            payload: (user.data && user.data.data) ? {
                                user: user.data.data
                            } : {},

                        }
                    );
                    authReducer.dispatch(
                        {
                            type: actionType.auth.AUTH_EDIT_LOADING,
                            payload: {
                                loading: false
                            }
                        }
                    )
                }
            ).catch((err: any) => authReducer.dispatch(
                {
                    type: actionType.auth.AUTH_EDIT_LOADING,
                    payload: {
                        loading: false
                    }
                }
            ))


        }, []
    );
    return (
        <>
            <Header/>
            <MyCredits/>

            <div style={themeWidth.isWidthUp.md ? {paddingTop: '76px'} : {}}>
                <Switch>
                    <Route exact path={'/'} component={mainPage}/>
                    <Route exact path={'/404'} component={NotFound}/>
                    <Route exact path={'/login'} component={Login}/>
                    <Route exact path={'/register'} component={Register}/>
                    <Route exact path={'/products'} component={Shop}/>
                    <Route exact path={'/feeds'} component={Feed}/>
                    <Route exact path={'/feeds/:id'} component={FeedDetail}/>
                    <Route exact path={'/products/:id'} component={ProductOverview}/>
                    <Route exact path={'/checkout'} component={Checkout}/>
                    <Route exact path={'/shoppingCart'} component={ShoppingCart}/>
                    <Route exact path={'/loadingPage'} component={LoadingPage}/>
                    <Route exact path={'/search/:keyword'} component={SearchPage}/>
                    <Route component={NotFound}/>

                </Switch>
            </div>
            <Footer/>
        </>

    )

};

//todo('add in stock logic')

export default connect(mapStateToProps, mapDispatchToProps)(App)
