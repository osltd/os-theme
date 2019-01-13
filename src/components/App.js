import React from 'react';
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
    AUTH_INIT_TOKEN,
    AUTH_INIT_USER_PROFILE,
    CART_INIT_SHOPPING_CART,
    CATEGORY_INIT_CATEGORY,
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


const mapStateToProps = state => ({});


const mapDispatchToProps = dispatch => ({
        initApp: async (shoppingCart, products, token, user, category) => {
            console.log('user profile')
            dispatch(
                {
                    type: INIT_FEEDS,
                    payload: await agent.Feeds.initFeeds(),
                }
            )
            dispatch(
                {
                    type: INIT_PRODUCTS,
                    payload: products,
                }
            )
            dispatch(
                {
                    type: CATEGORY_INIT_CATEGORY,
                    payload: category,
                }
            )
            dispatch({
                type: CART_INIT_SHOPPING_CART,
                payload: shoppingCart,
            })

            //todo('check the token valid  IF VALIDED')
            dispatch(
                {
                    type: AUTH_INIT_TOKEN,
                    payload: token,

                }
            )
            //todo('if valid get user profile')

            dispatch(
                {
                    type: AUTH_INIT_USER_PROFILE,
                    payload:  (user.data&&user.data.data)?user.data.data.consumers[0]:{},

                }
            )
        },

    }
)

class App extends React.Component {
    initBusiness = async () => {
        let shops = await  agent.Products.initBusiness()
        return shops.find(n => n.id === 14).tags.split(',')

    }
    deleteId = (id = 67) => {
        agent.Checkout.deleteProduct(id)
        return id === 1 ? null : this.deleteId(id - 1)

    }
    getAllProducts = async (page = 1, products = []) => {
        let data = await agent.Products.initProducts(`?page=${page}`)
        return (data && data.length > 0) ? this.getAllProducts(page + 1, _.concat(products, data)) : products
    }
    initApp = async () => this.props.initApp(
        JSON.parse(localStorage.getItem('shoppingCart')),
        await  this.getAllProducts(),
        localStorage.getItem('token'),
        await agent.Auth.getAccount().then(res=>res).catch(err=>err),
        await this.initBusiness()
    )

    componentDidMount() {
        this.initApp().then(() => null)
    }

    render() {
        return (
            <BrowserRouter>
                <ScrollToTop>
                    <ErrorBoundary>
                        <Header/>
                        <MyCredits/>
                        <div style={(isWidthUp('md', this.props.width)) ? {paddingTop: '76px'} : null}>
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
                                <Route component={NotFound}/>
                            </Switch>
                        </div>
                        <Footer/>
                    </ErrorBoundary>
                </ScrollToTop>
            </BrowserRouter>

        )

    }
}

//todo('add in stock logic')

export default connect(mapStateToProps, mapDispatchToProps)(withWidth()(App))
