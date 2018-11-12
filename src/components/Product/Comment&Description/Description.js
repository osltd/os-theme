import React from 'react';
import {withStyles} from '@material-ui/core/styles';
import PropTypes from "prop-types";
import {Grid, Typography} from '@material-ui/core';

const styles = theme => ({
    root: {
        padding: '5px',
    },
    username: {},
    star: {
        '&:before': {
            color: 'gold',
        }
    }
});

class Description extends React.Component {


    render() {
        const {
            content
        } = this.props;


        return (
            <Grid container>
                <Typography variant={'body2'}>
                    {content}
                </Typography>
            </Grid>
        )
    }
}

Description.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Description);