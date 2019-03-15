import {ProductReducer, useProductReducer} from "./Product";
import {FeedReducer, useFeedReducer} from "./Feed";

import {CommonReducer, useCommonReducer} from "./Common";
import {state as commonInitState} from "./Common/state";


import React, {Context, createContext} from "react";
import {AuthReducer, useAuthReducer} from "./Auth";


interface ContextReducer {
    productReducer: ProductReducer
    feedReducer: FeedReducer
    commonReducer: CommonReducer
    authReducer: AuthReducer

}

export const initReducer = {
    state: {}, dispatch: (args: any) => {
    }
};
export const reducer: Context<ContextReducer> = createContext(
    {
        productReducer: initReducer,
        feedReducer: initReducer,
        authReducer: initReducer,
        commonReducer: {
            state: commonInitState,
            dispatch: (args: any) => {
            }
        }

    });

const reducerContextProvider: React.ComponentType = ({children}) => {

    const value = {
        productReducer: useProductReducer(),
        feedReducer: useFeedReducer(),
        commonReducer: useCommonReducer(),
        authReducer: useAuthReducer(),

    };
    return <reducer.Provider value={value}>
        {children}
    </reducer.Provider>
};


export default reducerContextProvider