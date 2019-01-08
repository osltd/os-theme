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
import '../constants/icon/style.css'
import {connect} from "react-redux";
import {CART_INIT_SHOPPING_CART, INIT_FEEDS, INIT_PRODUCTS} from "../constants/actionType";
import agent from '../agent'
import withWidth, {isWidthUp} from "@material-ui/core/withWidth/index";
import Checkout from './Checkout/Overview'
import ConfirmPage from './Layout/ConfirmPage'
import LoadingPage from './Layout/LoadingPage'
import '../constants/Style.css'
import SearchPage from './Search/Overview'
import 'font-awesome/css/font-awesome.min.css'
import _ from 'lodash'

const mapStateToProps = state => ({});


const mapDispatchToProps = dispatch => ({
        initApp: async (shoppingCart, products) => {
            dispatch(
                {
                    type: INIT_PRODUCTS,
                    payload: products,
                }
            )
            dispatch(
                {
                    type: INIT_FEEDS,
                    payload: await agent.Feeds.initFeeds(),
                }
            )
            dispatch({
                type: CART_INIT_SHOPPING_CART,
                payload: shoppingCart,
            })


        },

    }
)

class App extends React.Component {
    componentDidMount() {
        this.initApp().then(()=>null)
    }

    getAllProducts = async (page = 1, products = []) => {
        let data = await agent.Products.initProducts(`?page=${page}`)
        return data.length > 0 ? this.getAllProducts(page + 1, _.concat(products, data)) : products
    }
    initApp = async () => this.props.initApp(JSON.parse(localStorage.getItem('shoppingCart')), await  this.getAllProducts())

    render() {
        return (
            <BrowserRouter>
                <Switch>
                    <ScrollToTop>
                        <ErrorBoundary>
                            <Header/>
                            <div style={(isWidthUp('md', this.props.width)) ? {paddingTop: '76px'} : null}>
                                <Route exact path={'/'} component={mainPage}/>
                                <Route exact path={'/products'} component={Shop}/>
                                <Route exact path={'/feeds'} component={Feed}/>
                                <Route exact path={'/feeds/:id'} component={FeedDetail}/>
                                <Route exact path={'/products/:id'} component={Product}/>
                                <Route exact path={'/checkout'} component={Checkout}/>
                                <Route exact path={'/shoppingCart'} component={ShoppingCart}/>
                                <Route exact path={'/confirmPage/:orderId'} component={ConfirmPage}/>
                                <Route exact path={'/loadingPage'} component={LoadingPage}/>
                                <Route exact path={'/search/:keyword'} component={SearchPage}/>
                            </div>
                            <Footer/>
                        </ErrorBoundary>
                    </ScrollToTop>
                </Switch>
            </BrowserRouter>

        )

    }
}

//todo('add in stock logic')

export default connect(mapStateToProps, mapDispatchToProps)(withWidth()(App))
