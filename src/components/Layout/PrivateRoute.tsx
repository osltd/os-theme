import {Redirect, Route, RouteProps} from "react-router-dom";
import React, {useContext} from 'react'
import {reducer} from "../../context";
import {isMember} from "../../hooks/isMember";
import {LinearProgress} from "@material-ui/core";

interface Props extends RouteProps {
}

const PrivateRoute: React.FunctionComponent<Props> = (props) => {
    const {authReducer} = useContext(reducer);
    const member = isMember();
    const {component} = props;
    let temp = Object.assign({}, props);
    if (authReducer.state.loading) return <LinearProgress/>;
    temp.path = member ? props.path : '/login?needAuth=true';
    return (
        member ? <Route
            {...temp} component={component}
        /> : <Redirect to={'/login?needAuth=true'}/>
    );

};

export default PrivateRoute
