import React from 'react';
import PropTypes from 'prop-types';
import {withStyles} from '@material-ui/core/styles';
import withWidth from "@material-ui/core/withWidth/index";
import {withRouter} from "react-router-dom";
import {connect} from "react-redux";
import {Grid, Typography} from '@material-ui/core'
import CustomButton from '../../Widget/Button/BlackButton'
import {redirectUrl} from "../../../api/ApiUtils";
import _ from 'lodash'
import swal from '@sweetalert/with-react'
import agent from '../../../agent'

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
    user: state.auth.user,
});


class MyAccount extends React.Component {
    handleChange = (event, value) => {
        this.setState({value});
    };
    logout = () => {
        localStorage.clear()
        agent.Auth.logout().then(
            res => {

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
                                <Typography variant={'display1'}>
                                    You have successfully logout!
                                </Typography>
                            </Grid>
                            <Grid item>
                                <Typography variant={'subHeading'}>
                                    see you </Typography>
                            </Grid>

                        </Grid>)
                    })
                setTimeout(
                    () => redirectUrl('/', this.props.history)
                    , 1000
                )
            }
        ).catch(err => console.log(err))
    }

    constructor(props) {
        super(props)
        this.state = {
            keyword: ''
        };
    }

    componentDidMount() {
    }

    render() {

        const {classes, width, user} = this.props;
        return (!_.isEmpty(user)) ?

            <Grid container
                  className={classes.dialog}
                  justify={'center'}
                  alignItems={'center'}
            >
                {
                    console.log('this is user infomation')
                }
                {
                    console.log(user)
                }

                <Grid item xs={12} className={classes.textAlign}>
                    <Typography>{`${user['first_name']} ${user['last_name']} welcome back`}</Typography>
                </Grid>
                <Grid item xs={8}>
                    <CustomButton
                        onClick={this.logout}
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
                    <Grid item xs={4}>
                        <CustomButton
                            onClick={() => redirectUrl('/login')}
                            value={'Log In'}
                        />
                    </Grid>
                    <Grid item xs={1}/>

                    <Grid item xs={4}>

                        <CustomButton
                            onClick={() => redirectUrl('/register')}

                            value={'Register'}
                        />
                    </Grid>

                </Grid>)

    }
}

MyAccount.propTypes = {
    classes: PropTypes.object.isRequired,
}

export default connect(mapStateToProps, {})(withRouter(withWidth()(withStyles(styles)(MyAccount))))