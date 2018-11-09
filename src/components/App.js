import React from 'react';
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import ErrorBoundary from "./Layout/ErrorHandling";
import ScrollToTop from './Layout/ScrollToTop'
import mainPage from './MainPage/Overview'
import mainPage2 from './MainPage/Overview2'
import Header from './Layout/Header'
import Shop from './Shop/Overview'
import Footer from './Layout/Footer'
import Feed from './Feed/Overview'
import Product from './Product/Overview'
import "slick-carousel/slick/slick.css"
import "slick-carousel/slick/slick-theme.css"
import '../constants/icon/style.css'
class App extends React.Component {

    componentDidMount() {
    }

    render() {
        return (
            <BrowserRouter>
                <Switch>
                    <ScrollToTop>
                        <ErrorBoundary>
                            <Header/>
                            <div style={ {paddingTop:'64px'}}>
                            <Route exact path={'/'} component={mainPage}/>
                            <Route exact path={'/2'} component={mainPage2}/>
                            <Route exact path={'/shop'} component={Shop}/>
                            <Route exact path={'/feed'} component={Feed}/>
                            <Route exact path={'/shop/:id'} component={Product}/>

                            </div>
                            <Footer/>
                        </ErrorBoundary>
                    </ScrollToTop>
                </Switch>
            </BrowserRouter>
        )

    }
}


export default (App);
