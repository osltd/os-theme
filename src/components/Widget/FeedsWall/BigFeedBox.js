import React from 'react';
import PropTypes from 'prop-types';
import {withStyles} from '@material-ui/core/styles';
import {Grid, Typography} from '@material-ui/core';
import {withRouter} from "react-router-dom";
import {redirectUrl} from "../../../api/ApiUtils";

const styles = theme => ({
    root: {
        height: '400px',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundColor: '#d3dbe2',
        cursor: 'pointer',
        marginBottom: 35,
    },
    title: {
        color: 'white',
        fontWeight: '900',
        textAlign: 'center',
    }, iAmDiv: {}
});


class FeedsWall extends React.Component {


    render() {
        const {classes, title, backgroundImg, link} = this.props;

        return (
            <div className={classes.iAmDiv}>
                <Grid container alignItems={'center'} justify={'center'} className={classes.root} style={{
                    backgroundImage: 'url(' + backgroundImg + ')'
                }} onClick={() => redirectUrl(link, this.props.history)}>
                    <Typography variant={'h4'} className={classes.title}>
                        {title}
                    </Typography>
                </Grid>
            </div>
        )
    }
}

FeedsWall.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withRouter(withStyles(styles)(FeedsWall))