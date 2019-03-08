import React, {useState} from 'react';
import {Button, Grid, Typography} from '@material-ui/core';
import {InjectedNotistackProps, withSnackbar} from 'notistack';
import * as styleGuide from "../../../constants/snackBarGuide";
import agent from '../../../agent'
import swal from '../../Widget/Swal'
import {redirectUrl} from "../../../api/ApiUtils";
import {makeStyles} from "@material-ui/styles";
import {RouteComponentProps} from "react-router";
import InputBar from '../../Widget/InputBarWithTitle'

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
type Props = InjectedNotistackProps & RouteComponentProps
const Register: React.FunctionComponent<Props> = props => {
    let register = () => {
        const pwdDidNotMatch = (pwd !== confirmPwd);
        if (data.filter(n => n.value === '').length > 0) {

            props.enqueueSnackbar('你需要完成填入所有資料以便郵寄', styleGuide.errorSnackbar);
            return null;
        }
        if (pwdDidNotMatch) {
            props.enqueueSnackbar('Password does not match', styleGuide.errorSnackbar);
            setPwd('');
            setConfirmPwd('');
            return null
        }

        agent.Auth.register(
            {
                first_name: name,
                last_name: name,
                email: email,
                passwd: pwd,
                confpasswd: confirmPwd

            }
        ).then(
            res => {
                if (
                    !res.data.result
                ) {
                    res.data.messages.map((n: string) =>
                        props.enqueueSnackbar(n, styleGuide.errorSnackbar));
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
                (n: string) => props.enqueueSnackbar(n, styleGuide.errorSnackbar)
            ) : null
        )
    };

    const [name, setName] = useState('');
    const [company, setCompany] = useState('');
    const [phone, setPhone] = useState('');
    const [email, setEmail] = useState('');
    const [pwd, setPwd] = useState('');
    const [confirmPwd, setConfirmPwd] = useState('');
    const data = [
        {
            value: name,
            onClick: (e: string) => setName(e),
            title: `姓名`,

        },
        {

            value: company,
            onClick: (e: string) => setCompany(e),
            title: `公司`
        }, {
            value: phone,
            onClick: (e: string) => setPhone(e),
            title: `電話`
        }, {
            value: email,
            onClick: (e: string) => setEmail(e),
            title: `Email`
        }, {
            value: pwd,
            onClick: (e: string) => setPwd(e),
            title: `密碼`
        }, {
            value: confirmPwd,
            onClick: (e: string) => setConfirmPwd(e),
            title: `確認密碼`
        },
    ];
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
                    {
                        data.map((n, i) => <InputBar
                            placeholder={n.value}
                            key={i} value={n.value} onChange={n.onClick} title={n.title}/>)
                    }

                </Grid>
                <Grid item>
                    <Typography variant={"subtitle1"}>
                        A/C No.
                    </Typography>
                </Grid>
                <Grid item>
                    <Button
                        onClick={register}
                        fullWidth={true}
                        size={"large"}
                        variant={"outlined"} color={"secondary"}>
                        建立賬戶
                    </Button>
                </Grid>

            </Grid>
        </Grid>
    );
};

export default withSnackbar(Register)