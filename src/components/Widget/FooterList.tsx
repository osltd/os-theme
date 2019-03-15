import React from 'react';
import PropTypes from 'prop-types';
import {History} from 'history'
import {Theme, withStyles} from '@material-ui/core/styles';
import {List, Typography} from '@material-ui/core';
import ListItem from '@material-ui/core/ListItem';
import {redirectUrl} from "../../api/ApiUtils";
import Dialog from './Dialog'
import MyAccount from '../Auth/Accounts/Overview'
import createStyles from "@material-ui/core/styles/createStyles";
import {MaterialUIClasses} from "../../interfaces/client/Common";

const styles = (theme: Theme) => createStyles({
    root: {
        width: '100%',
        maxWidth: 360,
    }, item: {
        padding: 0,
        color: 'white',
    }
});

interface Props {
    history: History
    classes: MaterialUIClasses

}

const FooterList: React.FunctionComponent<Props> = props => {

    const {classes, history} = props;
    const items = [
        {label: "Shopping Cart", url: "shoppingcart"}
        , {label: "Checkout", url: "checkout"}
        , {label: "My Account", url: ""}
        , {label: "Login", url: "login"}
        , {label: "Register", url: "register"}
    ]
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
                                            onClick={() => redirectUrl(`/${n.url}`, history)}
                                > {n.label}</Typography>
                            </ListItem>
                    )
                }


            </List>
        </div>
    )
}

export default (withStyles(styles)(FooterList))