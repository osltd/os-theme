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
            classes, icon, value,
            icon2, label,
            labelExtra, options,
            selectedValue
        } = this.props;


        return (
            <Grid container>
                <Typography variant={'body2'}>
                    enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia res eos qui ratione
                    voluptatem sequi Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur,
                    adipisci veli enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia res
                    eos qui ratione
                    voluptatem sequi Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur,
                    adipisci veli
                </Typography>
            </Grid>
        )
    }
}

Description.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Description);