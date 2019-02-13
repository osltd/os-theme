import React, {Dispatch, useReducer} from 'react';
import reducer from './dispatch'
import initialState, {State} from './state'
import {Action} from "../Product/dispatch";

interface Reducer {
    state: State
    dispatch: Dispatch<Action>
}

export function useProductReducer(): Reducer {
    const [state, dispatch] = useReducer(reducer, initialState);
    return {state, dispatch}
}


