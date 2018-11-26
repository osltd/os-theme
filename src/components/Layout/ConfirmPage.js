import React from 'react';
import PropTypes from 'prop-types';
import {AppBar, BottomNavigation, BottomNavigationAction, Grid, Input} from '@material-ui/core';
import Button from '../Widget/Button'
import {fade} from '@material-ui/core/styles/colorManipulator';
import {withStyles} from '@material-ui/core/styles';
import PopUp from '../Widget/PopUp'
import SearchIcon from '@material-ui/icons/Search';
import DropDownList from './Body/ShoppingCartList'
import withWidth, {isWidthUp} from "@material-ui/core/withWidth/index";
import classNames from "classnames";
import {withRouter} from "react-router-dom";
import {connect} from "react-redux";
import {Typography} from '@material-ui/core'
import {CART_OPERATE_SHOPPING_CART} from "../../constants/actionType";
import Header from '../Layout/Body/Header'
const styles = theme => ({
    form:{
        margin:'40px',
        padding:'40px',
        border:'1px solid '+theme.palette.secondary.light,
    }

});


const mapStateToProps = state => ({
    shoppingCart: state.cart.shoppingCart,
});


const mapDispatchToProps = dispatch => ({
        editShoppingCart: (index) => dispatch({
            type: CART_OPERATE_SHOPPING_CART,
            payload: {
                key: 'remove',
                value: index,

            }
        })
    }

)

class ConfirmPage extends React.Component {
    handleChange = (event, value) => {
        this.setState({value});
    };

    constructor(props) {
        super(props)
        this.state = {
            value: 'recents',
        };
    }

    render() {
        const {classes, width} = this.props;
        const {value} = this.state

            return (
                    <Grid container alignItems={'center'} justify={'center'}>

                        <Header
                        title={'confirmPage'}/>
                        <Grid item className={classes.form}>

                            <Typography variant={'title'} color={'primary'}>
                            Shipping request successfully.

                            </Typography>
                            <Typography variant={'subheading'} color={'primary'}>

                            your reference number is {this.props.match.params.orderId}
                            </Typography>
                        </Grid>
                    </Grid>  )
    }
}

ConfirmPage.propTypes = {
    classes: PropTypes.object.isRequired,
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(withWidth()(withStyles(styles)(ConfirmPage))))