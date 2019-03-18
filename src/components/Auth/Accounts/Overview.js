import React from 'react';
import PropTypes from 'prop-types';
import {withStyles} from '@material-ui/core/styles';
import withWidth from "@material-ui/core/withWidth/index";
import {withRouter} from "react-router-dom";
import {connect} from "react-redux";
import {Button, Grid, Typography} from '@material-ui/core'
import CustomButton from '../../Widget/Button/BlackButton'
import {redirectUrl} from "../../../api/ApiUtils";
import _ from 'lodash'
import swal from '@sweetalert/with-react'
import agent from '../../../agent'
import {I18nText} from "../../Widget/I18nText";
import {keyOfI18n} from "../../../constants/locale/interface";
import {useI18nText} from "../../../hooks/useI18nText";

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

});

const mapStateToProps = state => ({
    user: state.auth.user,
});

const logout = (props) => {
    agent.Auth.logout().then(
        res => {
            swal(
                {
                    content: (<Grid container alignItems={'center'} direction={'column'}>
                        <Grid item>
                            {false && <span
                                className={'icon-like'}
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
                                <I18nText keyOfI18n={keyOfI18n.AUTH_ACCOUNTS_SUCCESSFULLY_LOGOUT}/>
                            </Typography>
                        </Grid>
                        <Grid item>
                            <Typography variant={'subtitle1'}>
                               <I18nText keyOfI18n={keyOfI18n.AUTH_ACCOUNTS_SEE_YOU}/> </Typography>
                        </Grid>

                    </Grid>)
                });
            setTimeout(() => redirectUrl('/', props.history), 1000)
        }
    ).catch(err => console.log(err))
};

const MyAccount = (props) => {
    const {classes, width, user, history} = props;
    return (!_.isEmpty(user)) ?

        <Grid container
              className={classes.dialog}
              justify={'center'}
              alignItems={'center'}
        >

            <Grid item xs={12} className={classes.textAlign}>
                <Typography>
                    {

                        ((user['first_name']) && (user['last_name'])) ?
                            `${user['first_name']} ${user['last_name']} ${useI18nText(keyOfI18n.AUTH_ACCOUNTS_SEE_YOU)} ${useI18nText(keyOfI18n.AUTH_ACCOUNTS_SEE_YOU)}` : 'welcome back'}
                </Typography>
            </Grid>
            <Grid item xs={8}>
                <CustomButton
                    onClick={logout}
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
                <Grid item md={4} xs={12}>
                    <CustomButton
                        onClick={() => {
                            props.dialog && props.dialog.handleClose();
                            redirectUrl('/login', history)
                        }}
                        value={'Log In'}/>
                </Grid>
                <br/>
                <Grid item xs={12} md={1}/>

                <Grid item md={4} xs={12}>

                    <Button variant={"contained"}
                            style={
                                {
                                    boxShadow: 'none',
                                    padding: '20px',
                                    borderRadius: 0,
                                }
                            }
                            fullWidth={true}
                            onClick={() => {
                                props.dialog && props.dialog.handleClose();
                                redirectUrl('/register', history)
                            }}


                    >
                        Register
                    </Button>
                </Grid>

            </Grid>)

};

MyAccount.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default connect(mapStateToProps, {})(withRouter(withWidth()(withStyles(styles)(MyAccount))))