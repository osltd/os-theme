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

const styles = theme => ({
    root: {},
    title: {
        paddingTop: '30px',

        textAlign: 'center',
    },
    innerRoot: {
        padding: '0px 120px 60px 120px ',
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

})

const mapStateToProps = state => ({
    products: state.product.products,
    viewMode: state.product.viewMode,
    sort: state.product.sort,
});


const mapDispatchToProps = dispatch => ({}
)

const Login = (props)=> {
    const {classes, enqueueSnackbar,history} = props
    const [email, setEmail] = useState('')
    const [pwd, setPwd] = useState('')


    const handleLoginProcess = async () =>
        await  agent.Auth.login({
            email: email
            , passwd: pwd
        })
            .then(res => {
                if (!res.data.result) {
                    res.data.messages.map(n => enqueueSnackbar(n, styleGuide.errorSnackbar))
                    return null
                }
                if (res.data.result) {
                    //todo('pass user info to redux')
                    agent.Auth.getAccount().then(res => console.log(res))
                    swal(
                        {
                            content: (<Grid container alignItems={'center'} direction={'column'}>
                                <Grid item>
                    <span className={'icon-like'}

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
                    />
                                </Grid>
                                <Grid item>
                                    <Typography variant={'h4'}>
                                        Welcome back!
                                    </Typography>
                                </Grid>

                            </Grid>)
                        })
                    setTimeout(
                        () => redirectUrl('/', history), 1000
                    )


                }

            })
            .catch(err => {
                    if (err.response) {
                        err.response.data.messages.map(n =>
                            enqueueSnackbar(n, styleGuide.errorSnackbar)
                        )
                        setPwd('')
                    }
                }
            )


    return (

        <Grid container className={classes.root} direction={'column'} alignItems={'center'}>
            <Grid item container spacing={16} md={8} xs={12} lg={6} direction={'column'}
                  className={classes.innerRoot}>
                <Grid item>
                    <Typography className={classes.title} variant={'h4'}>
                        Login

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
                <Grid item xs={12}>
                    <Typography
                        className={classes.blueUnderline}
                        variant={'h6'}>
                        Forgot your password?
                    </Typography>
                </Grid>
                <Grid item xs={12}>
                    <Button
                        onClick={handleLoginProcess}
                        value={'Sign In'}
                    />
                </Grid>

                <Grid item xs={12}>
                    <Typography
                        onClick={() => redirectUrl('/', history)}
                        className={classes.blueUnderline} variant={'h6'}>
                        Return to Store
                    </Typography>
                </Grid>
            </Grid>
        </Grid>
    )
}

export default withSnackbar(withWidth()(connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(Login))))