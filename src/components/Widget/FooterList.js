import React from 'react';
import PropTypes from 'prop-types';
import {withStyles} from '@material-ui/core/styles';
import {List, Typography} from '@material-ui/core';
import ListItem from '@material-ui/core/ListItem';

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

function SimpleList(props) {
    const {classes} = props;
    const items = ['Shopping Cart',
        'Checkout',
        'Wishlist',
        'My Account',
        'Login',
        'Register'
    ]
    return (
        <div className={classes.root}>
            <List component="nav">
                {
                    items.map((n, i) =>
                        <ListItem className={classes.item} button key={i}>
                            <Typography variant={'body2'} color={'inherit'}> {n}</Typography>
                        </ListItem>)
                }


            </List>
        </div>
    );
}

SimpleList.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(SimpleList);