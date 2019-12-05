import React, {Dispatch, useReducer} from 'react';
import reducer, {Action} from './dispatch'
import initialState, {State} from './state'


export interface CollectionReducer {
    state: State
    dispatch: Dispatch<Action>
}

export function useCollectionReducer(): CollectionReducer {
    const [state, dispatch] = useReducer(reducer, initialState);
    return {state, dispatch}
}


