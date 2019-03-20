import './materialUIInstall'

import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';
import registerServiceWorker from './registerServiceWorker';
import theme from './theme'
import {MuiThemeProvider} from '@material-ui/core'
import {store} from './store';
import {Provider} from 'react-redux';
import {SnackbarProvider} from 'notistack';
import ReducerContextProvider from './context'
import {ThemeProvider} from '@material-ui/styles'

ReactDOM.render(
    <ReducerContextProvider>
        <Provider store={store}>
            <ThemeProvider theme={theme}>

            <MuiThemeProvider theme={theme}>
                <SnackbarProvider maxSnack={3}>
                    <App/>
                </SnackbarProvider>
            </MuiThemeProvider>
            </ThemeProvider>
        </Provider>
    </ReducerContextProvider>
    , document.getElementById('root'));
registerServiceWorker();
