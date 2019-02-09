import PropTypes from "prop-types";
import React from 'react'
import {Grid, Typography} from '@material-ui/core'
import {makeStyles} from "@material-ui/styles";

const useStyles = makeStyles(theme => ({
    root: {
        width: '100%',
        padding: '40px',
        marginTop: '200px',
        marginBottom: '200px',

    }
}));


const NotFound = props => {
    const classes = useStyles();
    const {msg} = props;
    return (
        <Grid container justify={'center'} alignItems={'center'} className={classes.root}>
            <Typography
                variant={'subtitle1'}>{msg ? msg : "cant't find current page due to network problem"}</Typography>
        </Grid>);
};


export default (NotFound)