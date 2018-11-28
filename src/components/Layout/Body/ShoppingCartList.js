import React from 'react';
import {withStyles} from '@material-ui/core/styles';
import PropTypes from "prop-types";
import {withRouter} from 'react-router-dom'
import {Button, Grid, List, Tooltip, Typography, Zoom} from '@material-ui/core';
import ListItem from '@material-ui/core/ListItem';
import {refactorTextLength} from "../../../api/ApiUtils";
import {connect} from "react-redux";

const styles = theme => ({
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
});

const mapStateToProps = state => ({
    shoppingCart: state.cart.shoppingCart,
});


const mapDispatchToProps = dispatch => ({}
)

class ShoppingCartList extends React.Component {
    state = {
        anchor: 'left',
    };
    handleChange = name => event => {
        this.setState({
            [name]: event.target.value,

        });
    };

    constructor() {
        super()
        this.state = {
            placeHolder: '',

        }
    }


    render() {
        const {classes, data, onDelete} = this.props;

        return (
            <Grid container className={classes.root}>
                <Grid item xs={12}>
                    <List className={classes.list} component="nav">
                        {data.length > 0 ? data.map((n, i) =>

                            <ListItem
                                key={i}
                                button

                                onClick={() => this.props.history.push('/shop/' + n.product.id)}>
                                <Tooltip
                                    TransitionComponent={Zoom}
                                    title={n.product.variants.find(variant => variant.id === n.variantId).description}>

                                    <Grid container spacing={16}>
                                        <Grid item sm={3}>

                                            <img
                                                style={{width: '100%', minWidth: '50px'}}
                                                src={n.product.photos[0].url}
                                            />

                                        </Grid>
                                        <Grid item sm={9}>
                                            <Typography variant={'body2'}>
                                                {refactorTextLength(n.product.name)}
                                            </Typography>
                                            <Typography variant={'caption'}>
                                                {n.number} X
                                                $ {n.product.variants.find(variant => variant.id === n.variantId).price
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

                            <Typography variant={'subheading'}>
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
                            onClick={()=>this.props.history.push('/shoppingCart')}
                        >
                            View Cart
                        </Button>
                    </Grid>
                    <Grid item>
                        <Button variant={'outlined'}
                                className={classes.button}
                                onClick={()=>this.props.history.push('/checkout')}>
                            Checkout
                        </Button>
                    </Grid>

                </Grid>
            </Grid>
        )
    }
}

ShoppingCartList.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(ShoppingCartList)))