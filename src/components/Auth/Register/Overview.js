import React, {useState} from 'react';
import {Grid, Typography} from '@material-ui/core';
import withWidth from "@material-ui/core/withWidth/index";
import Input from '../../Widget/Input/original'
import Button from '../../Widget/Button/BlackButton'
import {withSnackbar} from 'notistack';
import * as styleGuide from "../../../constants/styleGuide";
import agent from '../../../agent'
import swal from '@sweetalert/with-react'
import {redirectUrl} from "../../../api/ApiUtils";
import {makeStyles} from "@material-ui/styles";

const useStyles = makeStyles(theme => ({
    root: {

        backgroundColor: theme.palette.background.default,
    },
    title: {
        paddingTop: '30px',
        textAlign: 'center',
    },
    innerRoot: {
        padding: '0px 120px 60px 120px ',
        margin: '100px 0px',
        backgroundColor: 'white',
    },
    paddingTop: {
        paddingTop: '20px !important',
    }
}));
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

                    content: (<Grid container alignItems={'center'} direction={'column'}>
                        <Grid item>
                            {
                                false && <span className={'icon-like'}
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
                                Congratulation!
                            </Typography>
                        </Grid>
                        <Grid item>
                            <Typography variant={'subtitle1'}>
                                Account created!</Typography>
                            <Typography variant={'subtitle1'}>
                                You can Login now!</Typography>
                        </Grid>

                    </Grid>)
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
    const classes = useStyles();

    return (

        <Grid container className={classes.root} justify={'center'} alignItems={'center'}>
            <Grid item container spacing={16} md={8} xs={12} lg={6} direction={'column'}
                  className={classes.innerRoot}>
                <Grid item>
                    <Typography className={classes.title} variant={'h4'}>
                        Create your account
                    </Typography>
                </Grid>
                <Grid item>
                    <Input
                        placeholder={'First Name'}
                        value={firstName}
                        onChange={e => setFirstName(e)}
                    />
                </Grid>
                <Grid item className={classes.paddingTop}>
                    <Input
                        placeholder={'Last Name'}
                        value={lastName}
                        onChange={e => setLastName(e)}
                    />
                </Grid>
                <Grid item className={classes.paddingTop}>
                    <Input

                        placeholder={'Email'}
                        value={email}
                        onChange={e => setEmail(e)}
                    />
                </Grid>
                <Grid item className={classes.paddingTop}>
                    <Input
                        type={'Password'}
                        placeholder={'Password'}
                        value={pwd}
                        onChange={e => setPwd(e)}
                    />
                </Grid>
                <Grid item className={classes.paddingTop}>
                    <Input
                        type={'Password'}
                        placeholder={'Confirm Password'}
                        value={confirmPwd}
                        onChange={e => setConfirmPwd(e)}
                    />
                </Grid>
                <Grid item className={classes.paddingTop}>
                    <Button
                        onClick={register}
                        value={'Create'}
                    />
                </Grid>

            </Grid>
        </Grid>
    );
};

export default withSnackbar(withWidth()(Login))