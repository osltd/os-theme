import React from 'react';
import PropTypes from 'prop-types';
import {withStyles} from '@material-ui/core/styles';
import {List, Typography} from '@material-ui/core';
import ListItem from '@material-ui/core/ListItem';
import {redirectUrl} from "../../api/ApiUtils";
import Dialog from '../Widget/Dialog'
import MyAccount from '../Auth/Accounts/Overview'
const styles = theme => ({
    root: {
        width: '100%',
        maxWidth: 360,
    }, item: {
        padding: 0,
        color: 'white',
    }
});

function ListItemLink(props) {
    return <ListItem button component="a" {...props} />;
}

class FooterList extends React.Component {
    render() {

        const {classes} = this.props;
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
                            (n.label==='My Account')?   <Dialog
                                    key={i}
                                    opacity={true}
                                    innerRef={e => this.dialog = e}
                                    title={
                                        <ListItem className={classes.item} button >
                                            <Typography variant={'body1'} color={'inherit'}
                                            > {n.label}</Typography>
                                        </ListItem>        }
                                    dialog={<MyAccount/>}
                                />:
                            <ListItem className={classes.item} button key={i}>
                                <Typography variant={'body1'} color={'inherit'}
                                            onClick={() => redirectUrl(`/${n.url}`, this.props.history)}

                                > {n.label}</Typography>
                            </ListItem>



                        )
                    }


                </List>
            </div>
        );
    }
}

FooterList.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(FooterList);