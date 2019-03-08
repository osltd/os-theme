import React, {useContext, useEffect, useState} from 'react';
import {Grid, Typography} from '@material-ui/core';
import Input from '../../Widget/InputBar'
import agent from '../../../agent'
import {InjectedNotistackProps, withSnackbar} from 'notistack';
import * as styleGuide from "../../../constants/snackBarGuide";
import {warningSnackbar} from "../../../constants/snackBarGuide";
import {makeStyles} from "@material-ui/styles";
import {RouteComponentProps, withRouter} from "react-router-dom";
import Swal from '../../Widget/Swal'
import Button from "@material-ui/core/Button";
import {reducer} from "../../../context";
import Header from "../../Layout/Body/Header";
import {useThemeWidth} from "../../../hooks/useThemeWidth";
import actionType from "../../../context/actionType";

const useStyles = makeStyles(theme => ({
    root: {},
    title: {
        paddingTop: '30px',

        textAlign: 'center',
    },
    innerRoot: {
        '&:media': {
            padding: '0px 120px 60px 120px '
        },
        margin: '100px 0px',
        backgroundColor: 'white',
    },
    blueUnderline: {
        cursor: 'pointer',
        textAlign: 'center',
        textDecoration: 'underline',
        color: '#3f51b5',
        transition: 'color 150ms,background-color 150ms',
        fontSize: '15px',


        '&:hover': {
            color: '#6a6561',
        }
    }

}));

type Props = InjectedNotistackProps & RouteComponentProps

const Login: React.FunctionComponent<Props> = (props) => {
    const classes = useStyles();
    const themeWidth = useThemeWidth();
    const {enqueueSnackbar, history} = props;
    const [email, setEmail] = useState('');
    const [pwd, setPwd] = useState('');
    const handleLoginProcess = async () =>
        await agent.Auth.login({
            email: email
            , passwd: pwd
        })
            .then(res => {
                if (!res.data.result) {
                    res.data.messages.map((n: string) => enqueueSnackbar(n, styleGuide.errorSnackbar));
                    return null
                }
                if (res.data.result) {
                    agent.Auth.getAccount().then((user) => {
                        Swal(<Grid container alignItems={'center'} direction={'column'}>
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
                            <Grid item>
                                <Typography variant={'h4'}>
                                    Welcome back!
                                </Typography>
                            </Grid>

                        </Grid>);
                        authReducer.dispatch(
                            {
                                type: actionType.auth.AUTH_INIT_USER,
                                payload: (user.data && user.data.data) ? {
                                    user: user.data.data
                                } : {},

                            }
                        );
                        history.push('/')
                    }).catch(err => err);
                }

            }).catch(err => {
                    if (err.response) {
                        err.response.data.messages.map((n: string) =>
                            enqueueSnackbar(n, styleGuide.errorSnackbar)
                        );
                        setPwd('')
                    }
                }
            );

    useEffect(
        () => {
            if (props.location.search)
                props.enqueueSnackbar('您需要先登录', warningSnackbar)
        }, []
    );
    const {authReducer} = useContext(reducer);
    return (<Grid container
                  className={classes.root}
    >
        <Header title={'登入'}/>
        <Grid item container md={6} xs={12}

              className={classes.innerRoot}
        >
            <Grid item md={2} xs={1}/>

            <Grid item md={8} xs={10} spacing={16}
                  alignItems={'center'}
                  container>
                <Grid item xs={12}>
                    <Typography variant={'h4'} color={"primary"}>
                        會員登錄
                    </Typography>
                </Grid>
                <Grid item xs={12}>
                    <Input
                        placeholder={'email'}
                        value={email}
                        onChange={e => setEmail(e)}
                    />
                </Grid>
                <Grid item xs={12}>
                    <Input

                        type={'password'}
                        placeholder={'password'}
                        value={pwd}
                        onChange={e => setPwd(e)}
                    />
                </Grid>
                <Grid item container direction={"row"}>
                    <Grid item xs={5}>
                        <Button
                            variant={"outlined"}
                            color={"secondary"}
                            fullWidth={true}
                            onClick={handleLoginProcess}
                        > 登錄</Button>
                    </Grid>
                    <Grid item xs={2}/>
                    <Grid item xs={5}>
                        <Button
                            variant={"outlined"}
                            color={"primary"}
                            fullWidth={true}

                            onClick={() => console.log('api not ready')}
                            //todo(api not ready)
                        > 忘記密碼</Button>
                    </Grid>
                </Grid>
            </Grid>
            <Grid item md={2} xs={1}/>
        </Grid>
        <Grid item container spacing={16} md={6} xs={12}
              className={classes.innerRoot}
              style={{borderLeft: themeWidth.isWidthUp.md ? `1px solid #222222` : ''}}
        >
            <Grid item xs={2}/>

            <Grid item xs={8} spacing={16} alignItems={'center'}
                  container>
                <Grid item>
                    <Typography variant={"h4"} color={"secondary"}>
                        成為會員
                    </Typography>
                </Grid>
                <Grid item>
                    <Typography variant={"subtitle1"}>
                        成為HKCopier的會員，可以讓您購物時更加便利，及時了解訂單狀態，也可以及時查詢您的購物記錄。
                    </Typography>
                </Grid>
                <Grid item xs={5}>
                    <Button variant={"outlined"} color={"secondary"} fullWidth={true}
                            onClick={() => history.push('/register')}>
                        登記
                    </Button>
                </Grid>

            </Grid>
            <Grid item xs={2}/>
        </Grid>

    </Grid>)
};

export default withSnackbar(withRouter(Login))