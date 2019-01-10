import React from 'react';
import PropTypes from 'prop-types';
import {withStyles} from '@material-ui/core/styles';
import withWidth from "@material-ui/core/withWidth/index";
import {withRouter} from "react-router-dom";
import {connect} from "react-redux";
import {Button, Grid, Typography} from '@material-ui/core'
import CustomButton from '../Widget/Button/Button'
import {CART_OPERATE_SHOPPING_CART, COMMON_EDIT_SEARCH_BAR} from "../../constants/actionType";
import Dialog from '../Widget/Dialog'
import {redirectUrl} from "../../api/ApiUtils";
import _ from 'lodash'
import swal from '@sweetalert/with-react'

const styles = theme => ({

    root: {
        paddingRight: '50px',
        position: 'sticky',
        top: '95vh',
        height: 0,
        zIndex: 10000,
        '& :hover': {
            color: 'black',

        }
    }, dialog: {
        padding: '40px',
    },
    button: {
        color: 'white',
        transition: '0.2s',
        backgroundColor: 'black',

    },
    textAlign: {
        textAlign: 'center'
    }

})


const mapStateToProps = state => ({
    shoppingCart: state.cart.shoppingCart,
    keyword: state.common.searchBar,
    user: state.auth.user,
});


const mapDispatchToProps = dispatch => ({
        editShoppingCart: (index) => dispatch({
            type: CART_OPERATE_SHOPPING_CART,
            payload: {
                key: 'remove',
                value: index,

            }
        }),
        editSearchBar: (keyword = null) => dispatch({
            type: COMMON_EDIT_SEARCH_BAR,
            payload: keyword
        })
    }

)

class Header extends React.Component {
    handleChange = (event, value) => {
        this.setState({value});
    };
    logout = () => {
        localStorage.clear()
        swal("You have successfully logout!", "see you", "success")
        setTimeout(
            () => redirectUrl('/', this.props.history)
            , 1000
        )
    }
    getDialog = () => {

        const {classes, width, user} = this.props;
        return (!_.isEmpty(user)) ?

            <Grid container
                  className={classes.dialog}
                  justify={'center'}
                  alignItems={'center'}
            >
                <Grid item xs={12} className={classes.textAlign}>
                    <Typography>{`${user.name.first} ${user.name.last} welcome back`}</Typography>
                </Grid>
                <Grid item xs={8}>
                    <CustomButton
                        onClick={this.logout}
                        value={'Logout'}
                    />
                </Grid>
            </Grid>
            : (

                <Grid container
                      className={classes.dialog}
                      justify={'center'}
                      alignItems={'center'}
                >

                    <Grid item xs={12} className={classes.textAlign}>
                        <Typography>
                            Log in or sign up to earn rewards today
                        </Typography>
                    </Grid>
                    <Grid item xs={4}>
                        <CustomButton
                            onClick={() => redirectUrl('/login')}
                            value={'Log In'}
                        />
                    </Grid>
                    <Grid item xs={1}/>

                    <Grid item xs={4}>

                        <CustomButton
                            onClick={() => redirectUrl('/register')}

                            value={'Register'}
                        />
                    </Grid>

                </Grid>)

    }

    constructor(props) {
        super(props)
        this.state = {
            keyword: ''
        };
    }

    render() {
        const {classes, width} = this.props;
        const {value} = this.state

        return (
            <Grid container justify={'flex-end'} className={classes.root}>
                <Dialog
                    opacity={true}
                    innerRef={e => this.dialog = e}
                    title={
                        <Button className={classes.button}>My Credits</Button>
                    }
                    dialog={this.getDialog()}
                />

            </Grid>
        )

    }
}

Header.propTypes = {
    classes: PropTypes.object.isRequired,
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(withWidth()(withStyles(styles)(Header))))