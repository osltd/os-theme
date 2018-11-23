import React from 'react';
import PropTypes from 'prop-types';
import {withStyles} from '@material-ui/core/styles';
import {connect} from "react-redux";
import {Grid} from '@material-ui/core'
import {
    CART_OPERATE_SHOPPING_CART,
    EDIT_PRODUCT_VIEW_MODE,
    PRODUCT_EDIT_FILTER,
    PRODUCT_EDIT_SORT
} from "../../constants/actionType";
import InputBar from '../Widget/InputBar'

const TAX_RATE = 0.07;

const styles = theme => ({
    root: {
        width: '100%',
        marginTop: theme.spacing.unit * 3,
        overflowX: 'auto',
    },
    table: {
        minWidth: 700,
    }, img: {
        width: '100px',
        margin: '10px',
    }
    ,
    binIcon: {
        cursor: 'pointer',
        '&:hover': {
            '&:before': {
                color: '#ff8173',
            }
        }
    },
    counter: {
        minWidth: '170px',
    },
    block: {
        //   border: ' 1px solid ' + theme.palette.secondary.light,
    }
});

const mapStateToProps = state => ({
    shoppingCart: state.cart.shoppingCart,
});


const mapDispatchToProps = dispatch => ({

        changeViewMode: (mode) =>
            dispatch({
                    type: EDIT_PRODUCT_VIEW_MODE,
                    payload: mode,
                }
            )
        ,
        editProductSort: (key, value) => dispatch({
            type: PRODUCT_EDIT_SORT,
            payload: {
                key: key,
                value: value,
            },
        }),
        editProductFilter: (key, value) => dispatch({
            type: PRODUCT_EDIT_FILTER,
            payload: {
                key: key,
                value: value,
            },
        }),
        editShoppingCart: (key, value) => dispatch({
            type: CART_OPERATE_SHOPPING_CART,
            payload: {
                key: key,
                value: value,
            },
        })
    }
)

class ShoppingCartTable extends React.Component {

    getRowPrice = product => product.product.variants.find(variant => variant.id === product.variantId).price * product.number


    render() {
        const {classes, shoppingCart} = this.props;
        return (
            <Grid container spacing={16}>
                <Grid item xs={6}>
                    <InputBar
                        title={'First Name'}
                        placeholder={'First Name'}
                    />
                </Grid>

                <Grid item xs={6}>
                    <InputBar
                        title={'Last Name'}
                        placeholder={'Last Name'}
                    />
                </Grid>
                <Grid item xs={12}>
                    <InputBar
                        title={'Email Address'}
                        placeholder={'Email Address'}
                    />

                </Grid>
                <Grid item xs={12}>
                    <InputBar
                        title={'Company Name'}
                        placeholder={'Company Name'}
                    />
                </Grid>
                <Grid item xs={12}>
                    <InputBar
                        title={'Country'}
                        placeholder={'Country'}
                    />

                </Grid>
                <Grid item xs={12}>
                    <InputBar
                        title={'Street Address'}
                        placeholder={'Street Address'}
                    />

                </Grid>
                <Grid item xs={12}>
                    <InputBar
                        placeholder={'Street Address 2 (optional)'}
                    />

                </Grid>

                <Grid item xs={12}>
                    <InputBar
                        title={'Town/City'}

                        placeholder={'Town/City'}
                    />

                </Grid>
                <Grid item xs={12}>
                    <InputBar
                        title={'State/Divition'}
                        placeholder={'State/Divition'}
                    />

                </Grid>
                <Grid item xs={12}>
                    <InputBar
                        title={'Postcode/ZIP'}
                        placeholder={'Postcode/ZIP'}
                    />

                </Grid>

                <Grid item xs={12}>
                    <InputBar
                        title={'Phone'}
                        placeholder={'Phone'}
                    />
                </Grid>

                <Grid item xs={12}>
                    <InputBar
                        title={'Order Note'}
                        placeholder={'Order Note'}
                        multiline={true}
                    />
                </Grid>
            </Grid>

        )
    }
}

ShoppingCartTable.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(ShoppingCartTable))