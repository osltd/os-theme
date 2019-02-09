import React from 'react';
import {Grid} from '@material-ui/core'
import Header from '../Layout/Body/Header'
import ShoppingCart from './CartTable'
import {makeStyles} from "@material-ui/styles";

const useStyles = makeStyles(theme => ({

    shoppingCart: {
        paddingBottom: '30px',
    }
}));

const CartOverview = (props) => {
    const classes = useStyles();
    return <Grid container justify={'center'}>
        <Grid item sm={12}>
            <Header title={'Shopping Cart'}/>
        </Grid>
        <Grid item className={classes.shoppingCart}>
            <ShoppingCart/>
        </Grid>
    </Grid>

};

export default CartOverview