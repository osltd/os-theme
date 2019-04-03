import React, {Dispatch, useReducer} from 'react';
import reducer, {Action} from './dispatch'
import initialState, {State} from './state'

export interface ShopReducer {
    state: State
    dispatch: Dispatch<Action>
}

export function useShopReducer(): ShopReducer {
    const [state, dispatch] = useReducer(reducer, initialState);
    return {state, dispatch}
}