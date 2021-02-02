import React from 'react';
import { Route, Switch, withRouter, Redirect} from 'react-router-dom';
import './routes.css';

import NavBar from '../../components/NavBar';
import Footer from '../../components/Footer';
import Home from '../Home';
import Product from '../Product';
import ProductDetail from '../Product/Detail';
import Blog from '../Blog';
import BlogDetail from '../Blog/Detail';
import NotFound from '../404';
import Checkout from '../Checkout';
import User from '../User';
import Register from '../User/Register';
import Login from '../User/Login';
import Cart from '../Cart';
import OrderSnapshot from '../Checkout/OrderSnapshot';
import Page from '../Page';
import Chat from '../../components/Chat';

function Routes(){

    return (
        <div className="wrapper">
            <NavBar/>
            <div className="scene">
                <Switch>
                    <Route path="/" component={Product} exact />
                    <Route path="/products" component={Product} exact />
                    <Route path="/products/:id" component={ProductDetail} exact />
                    <Route path="/blogs" component={Blog} exact />
                    <Route path="/blogs/:id" component={BlogDetail} exact />
                    <Route path="/pages/:file" component={Page} exact />
                    <Route path="/users" component={User} exact/>
                    <Route path="/users/new" component={Register} exact/>
                    <Route path="/users/login" component={Login} exact/>
                    <Redirect from="/login" to="/users/login" exact/>
                    <Route path="/checkout" component={Checkout} exact />
                    <Route path="/checkout/success" component={OrderSnapshot} exact/>
                    <Route path="/cart" component={Cart} exact />
                    <Route component={NotFound} />
                </Switch>
            </div>
            <Chat />
            <Footer/>
        </div>
    )
}

export default withRouter(Routes);