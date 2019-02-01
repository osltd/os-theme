import {applyMiddleware, createStore} from 'redux';
import {composeWithDevTools} from 'redux-devtools-extension/developmentOnly';
import reducer from './reducer';
import {routerMiddleware} from 'react-router-redux'
import createHistory from 'history/createBrowserHistory';

export const historyRouter = createHistory();

// Build the middleware for intercepting and dispatching navigation actions
const myRouterMiddleware = routerMiddleware(historyRouter);

const getMiddleware = () => {

    if (process.env.NODE_ENV === 'production') {
        return applyMiddleware(myRouterMiddleware,);
    } else {
        // Enable additional logging in non-production environments.
        return applyMiddleware(myRouterMiddleware,
            //  createLogger()
        )
    }
};

export const store = createStore(
    reducer, composeWithDevTools(getMiddleware()));
