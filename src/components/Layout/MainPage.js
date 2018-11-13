import PropTypes from "prop-types";
import React from 'react'
import {Grid,} from '@material-ui/core'
import {withStyles} from '@material-ui/core/styles';

const styles = theme => ({
    root: {}
});


class FeedsOverview extends React.Component {


    componentDidMount() {
    }

    render() {
        const {classes} = this.props;
        return (
            <Grid container className={classes.root}>

            </Grid>);
    }
}

FeedsOverview.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(FeedsOverview)