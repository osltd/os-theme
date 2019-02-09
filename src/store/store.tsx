import React, {Context, createContext, useReducer} from 'react';
import reducer from './dispatch'
import initialState from './state'


export const Reducer: Context<{
    [key: string]: any
}> = createContext({});

const Provider: React.ComponentType = ({children}) => {
    const [state, dispatch] = useReducer(reducer, initialState);
    return <Reducer.Provider value={{state, dispatch}}>
        {children}
    </Reducer.Provider>
};
export default Provider