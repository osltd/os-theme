import React, {Fragment} from 'react';
import PropTypes from 'prop-types';
import {withStyles} from '@material-ui/core/styles';
import {Grid, Typography} from '@material-ui/core';
import BigFeedBox from './BigFeedBox'
import SmallFeedBox from './SmallFeedBox'
import {refactorTitle} from "../../../api/ApiUtils";

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


    },
    left: {
        paddingRight: 20,
        paddingLeft: 30,

    },
    right: {
        paddingLeft: 20,
        paddingRight: 30,
    }
});


class FeedsWall extends React.Component {


    render() {
        const {classes, data,} = this.props;
        return (data.length) ? <Grid container alignItems={'stretch'} className={classes.root}>
            <Grid item md={6} className={classes.left}>
                <BigFeedBox
                    link={'/feeds/' + data[0].id}

                    backgroundImg={data[0].sections[0].medias[0].url}
                    title={refactorTitle(data[0].sections[0].title)}

                />
                <SmallFeedBox
                    link={'/feeds/' + data[1].id}

                    left={<div style={{
                        height: '300px',
                        backgroundSize: 'cover',
                        backgroundImage: 'url(' + data[1].sections[0].medias[0].url + ')',
                        width: '100%',
                        backgroundPosition: 'center'
                    }}></div>}
                    right={<div style={{ textAlign: 'center' }}>
                        <Typography
                            style={{padding: '0 20px'}}
                            variant={'subheading'}
                        >
                            {data[1].sections[0].title}      </Typography>
                            <br/>
                            <Typography
                            style={{padding: '0 20px', color: 'rgb(159, 159, 159)'}}
                        >
                            {data[1].sections[0].description}</Typography>

                    </div>}

                />
            </Grid>
            <Grid item md={6} className={classes.right}>
                <SmallFeedBox
                    link={'/feeds/' + data[2].id}

                    right={<div style={{
                        height: '300px',
                        backgroundSize: 'cover',
                        backgroundImage: 'url(' + data[2].sections[0].medias[0].url + ')',
                        width: '100%',
                        backgroundPosition: 'center'
                    }}></div>}
                    left=
                        {(<div style={{ textAlign: 'center' }}>
                            <Typography
                            style={{padding: '0 20px'}}

                            variant={'subheading'}
                        >
                            {data[2].sections[0].title}</Typography>
                            <br/>
                            <Typography
                            style={{padding: '0 20px', color: 'rgb(159, 159, 159)'}}
                        >
                            {data[2].sections[0].description}</Typography>
                        </div>)}

                />
                <BigFeedBox
                    link={'/feeds/' + data[3].id}
                    title={refactorTitle(data[3].sections[0].title)}
                    backgroundImg={data[3].sections[0].medias[0].url}

                />
            </Grid>
        </Grid> : null
    }


}

FeedsWall.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(FeedsWall)