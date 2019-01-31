import React, {Context, createContext, useReducer} from 'react';
import reducer from './dispatch'
import initialState from './state'


export const Store: Context<{
    [key: string]: any
}> = createContext({})

const Provider: React.ComponentType = ({children}) => {
    const [state, dispatch] = useReducer(reducer, initialState)
    return <Store.Provider value={{state, dispatch}}>
        {children}
    </Store.Provider>
}
export default Provider