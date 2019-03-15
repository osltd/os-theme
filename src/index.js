import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';
import registerServiceWorker from './registerServiceWorker';
import theme from './theme'
import {MuiThemeProvider} from '@material-ui/core'
import {history, store} from './store';
import {Provider} from 'react-redux';
import {SnackbarProvider} from 'notistack';
import {ConnectedRouter} from 'react-router-redux';

ReactDOM.render(
    <Provider store={store}>
            <MuiThemeProvider theme={theme}>
                <SnackbarProvider maxSnack={3}>
                    <App/>
                </SnackbarProvider>
            </MuiThemeProvider>
    </Provider>, document.getElementById('root'));
registerServiceWorker()
