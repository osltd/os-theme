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
import {SwalContent} from "../../Layout/SwalContent";

const styles = theme => ({

    root: {
        paddingRight: '50px',
        position: 'sticky',
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
                    content: (<SwalContent title={<I18nText keyOfI18n={keyOfI18n.AUTH_ACCOUNTS_SUCCESSFULLY_LOGOUT}/>
                        } subTitle={
                            <I18nText keyOfI18n={keyOfI18n.AUTH_ACCOUNTS_SEE_YOU}/>

                        }
                                           img={'img/snackBar/log_out.png'}
                        />
                    )
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

                        ((user.first_name) && (user.last_name)) ?
                            `${user.first_name} ${user.last_name} ${useI18nText(keyOfI18n.WELCOME_BACK)} ` :
                            <I18nText keyOfI18n={keyOfI18n.WELCOME_BACK}/>}
                </Typography>
            </Grid>
            <Grid item xs={8}>
                <CustomButton
                    onClick={logout}
                    value={<I18nText keyOfI18n={keyOfI18n.AUTH_ACCOUNTS_LOGOUT}/>}
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
                        <I18nText keyOfI18n={keyOfI18n.AUTH_ACCOUNTS_TITLE_WHEN_NOT_LOGIN}/>
                    </Typography>
                </Grid>
                <Grid item md={4} xs={12}>
                    <CustomButton
                        onClick={() => {
                            props.dialog && props.dialog.handleClose();
                            redirectUrl('/login', history)
                        }}
                        value={useI18nText(keyOfI18n.LOGIN)}/>
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
                        <I18nText keyOfI18n={keyOfI18n.REGISTER}/>
                    </Button>
                </Grid>
            </Grid>)

};

MyAccount.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default connect(mapStateToProps, {})(withRouter(withWidth()(withStyles(styles)(MyAccount))))