import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';

import registerServiceWorker from './registerServiceWorker';
import {store} from './store';
import ReducerContextProvider from './context';

import App from './components/App';


ReactDOM.render(
    <ReducerContextProvider>
        <Provider store={store}>
            <App/>
        </Provider>
    </ReducerContextProvider>,
    document.getElementById('root')
);


registerServiceWorker();