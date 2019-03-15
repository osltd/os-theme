import {useContext} from "react";
import {reducer} from "../context";

export const isMember = (): boolean => {
    const {authReducer} = useContext(reducer);
    return !!authReducer.state.user
};