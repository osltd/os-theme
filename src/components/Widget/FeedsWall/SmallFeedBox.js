import React from 'react';
import PropTypes from 'prop-types';
import {withStyles} from '@material-ui/core/styles';
import {Grid} from '@material-ui/core';


const styles = theme => ({
    root: {
        border:'10px solid white',

        backgroundColor:'#FAFAFA'
    },
});


class FeedsWall extends React.Component {


    render() {
        const {classes, left,right,} = this.props;

        return (
            <Grid container alignItems={'center'}   className={classes.root}>
                <Grid item container direction={'column'} justify={'flex-start'} alignItems={'center'} sm={5} >
                    {left}
                </Grid>
                <Grid item sm={7}  container direction={'column'} justify={'flex-end'} alignItems={'center'} >
                    {right}
                </Grid>
            </Grid>
        )
    }
}

FeedsWall.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(FeedsWall)