import React, {useReducer} from 'react';
import App from '../components/App';
import {history, store} from './store';
import {Context} from '../context'
import Common from './dispatch/common';
import CommonInit from './state/common'
import {combineReducers} from "redux";
import {COMMON_EDIT_SEARCH_BAR} from "../constants/actionType";

const reducer = combineReducers({
    CommonInit

})
const initialState=(
    {
        Common,

    }
)
export default (props) => {

    const [state, dispatch] = useReducer(reducer, initialState,{
        type:COMMON_EDIT_SEARCH_BAR
    })
    return <Context.Provider value={{state, dispatch}}>
        <App/>
    </Context.Provider>


}