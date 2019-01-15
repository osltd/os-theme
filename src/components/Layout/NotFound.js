import PropTypes from "prop-types";
import React from 'react'
import {Grid, Typography} from '@material-ui/core'
import {withStyles} from '@material-ui/core/styles';

const styles = theme => ({
    root: {
        width: '100%',
        padding: '40px',
        marginTop: '200px',
        marginBottom: '200px',

    }
});


const NotFound =props=> {
        const {classes, msg} = props;
        return (
            <Grid container justify={'center'} alignItems={'center'} className={classes.root}>
                <Typography
                    variant={'subheading'}>{msg ? msg : "cant't find current page due to network problem"}</Typography>
            </Grid>);
    }

NotFound.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(NotFound)