import {ProductReducer, useProductReducer} from "./Product";
import {FeedReducer, useFeedReducer} from "./Feed";
import {CollectionReducer, useCollectionReducer} from "./Collection";

import {CommonReducer, useCommonReducer} from "./Common";
import {state as commonInitState} from "./Common/state";


import React, {Context, createContext} from "react";
import {AuthReducer, useAuthReducer} from "./Auth";


interface ContextReducer {
    productReducer: ProductReducer
    feedReducer: FeedReducer
    commonReducer: CommonReducer
    authReducer: AuthReducer
    collectionReducer: CollectionReducer

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
        collectionReducer: initReducer,
        commonReducer: {
            state: commonInitState,
            dispatch: (args: any) => {}
        }

    });

const reducerContextProvider: React.ComponentType = ({children}) => {

    const value = {
        productReducer: useProductReducer(),
        feedReducer: useFeedReducer(),
        collectionReducer: useCollectionReducer(),
        commonReducer: useCommonReducer(),
        authReducer: useAuthReducer(),

    };
    return <reducer.Provider value={value}>
        {children}
    </reducer.Provider>
};


export default reducerContextProvider