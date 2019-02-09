import React from 'react';
import PropTypes from "prop-types";
import {Grid, Typography} from '@material-ui/core';
import {makeStyles} from "@material-ui/styles";

const useStyles = makeStyles(theme => ({
    root: {
        padding: '5px',
    },
    username: {},
    star: {
        '&:before': {
            color: 'gold',
        }
    }
}));

class Description extends React.Component {


    render() {
        const {
            content
        } = this.props;


        return (
            <Grid container>
                <Typography variant={'body1'}>
                    {content}
                </Typography>
            </Grid>
        )
    }
}

export default (Description);