import './materialUIInstall'
import React from 'react';
import registerServiceWorker from './registerServiceWorker';
import theme from './theme'
import {store} from './store';
import {Provider} from 'react-redux';
import {ThemeProvider} from '@material-ui/styles'
import {SnackbarProvider} from 'notistack';
import App from './components/App'
import ReactDOM from 'react-dom'
import ReducerContextProvider from './context'
import {BrowserRouter} from "react-router-dom";

ReactDOM.render(
    //react-router-dom make history global
    <ReducerContextProvider>
        <Provider store={store}>
            <ThemeProvider theme={theme}>
                <SnackbarProvider maxSnack={3}>
                    <BrowserRouter>
                        <App/>
                    </BrowserRouter>
                </SnackbarProvider>
            </ThemeProvider>
        </Provider>
    </ReducerContextProvider>
    , document.getElementById('root'));
registerServiceWorker();
