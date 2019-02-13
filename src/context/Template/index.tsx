import React, {Dispatch, useReducer} from 'react';
import reducer, {Action} from './dispatch'
import initialState,{State} from './state'


interface ProductReducer {
    state: State
    dispatch: Dispatch<Action>
}

export function useProductReducer(): ProductReducer {
    const [state, dispatch] = useReducer(reducer, initialState);
    return {state, dispatch}
}


