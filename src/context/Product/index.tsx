import React, {useReducer} from 'react';
import reducer from './dispatch'
import initialState from './state'
import {Reducer} from "../../interfaces/client/Common";


export function useProductReducer(): Reducer {
    const [state, dispatch] = useReducer(reducer, initialState);
    return {state, dispatch}
}


