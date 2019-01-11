import React from 'react';
import PropTypes from 'prop-types';
import {withStyles} from '@material-ui/core/styles';
import {Grid} from '@material-ui/core';
import {withRouter} from "react-router-dom";
import {redirectUrl} from "../../../api/ApiUtils";


const styles = theme => ({
    root: {
        backgroundColor: '#F6F6F6',
        cursor: 'pointer',
        marginBottom: 35,

    },
});


class FeedsWall extends React.Component {
    render() {
        const {classes, left, right, link} = this.props;

        return (
            <Grid container alignItems={'center'} className={classes.root}
                  onClick={() => redirectUrl(link, this.props.history)}>
                <Grid item container direction={'column'} justify={'flex-start'} alignItems={'center'} sm={5}>
                    {left}
                </Grid>
                <Grid item sm={7} container direction={'column'} justify={'flex-end'} alignItems={'center'}>
                    {right}
                </Grid>
            </Grid>
        )
    }
}

FeedsWall.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withRouter(withStyles(styles)(FeedsWall))