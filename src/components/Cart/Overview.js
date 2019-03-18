import React from 'react';
import {withStyles} from '@material-ui/core/styles';
import {Grid} from '@material-ui/core'
import Header from '../Layout/Body/Header'
import ShoppingCart from './CartTable'

const styles = theme => ({

    shoppingCart: {
        paddingBottom: '30px',
    }
});

const CartOverview = (props) => {
    const {classes} = props;
    return <Grid container justify={'center'}>
        <Grid item sm={12}>
            <Header title={'Shopping Cart'}/>
        </Grid>
        <Grid item className={classes.shoppingCart}>
            <ShoppingCart/>
        </Grid>
    </Grid>

};

export default (withStyles(styles)(CartOverview))