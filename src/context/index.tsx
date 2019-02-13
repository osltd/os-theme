import {ProductReducer, useProductReducer} from "./Product";
import {FeedReducer, useFeedReducer} from "./Feed";
import React, {Context, createContext} from "react";


interface ContextReducer {
    productReducer: ProductReducer
    feedReducer: FeedReducer
}

const initReducer = {
    state: {}, dispatch: (args: any) => {
    }
}
export const reducer: Context<ContextReducer> = createContext(
    {
        productReducer: initReducer,
        feedReducer: initReducer,
    })

const reducerContextProvider: React.ComponentType = ({children}) => {

    const value = {
        productReducer: useProductReducer(),
        feedReducer: useFeedReducer(),


    }
    return <reducer.Provider value={value}>
        {children}
    </reducer.Provider>
}


export default reducerContextProvider