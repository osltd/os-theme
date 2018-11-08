import React from 'react';
import PropTypes from 'prop-types';
import {withStyles} from '@material-ui/core/styles';
import {Grid} from '@material-ui/core';


const styles = theme => ({
    root: {},
    smallDiv: {
        height: '200px',

        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
    },
    bigDiv: {
        height: '400px',

        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',

    }
});


class FeedsWall extends React.Component {


    render() {
        const {classes, data,} = this.props;

        return (

            <Grid container alignItems={'center'} className={classes.root}>
                <Grid item lg={6}>
                    <div className={classes.smallDiv}
                         style={{backgroundImage: 'url("' + data[0].src + '")'}}
                    >
                        {data[1].description}

                    </div>
                    <div className={classes.bigDiv}
                         style={{backgroundImage: 'url("' + data[5].src + '")'}}

                    >
                        {data[1].description}

                    </div>
                </Grid>
                <Grid item lg={6}>
                    <div className={classes.smallDiv}
                         style={{backgroundImage: 'url("' + data[2].src + '")'}}

                    >
                        {data[0].description}
                    </div>
                    <div className={classes.bigDiv}
                         style={{backgroundImage: 'url("' + data[3].src + '")'}}
                    >
                        {data[0].description}

                    </div>
                </Grid>
            </Grid>
        )
    }
}

FeedsWall.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(FeedsWall)