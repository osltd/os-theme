import React from 'react';
import {withStyles} from '@material-ui/core/styles';
import PropTypes from "prop-types";
import {withRouter} from 'react-router-dom'
import {Button, Grid, List, Tooltip, Typography, Zoom} from '@material-ui/core';
import ListItem from '@material-ui/core/ListItem';
import {handleImgValid, redirectUrl, refactorTextLength} from "../../../api/ApiUtils";
import {connect} from "react-redux";
import {makeStyles} from "@material-ui/styles";

const useStyles = makeStyles ( {
    listItem: {
        cursor: 'pointer',
    },
    root: {
        maxWidth: '300px',
    },
    list: {
        overflow: 'auto',
        maxHeight: '300px',
        width: '100%',
    },
    button: {
        margin: "10px",
    }
    ,
    binIcon: {
        cursor: 'pointer',
        float: 'right',
        '&:hover': {
            '&:before': {
                color: '#ff8173',
            }
        }
    }
})

const mapStateToProps = state => ({
    shoppingCart: state.cart.shoppingCart,
});



const ShoppingCartList = props => {

   let  selectedData = n => n.product.variants.find(variant => variant.id === n.variantId) ? n.product.variants.find(variant => variant.id === n.variantId) : n.product;
const classes = useStyles()
        const {data, onDelete} = props;
        return (
            <Grid container className={classes.root}>
                <Grid item xs={12}>
                    <List className={classes.list} component="nav">
                        {data.length > 0 ? data.map((n, i) =>

                            <ListItem
                                key={i}
                                button
                                onClick={() => redirectUrl('/products/' + n.product.id, props.history)}>
                                <Tooltip
                                    TransitionComponent={Zoom}
                                    title={selectedData(n).description}>

                                    <Grid container spacing={16}>
                                        <Grid item sm={3}>

                                            <img
                                                style={{width: '100%', minWidth: '50px'}}
                                                src={handleImgValid(n.product.photos[0])}
                                            />
                                        </Grid>
                                        <Grid item sm={9}>
                                            <Typography variant={'body1'}>
                                                {refactorTextLength(n.product.name)}
                                            </Typography>
                                            <Typography variant={'caption'}>
                                                {n.number} X
                                                $ {selectedData(n).price
                                            }
                                            </Typography>
                                            <span
                                                onClick={() => onDelete(i)}
                                                className={classes.binIcon + ' ' + 'icon-bin'}/>
                                        </Grid>
                                    </Grid>
                                </Tooltip>

                            </ListItem>
                        ) : <ListItem
                        >

                            <Typography variant={'subtitle1'}>
                                you haven't put any items in cart
                            </Typography>
                        </ListItem>}

                    </List>
                </Grid>
                <Grid item container justify={'center'} xs={12}>
                    <Grid item>
                        <Button
                            className={classes.button}
                            variant={'outlined'}
                            onClick={() => redirectUrl('/shoppingCart', props.history)}
                        >
                            View Cart
                        </Button>
                    </Grid>
                    <Grid item>
                        <Button variant={'outlined'}
                                className={classes.button}
                                onClick={() => redirectUrl('/checkout', props.history)}>
                            Checkout
                        </Button>
                    </Grid>

                </Grid>
            </Grid>
        )
}

ShoppingCartList.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withRouter(connect(mapStateToProps, {})(ShoppingCartList))