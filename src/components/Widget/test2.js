import React, {useContext} from 'react'
import {Context} from '../../context/Product'

export default function Counter({initialCount}) {
    const {state, dispatch} = useContext(
        Context
    );
    console.log('state test2');
    console.log(
        state.Common
    );
    console.log('dispatch test2');

    console.log(
        dispatch
    );
    return (
        <>
            Count: {state.count}
            <button
                onClick={() => dispatch({type: 'reset', payload: initialCount})}>
                Reset
            </button>
            <button onClick={() => dispatch({type: 'increment'})}>+</button>
            <button onClick={() => dispatch({type: 'decrement'})}>-</button>
        </>
    );
}