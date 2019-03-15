import React, {Dispatch, useReducer} from 'react';
import reducer, {Action} from './dispatch'
import initialState, {State} from './state'


export interface FeedReducer {
    state: State
    dispatch: Dispatch<Action>
}

export function useFeedReducer(): FeedReducer {
    const [state, dispatch] = useReducer(reducer, initialState);
    return {state, dispatch}
}


