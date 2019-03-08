import React, {Dispatch, useReducer} from 'react';
import reducer, {Action} from './dispatch'
import initialState, {State} from './state'


export interface AuthReducer {
    state: State
    dispatch: Dispatch<Action>
}

export function useAuthReducer(): AuthReducer {
    const [state, dispatch] = useReducer(reducer, initialState);
    return {state, dispatch}
}


