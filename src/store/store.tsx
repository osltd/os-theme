import React, {createContext, useReducer} from 'react';
import App from '../components/App';
import reducer from './dispatch'
import initialState from './state'
import {actionType} from "../constants/actionType";
import {Product} from "../interfaces/server/Product";

export interface Action {
    type: actionType
    payload: any
}

export interface State {
    products: Array<Product> | null
}

const Store = createContext({})

export default () => {
    const [state, dispatch] = useReducer(reducer, initialState)

    return <Store.Provider value={{state, dispatch}}>
        <App/>
    </Store.Provider>
}