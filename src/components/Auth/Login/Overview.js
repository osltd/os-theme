import React, {useState} from 'react';
import {Grid, Typography} from '@material-ui/core';
import {connect} from 'react-redux'
import {withStyles} from '@material-ui/core/styles';
import withWidth from "@material-ui/core/withWidth/index";
import Input from '../../Widget/Input/original'
import Button from '../../Widget/Button/BlackButton'
import {redirectUrl} from "../../../api/ApiUtils";
import agent from '../../../agent'
import swal from '@sweetalert/with-react'
import {withSnackbar} from 'notistack';
import * as styleGuide from "../../../constants/styleGuide";
import {I18nText} from "../../Widget/I18nText";
import {keyOfI18n} from "../../../constants/locale/interface";
import {useI18nText} from "../../../hooks/useI18nText";

const styles = theme => ({
    root: {},
    title: {
        paddingTop: '30px',

        textAlign: 'center',
    },
    innerRoot: {
        margin: '100px 0px',
        backgroundColor: 'white',
    },
    blueUnderline: {
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

const mapStateToProps = state => ({
    products: state.product.products,
    viewMode: state.product.viewMode,
    sort: state.product.sort,
});


const mapDispatchToProps = dispatch => ({}
);

const Login = (props) => {
    const {classes, enqueueSnackbar, history} = props;
    const [email, setEmail] = useState('');
    const [pwd, setPwd] = useState('');


    const handleLoginProcess = async () =>
        await agent.Auth.login({
            email: email
            , passwd: pwd
        })
            .then(res => {
                if (!res.data.result) {
                    res.data.messages.map(n => enqueueSnackbar(n, styleGuide.errorSnackbar));
                    return null
                }
                if (res.data.result) {
                    //todo('pass user info to redux')
                    agent.Auth.getAccount().then(res => console.log(res));
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
                                        <I18nText keyOfI18n={keyOfI18n.WELCOME_BACK}/>!
                                    </Typography>
                                </Grid>

                            </Grid>)
                        });
                    setTimeout(
                        () => redirectUrl('/', history), 1000
                    )


                }

            })
            .catch(err => {
                    if (err.response) {
                        err.response.data.messages.map(n =>
                            enqueueSnackbar(n, styleGuide.errorSnackbar)
                        );
                        setPwd('')
                    }
                }
            );


    return (

        <Grid container className={classes.root} direction={'column'} alignItems={'center'}>
            <Grid item container spacing={16} md={8} xs={12} lg={6}
                  className={classes.innerRoot}>
                <Grid item xs={12}>
                    <Typography className={classes.title} variant={'h4'}>
                        <I18nText keyOfI18n={keyOfI18n.LOGIN}/>

                    </Typography>
                </Grid>
                <Grid item xs={12}>
                    <Input
                        placeholder={useI18nText(keyOfI18n.EMAIL)}
                        value={email}
                        onChange={e => setEmail(e)}
                    />
                </Grid>
                <Grid item xs={12}>
                    <Input
                        type={'password'}
                        placeholder={useI18nText(keyOfI18n.PASSWORD)}
                        value={pwd}
                        onChange={e => setPwd(e)}
                    />
                </Grid>
                <Grid item xs={12}>
                    <Typography
                        className={classes.blueUnderline}
                        variant={'h6'}>
                        <I18nText keyOfI18n={keyOfI18n.AUTH_LOGIN_FORGOT_YOUR_PASSWORD}/>
                    </Typography>
                </Grid>
                <Grid item xs={12}>
                    <Typography
                        onClick={() => redirectUrl('/register', props.history)}
                        className={classes.blueUnderline}
                        variant={'h6'}>
                        <I18nText keyOfI18n={keyOfI18n.AUTH_LOGIN_DONT_HAVE_YOUR_OWN_ACCOUNT_YET}/>
                    </Typography>
                </Grid>
                <Grid item xs={12}>
                    <Button
                        onClick={handleLoginProcess}
                        value={useI18nText(keyOfI18n.AUTH_LOGIN_SIGN_IN)}
                    />
                </Grid>

                <Grid item xs={12}>
                    <Typography
                        onClick={() => redirectUrl('/', history)}
                        className={classes.blueUnderline} variant={'h6'}>
                        <I18nText keyOfI18n={keyOfI18n.AUTH_LOGIN_RETURN_TO_STORE}/>
                    </Typography>
                </Grid>
            </Grid>
        </Grid>
    )
};

export default withSnackbar(withWidth()(connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(Login))))