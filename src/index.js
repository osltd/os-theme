import React, {useReducer} from 'react';
import ReactDOM from 'react-dom';
import registerServiceWorker from './registerServiceWorker';
import theme from './theme'
import {MuiThemeProvider} from '@material-ui/core'
import {history, store} from './store';
import {Provider} from 'react-redux';
import {SnackbarProvider} from 'notistack';
import App from './store/store'
ReactDOM.render(
    <Provider store={store}>

        <MuiThemeProvider theme={theme}>
            <SnackbarProvider maxSnack={3}>
                <App/>
            </SnackbarProvider>
        </MuiThemeProvider>
    </Provider>
    , document.getElementById('root'));
registerServiceWorker()
