import React, {useContext, useReducer} from 'react'
import {Context} from '../../context'
import {COMMON_EDIT_SEARCH_BAR} from "../../constants/actionType";

export default function Counter({initialCount}) {
    const {state,dispatch} = useContext(
        Context
    )
    console.log('state')
    console.log(
        state.common
    )
    console.log('dispatch')

    console.log(
        dispatch.common
    )
    return (
        <>
            Count: {state.count}
            <button
                onClick={() => dispatch({type: COMMON_EDIT_SEARCH_BAR})}>
                Reset
            </button>
            <button onClick={() => dispatch({type: 'increment'})}>+</button>
            <button onClick={() => dispatch({type: 'decrement'})}>-</button>
        </>
    );
}