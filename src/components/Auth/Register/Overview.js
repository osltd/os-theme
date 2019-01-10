import React from 'react';
import {Grid,Typography} from '@material-ui/core';
import {connect} from 'react-redux'
import {withStyles} from '@material-ui/core/styles';
import withWidth from "@material-ui/core/withWidth/index";
import Input from '../../Widget/Input/original'
import Header from '../../Layout/Body/Header'
import Button from '../../Widget/Button/BlackButton'
import {withSnackbar} from 'notistack';
import * as styleGuide from "../../../constants/styleGuide";
import agent from '../../../agent'
import swal from '@sweetalert/with-react'


const styles = theme => ({
    root: {
        backgroundColor: theme.palette.background.default,
    },
    title:{
        textAlign:'center',
    },
    innerRoot: {
        padding: '0px 120px 60px 120px ',
        margin: '100px 0px',
        backgroundColor: 'white',
    },
    paddingTop: {
        paddingTop: '20px !important',
    }
})

const mapStateToProps = state => ({
    products: state.product.products,
    viewMode: state.product.viewMode,
    sort: state.product.sort,
});


const mapDispatchToProps = dispatch => ({}
)

class Login extends React.Component {
    register = () => {
        const pwdDidNotMatch = (this.state.pwd !== this.state.confirmPwd)
        if (pwdDidNotMatch) {
            this.props.enqueueSnackbar('Password does not match', styleGuide.errorSnackbar)
            this.setState(
                {
                    pwd: '',

                }
            )
            return null
        }

        agent.Auth.register(
            {
                first_name: this.state.firstName,
                last_name: this.state.lastName,
                email: this.state.email,
                passwd: this.state.pwd,
                confpasswd: this.state.confirmPwd

            }
        ).then(
            res => swal("Congratulation!", "Account created!", "success")
        ).catch(
            err => err.response.data.messages.map(
                n => this.props.enqueueSnackbar(n, styleGuide.errorSnackbar)
            )
        )
    }

    constructor(props) {
        super(props)
        this.state = {
            firstName: '',
            lastName: '',

            email: '',
            pwd: '',
            confirmPwd: '',
        }
    }

    render() {

        const {classes} = this.props
        return (

            <Grid container className={classes.root} justify={'center'} alignItems={'center'}>
                <Grid item container spacing={16} md={8} xs={12} lg={6} direction={'column'}
                      className={classes.innerRoot}>
                    <Grid item >
                    <Typography className={classes.title} variant={'display1'}>
                 Create your account
                    </Typography>
                    </Grid>
                    <Grid item>
                        <Input
                            placeholder={'First Name'}
                            value={this.state.firstName}
                            onChange={e => this.setState({firstName: e})}
                        />
                    </Grid>
                    <Grid item className={classes.paddingTop}>
                        <Input
                            placeholder={'Last Name'}
                            value={this.state.lastName}
                            onChange={e => this.setState({lastName: e})}
                        />
                    </Grid>
                    <Grid item className={classes.paddingTop}>
                        <Input
                            placeholder={'Email'}
                            value={this.state.email}
                            onChange={e => this.setState({email: e})}
                        />
                    </Grid>
                    <Grid item className={classes.paddingTop}>
                        <Input
                            type={'Password'}
                            placeholder={'Password'}
                            value={this.state.pwd}
                            onChange={e => this.setState({pwd: e})}
                        />
                    </Grid>
                    <Grid item className={classes.paddingTop}>
                        <Input
                            type={'Password'}
                            placeholder={'Confirm Password'}
                            value={this.state.confirmPwd}
                            onChange={e => this.setState({confirmPwd: e})}
                        />
                    </Grid>
                    <Grid item className={classes.paddingTop}>
                        <Button
                            onClick={this.register}
                            value={'Create'}
                        />
                    </Grid>

                </Grid>
            </Grid>
        );
    }
}

export default withSnackbar(withWidth()(connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(Login))))