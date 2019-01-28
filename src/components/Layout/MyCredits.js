import React from 'react';
import PropTypes from 'prop-types';
import {withStyles} from '@material-ui/core/styles';
import withWidth from "@material-ui/core/withWidth/index";
import {withRouter} from "react-router-dom";
import {connect} from "react-redux";
import {Button, Grid, Typography} from '@material-ui/core'
import CustomButton from '../Widget/Button/BlackButton'
import {CART_OPERATE_SHOPPING_CART, COMMON_EDIT_SEARCH_BAR} from "../../constants/actionType";
import Dialog from '../Widget/Dialog'
import {redirectUrl} from "../../api/ApiUtils";
import _ from 'lodash'
import swal from '@sweetalert/with-react'
import MyAccount from '../Auth/Accounts/Overview'
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
        textAlign: 'center',
        paddingBottom: '20px',
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
        }),
    }

)

const MyCredits = props=>  {
    const {classes, width,history} = props;

    let  logout = () => {
        const {history} = props;

        swal(
            {

                content: (<Grid container alignItems={'center'} direction={'column'}>
                    <Grid item>
                        {false && <span className={'icon-like'}

                          style={{
                              fontSize: '80px',
                              color: 'hsla(100,55%,69%,.5)',
                              padding: '20px',

                              display: 'block',
                              width: '80px',
                              height: '80px',
                              border: '4px solid hsla(98,55%,69%,.2)',
                              borderRadius: '50%',
                              boxSizing: 'content-box',
                          }}
                    />}
                    </Grid>
                    <Grid item>
                        <Typography variant={'h4'}>
                            You have successfully logout!
                        </Typography>
                    </Grid>
                    <Grid item>
                        <Typography variant={'subtitle1'}>
                            see you </Typography>
                    </Grid>

                </Grid>)
            })
        setTimeout(
            () => redirectUrl('/', history)
            , 1000
        )
    }
  let   getDialog = () => {

        const {classes, width, user,history} = props;
        return (!_.isEmpty(user)) ? <Grid container
                  className={classes.dialog}
                  justify={'center'}
                  alignItems={'center'}
            >
                <Grid item xs={12} className={classes.textAlign}>
                    <Typography>
                        {

                        ( (user['first_name'])&&( user['last_name']))?
                            `${ user['first_name']} ${user['last_name']} welcome back`:'welcome back'}</Typography>
                </Grid>
                <Grid item xs={8}>
                    <CustomButton
                        onClick={logout}
                        value={'Logout'}
                    />
                </Grid>
            </Grid> : <Grid container
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
                            onClick={() => redirectUrl('/login',history)}
                            value={'Log In'}
                        />
                    </Grid>
                    <Grid item xs={1}/>

                    <Grid item xs={4}>

                        <CustomButton
                            onClick={() => redirectUrl('/register',history)}

                            value={'Register'}
                        />
                    </Grid>

                </Grid>

    }


        return (
            <Grid container justify={'flex-end'} className={classes.root}>
                <Dialog
                    opacity={true}
                    innerRef={e => this.dialog = e}
                    title={
                        <Button className={classes.button}>My Credits</Button>
                    }
                    dialog={<MyAccount/>}
                />

            </Grid>
        )
}

MyCredits.propTypes = {
    classes: PropTypes.object.isRequired,
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(withWidth()(withStyles(styles)(MyCredits))))