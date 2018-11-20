import React from 'react';
import PropTypes from 'prop-types';
import {withStyles} from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import {TableBody, Tooltip, Typography} from '@material-ui/core';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import img from '../../constants/img/loadingImg.gif'
import {formatMoney, refactorTitle} from "../../api/ApiUtils";
import Counter from '../Widget/Counter'
import {connect} from "react-redux";
import classNames from 'classnames'
import {
    CART_OPERATE_SHOPPING_CART,
    EDIT_PRODUCT_VIEW_MODE,
    PRODUCT_EDIT_FILTER,
    PRODUCT_EDIT_SORT
} from "../../constants/actionType";

const TAX_RATE = 0.07;

const styles = theme => ({
    root: {
        width: '100%',
        marginTop: theme.spacing.unit * 3,
        overflowX: 'auto',
    },
    table: {}, img: {
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
            shoppingCart.length > 0 ?
                <Paper className={classes.root}>
                    <Table className={classes.table}>
                        <TableHead>
                            <TableRow
                            >
                                <TableCell
                                    className={classes.block}

                                >Image</TableCell>
                                <TableCell
                                    className={classes.block}
                                    numeric>Product</TableCell>
                                <TableCell
                                    className={classes.block}
                                    numeric>Price</TableCell>
                                <TableCell
                                    className={classes.block}
                                    numeric>Quantity</TableCell>
                                <TableCell
                                    className={classes.block}
                                    numeric>Total</TableCell>
                                <TableCell
                                    className={classes.block}
                                    numeric>Remove</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {shoppingCart.map((n, i) => {
                                return (
                                    <TableRow key={i}>
                                        <TableCell
                                            className={classes.block}
                                        >

                                            <img src={n.product.photos[0].url}
                                                 className={classes.img}
                                            />

                                        </TableCell>


                                            <TableCell
                                                className={classes.block}
                                                numeric>
                                                <Tooltip
                                                    title={'( ' + n.product.variants.find(variant => variant.id === n.variantId).description
                                                    + ' )'}>
                                                    <div>
                                                {refactorTitle(n.product.name)
                                                }</div>
                                                </Tooltip>

                                            </TableCell>

                                        <TableCell
                                            className={classes.block}
                                            numeric>{
                                            '$ ' + formatMoney(
                                                n.product.variants.find(variant => variant.id === n.variantId).price
                                            )
                                        }</TableCell>
                                        <TableCell
                                            className={classNames(classes.counter, classes.block)}
                                            numeric>
                                            <Counter
                                                number={n.number}
                                                onChange={k => this.props.editShoppingCart('count', {
                                                    index: i,
                                                    count: k
                                                })}
                                            />
                                        </TableCell>
                                        <TableCell
                                            className={classes.block}

                                            numeric>{'$ ' +
                                        formatMoney(this.getRowPrice(n))
                                        }</TableCell>
                                        <TableCell
                                            className={classes.block}
                                            numeric>   <span
                                            onClick={() => this.props.editShoppingCart('remove', i)}
                                            className={classes.binIcon + ' ' + 'icon-bin'}/></TableCell>
                                    </TableRow>
                                );
                            })}
                            <TableRow>
                                <TableCell colSpan={2}>Total</TableCell>
                                <TableCell
                                    numeric>{'$ ' + formatMoney(shoppingCart.length > 0 && shoppingCart.reduce((acc, cur) => acc + this.getRowPrice(cur), 0))}</TableCell>
                            </TableRow>
                        </TableBody>
                    </Table>
                </Paper> : <Typography variant={'title'}>
                    there is
                </Typography>
        );
    }
}

ShoppingCartTable.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(ShoppingCartTable))