import React from 'react'
import {Button, Grid, Typography} from '@material-ui/core'
import {withStyles} from '@material-ui/core/styles';
import {redirectUrl} from "../../api/ApiUtils";
import {withRouter} from "react-router-dom";
import ImageWrapper from "../Widget/Img";

const styles = theme => ({
    root: {
        width: '100%',
        padding: '40px',
        marginBottom: '200px',

    }
});


const Validate = props => {
    const {classes} = props
    return (
        <Grid container justify={'center'} alignItems={'center'} direction={"column"} className={classes.root}>
            {
                (props.location.search === '?state=1') ? <>
                        <Grid item >
                            <ImageWrapper src={'/img/init/success.jpg'}/>
                        </Grid>
                        <Grid item  >

                        <Typography

                            variant={"h4"}>{'Thanks for your validation, your account has been activated, you can '}
                            <Button variant={"contained"} onClick={() => redirectUrl('/login', props.history)}>Log
                                in</Button>
                            {' now'}

                        </Typography>
                        </Grid>
                    </> :
                    <>
                    <Grid item >

                    <ImageWrapper src={'/img/init/fail.jpg'}/>
                    </Grid>
                        <Grid item >
                        <Typography

                            variant={'h4'}>{'Failed to validate.'}
                        </Typography>
                        </Grid>
                    </>
            }
        </Grid>);
}


export default withRouter(withStyles(styles)(Validate))