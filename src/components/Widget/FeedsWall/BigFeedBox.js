import React from 'react';
import PropTypes from 'prop-types';
import {withStyles} from '@material-ui/core/styles';
import {Grid, Typography} from '@material-ui/core';
import {withRouter} from "react-router-dom";


const styles = theme => ({
    root: {
        height: '400px',
        border: '10px solid white',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundColor: '#d3dbe2',
        cursor:'pointer',
    },
    title: {
        color: 'white',
        fontWeight: '900',
    }
});


class FeedsWall extends React.Component {


    render() {
        const {classes, title, backgroundImg,link} = this.props;

        return (
            <Grid container alignItems={'center'} justify={'center'} className={classes.root} style={{
                backgroundImage: 'url("' + backgroundImg + '")',

            }}

                  onClick={()=>this.props.history.push(link)}

            >
                <Typography variant={'display1'} className={classes.title}>
                    {title}
                </Typography>
            </Grid>
        )
    }
}

FeedsWall.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withRouter(withStyles(styles)(FeedsWall))