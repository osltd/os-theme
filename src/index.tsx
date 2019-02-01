import React from 'react';
import registerServiceWorker from './registerServiceWorker';
import theme from './theme'
import {MuiThemeProvider} from '@material-ui/core'
import {store} from './store';
import {Provider} from 'react-redux';
import {ThemeProvider} from '@material-ui/styles'
import {SnackbarProvider} from 'notistack';
import App from './components/App'
import ReactDOM from 'react-dom'
import Reducer from './store/store'
import createMuiTheme from "@material-ui/core/styles/createMuiTheme";

ReactDOM.render(
    //react-router-dom make history global
    <Reducer>
        <Provider store={store}>
                <ThemeProvider theme={theme}>
                    <SnackbarProvider maxSnack={3}>
                        <App/>
                    </SnackbarProvider>
                </ThemeProvider>
        </Provider>
    </Reducer>
    , document.getElementById('root'));
registerServiceWorker();
