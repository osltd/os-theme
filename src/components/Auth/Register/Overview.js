import React, {useState} from 'react';
import {Grid, Typography} from '@material-ui/core';
import {withStyles} from '@material-ui/core/styles';
import withWidth from "@material-ui/core/withWidth/index";
import Input from '../../Widget/Input/original'
import Button from '../../Widget/Button/BlackButton'
import {withSnackbar} from 'notistack';
import * as styleGuide from "../../../constants/styleGuide";
import agent from '../../../agent'
import swal from '@sweetalert/with-react'
import {redirectUrl} from "../../../api/ApiUtils";
import {I18nText} from "../../Widget/I18nText";
import {keyOfI18n} from "../../../constants/locale/interface";
import {useI18nText} from "../../../hooks/useI18nText";
import {Button as MaterialButton} from '@material-ui/core'
import {SwalContent} from "../../Layout/SwalContent";
const styles = theme => ({
    root: {

        backgroundColor: theme.palette.background.default,
    },
    title: {
        paddingTop: '30px',
        textAlign: 'center',
    },
    innerRoot: {
        margin: '100px 0px',
        backgroundColor: 'white',
    },
    paddingTop: {
        paddingTop: '20px !important',
    },
    blueUnderline:{
        padding:'15px 0',
        cursor: 'pointer',
        textAlign: 'center',
        textDecoration: 'underline',
        color: '#505050',
        transition: 'color 150ms,background-color 150ms',
        fontSize: '15px',


        '&:hover': {
            color: '#6a6561',
        }
    }
});

const Login = props => {
    let register = () => {
        const pwdDidNotMatch = (pwd !== confirmPwd);
        if (pwdDidNotMatch) {
            props.enqueueSnackbar('Password does not match', styleGuide.errorSnackbar);
            setPwd('');
            setConfirmPwd('');
            return null
        }

        agent.Auth.register(
            {
                first_name: firstName,
                last_name: lastName,
                email: email,
                passwd: pwd,
                confpasswd: confirmPwd

            }
        ).then(
            res => {
                if (
                    !res.data.result
                ) {
                    res.data.messages.map(n => props.enqueueSnackbar(n, styleGuide.errorSnackbar));
                    return null
                }
                swal({

                    content: (<SwalContent title={<>
                            <I18nText keyOfI18n={keyOfI18n.PRODUCT_DETAILS_SNACK_BAR_CONGRATULATION}/>!</>

                        } subTitle={
                            <I18nText keyOfI18n={keyOfI18n.AUTH_YOU_CAN_LOGIN_NOW}/>

                        }/>
)
                });
                setTimeout(
                    () => redirectUrl('/login', props.history), 1000
                )
            }
        ).catch(
            err => (err.response) ? err.response.data.messages.map(
                n => props.enqueueSnackbar(n, styleGuide.errorSnackbar)
            ) : null
        )
    };

    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [pwd, setPwd] = useState('');
    const [confirmPwd, setConfirmPwd] = useState('');


    const {classes} = props;
    return (

        <Grid container className={classes.root} justify={'center'} alignItems={'center'}>
            <Grid item container spacing={16} md={8} xs={12} lg={6} direction={'column'}
                  className={classes.innerRoot}>
                <Grid item>
                    <Typography className={classes.title} variant={'h4'}>
                        <I18nText keyOfI18n={keyOfI18n.AUTH_REGISTER_CREATE_YOUR_ACCOUNT}/>
                    </Typography>
                </Grid>
                <Grid item>
                    <Input
                        placeholder={useI18nText(keyOfI18n.FIRST_NAME)}
                        value={firstName}
                        onChange={e => setFirstName(e)}
                    />
                </Grid>
                <Grid item className={classes.paddingTop}>
                    <Input
                        placeholder={useI18nText(keyOfI18n.LAST_NAME)}
                        value={lastName}
                        onChange={e => setLastName(e)}
                    />
                </Grid>
                <Grid item className={classes.paddingTop}>
                    <Input

                        placeholder={useI18nText(keyOfI18n.EMAIL)}
                        value={email}
                        onChange={e => setEmail(e)}
                    />
                </Grid>
                <Grid item className={classes.paddingTop}>
                    <Input
                        type={'Password'}
                        placeholder={useI18nText(keyOfI18n.PASSWORD)}
                        value={pwd}
                        onChange={e => setPwd(e)}
                    />
                </Grid>
                <Grid item className={classes.paddingTop}>
                    <Input
                        type={'Password'}
                        placeholder={useI18nText(keyOfI18n.CONFIRM_PASSWORD)}
                        value={confirmPwd}
                        onChange={e => setConfirmPwd(e)}
                    />
                </Grid>
                <Grid item className={classes.paddingTop}>
                    <Typography
                        onClick={() => {
                            redirectUrl('/login', props.history)
                        }}

                        className={classes.blueUnderline}
                        variant={'h6'}>                        <I18nText keyOfI18n={keyOfI18n.AUTH_LOGIN_HAVE_YOUR_OWN_ACCOUNT_LOGIN}/>

                    </Typography>
                    <Button
                        onClick={register}
                        value={useI18nText(keyOfI18n.CREATE)}
                    />

                </Grid>
            </Grid>
        </Grid>
    );
};

export default withSnackbar(withWidth()(withStyles(styles)(Login)))