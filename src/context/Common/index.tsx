import React, {Dispatch, useReducer} from 'react';
import reducer, {Action} from './dispatch'
import initialState, {State} from './state'

export interface CommonReducer {
    state: State
    dispatch: Dispatch<Action>
}

export function useCommonReducer(): CommonReducer {
    const [state, dispatch] = useReducer(reducer, initialState);
    return {state, dispatch}
}


