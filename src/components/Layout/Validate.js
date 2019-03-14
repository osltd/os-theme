import React from 'react'
import {Button, Grid, Typography} from '@material-ui/core'
import {withStyles} from '@material-ui/core/styles';
import {redirectUrl} from "../../api/ApiUtils";
import {withRouter} from "react-router-dom";

const styles = theme => ({
    root: {
        width: '100%',
        padding: '40px',
        marginTop: '200px',
        marginBottom: '200px',

    }
});


const Validate = props => {
    const {classes} = props
    return (
        <Grid container justify={'center'} alignItems={'center'} className={classes.root}>
            <Typography
                variant={'subtitle1'}>{'Thanks for your validation, your account has been activated, you can '}
                <Button variant={"outlined"} onClick={() => redirectUrl('/login', props.history)}>Log in</Button>
                {' now'}

            </Typography>

        </Grid>);
}


export default withRouter(withStyles(styles)(Validate))