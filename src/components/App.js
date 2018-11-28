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

const mapStateToProps = state => ({});


const mapDispatchToProps = dispatch => ({
        initApp: async (data) => {
            dispatch(
                {
                    type: INIT_PRODUCTS,
                    payload: await agent.Products.initProducts(),
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
                payload: data,
            })


        },

    }
)

class App extends React.Component {

    componentDidMount() {

        this.props.initApp(JSON.parse(localStorage.getItem('shoppingCart')))
    }

    render() {
        return (
            <BrowserRouter>
                <Switch>
                    <ScrollToTop>
                        <ErrorBoundary>
                            <Header/>
                            <div style={(isWidthUp('md', this.props.width)) ? {paddingTop: '76px'} : null}>
                                <Route exact path={'/'} component={mainPage}/>
                                <Route exact path={'/shop'} component={Shop}/>
                                <Route exact path={'/feed'} component={Feed}/>
                                <Route exact path={'/feed/:id'} component={FeedDetail}/>
                                <Route exact path={'/shop/:id'} component={Product}/>
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
