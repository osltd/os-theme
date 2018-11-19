import React from 'react';
import PropTypes from 'prop-types';
import {withStyles} from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import {formatMoney, refactorTitle} from "../../api/ApiUtils";
import {connect} from "react-redux";
import RadioList from '../Widget/RadioList'
import Button from '../Widget/Button'
import Terms from '../Widget/Terms'
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

class OrderSummary extends React.Component {

    getRowPrice = product => product.product.variants.find(variant => variant.id === product.variantId).price * product.number


    render() {
        const {classes, shoppingCart} = this.props;
        return (
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

                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {shoppingCart.map((n, i) => {
                            return (
                                <TableRow key={i}>
                                    <TableCell
                                        className={classes.block}
                                    >
                                        {refactorTitle(n.product.name)} X {n.number}

                                    </TableCell>
                                    <TableCell
                                        className={classes.block}
                                        numeric>
                                        {
                                            '$ ' + formatMoney(
                                                n.product.variants.find(variant => variant.id === n.variantId).price * n.number
                                            )


                                        }
                                    </TableCell>

                                </TableRow>
                            );
                        })}
                    <TableRow>

                        <TableCell colSpan={2}>
                            <RadioList/>
                        </TableCell>
                    </TableRow> <TableRow>

                        <TableCell colSpan={2}>
                            <Terms/>
                        </TableCell>
                    </TableRow>

                        <TableRow>

                            <TableCell colSpan={2}>
                                <Button
                                    link={'#'}
                                    value={'place order'}
                                    icon={'icon-cart'}
                                    border={true}

                                />
                            </TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
            </Paper>
        );
    }
}

OrderSummary.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(OrderSummary))