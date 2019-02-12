import React, {Context, createContext, Dispatch, useReducer} from 'react';
import reducer, {Action} from './dispatch'
import initialState, {State} from './state'

interface T {
    state:State
    dispatch:Dispatch<Action>
}
const useReducerInContext = ():T=> {
    const [state, dispatch] = useReducer(reducer, initialState);
    return {state, dispatch}
}
export const Reducer: Context<T> = createContext({
    state: initialState,
    dispatch: function hacked(init) {
        //useless func just for typechecking
    }
})

const Provider: React.ComponentType = ({children}) => {
    return <Reducer.Provider value={useReducerInContext()}>
        {children}
    </Reducer.Provider>
}


export default Provider