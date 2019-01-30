import React, {createContext, useReducer} from 'react';
import reducer from './dispatch'
import initialState from './state'


const Provider: React.ComponentType = ({children}) => {
    const [state, dispatch] = useReducer(reducer, initialState)
    const Store = createContext(state)

    return <Provider value={}>
        {children}
    </Provider>
}