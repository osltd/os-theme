import {useProductReducer} from "./Product";
import {Reducer} from "../interfaces/client/Common";
import React, {Context, createContext} from "react";


interface K {
    product: Reducer
}


export const reducer: Context<K> = createContext(
    {
        product: {
            state: {},
            dispatch: function hacked(init) {}
        },

    })

const reducerProvider: React.ComponentType = ({children}) => {
    return <reducer.Provider value={{
        product:useProductReducer()
    }}>
    {children}
    </reducer.Provider>
}


export default reducerProvider