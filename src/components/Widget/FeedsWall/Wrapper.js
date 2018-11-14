import React, {Fragment} from 'react';
import PropTypes from 'prop-types';
import {withStyles} from '@material-ui/core/styles';
import {Grid, Typography} from '@material-ui/core';
import BigFeedBox from './BigFeedBox'
import SmallFeedBox from './SmallFeedBox'

const styles = theme => ({
    root: {

        padding: '0 10px',
    },
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
        return (data.length) ? <Grid container alignItems={'stretch'} className={classes.root}>
            <Grid item md={6}>
                <BigFeedBox
                    link={'/feed/'+data[0].id}

                    backgroundImg={data[0].sections[0].medias[0].url}
                    title={data[0].sections[0].title}

                />
                <SmallFeedBox
                    link={'/feed/'+data[1].id}

                    left={<img
                        style={{width: '100%', height: '180px'}}
                        src={data[1].sections[0].medias[0].url}
                    />}
                    right={<Fragment>
                        <Typography
                            variant={'subheading'}
                        >
                            {data[1].sections[0].title}      </Typography>

                    </Fragment>}

                />
            </Grid>
            <Grid item md={6}>
                <SmallFeedBox
                    link={'/feed/'+data[2].id}

                    right={<img
                        style={{width: '100%', height: '180px'}}
                        src={data[2].sections[0].medias[0].url}
                    />}
                    left=
                        {(<Typography
                            variant={'subheading'}
                        >
                            {data[2].sections[0].title}          </Typography>)

                    }

                />
                <BigFeedBox
                    link={'/feed/'+data[2].id}
                    title=    {data[2].sections[0].title}
                    backgroundImg={data[2].sections[0].medias[0].url}

                />
            </Grid>
        </Grid> : null
    }


}

FeedsWall.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(FeedsWall)