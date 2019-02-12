import React from 'react';
import {Theme} from '@material-ui/core/styles';
import {List, Typography} from '@material-ui/core';
import ListItem from '@material-ui/core/ListItem';
import {redirectUrl} from "../../api/ApiUtils";
import Dialog from './Dialog'
import MyAccount from '../Auth/Accounts/Overview'
import createStyles from "@material-ui/core/styles/createStyles";
import {makeStyles} from "@material-ui/styles";
import {RouteComponentProps, withRouter} from "react-router-dom";

const useStyles = makeStyles((theme: Theme) => createStyles({
    root: {
        width: '100%',
        maxWidth: 360,
    }, item: {
        padding: 0,
        color: 'white',
    }
}));

interface Props extends RouteComponentProps {

}

const FooterList: React.FunctionComponent<Props> = props => {
    const classes = useStyles();
    const {history} = props;
    const items = [
        {label: "Shopping Cart", url: "shoppingcart"}
        , {label: "Checkout", url: "checkout"}
        , {label: "My Account", url: ""}
        , {label: "Login", url: "login"}
        , {label: "Register", url: "register"}
    ];
    return (
        <div className={classes.root}>
            <List component="nav">
                {
                    items.map((n, i) =>
                        (n.label === 'My Account') ? <Dialog
                                key={i}
                                opacity={true}
                                title={
                                    <ListItem className={classes.item} button>
                                        <Typography variant={'body1'} color={'inherit'}
                                        > {n.label}</Typography>
                                    </ListItem>}
                                dialog={<MyAccount/>}
                            /> :
                            <ListItem className={classes.item} button key={i}>
                                <Typography variant={'body1'} color={'inherit'}
                                            onClick={() =>
                                                redirectUrl(`/${n.url}`, history)
                                            }>
                                    > {n.label}</Typography>
                            </ListItem>
                    )
                }


            </List>
        </div>
    )
};

export default withRouter(FooterList)