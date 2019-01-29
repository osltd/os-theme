import React from 'react';
import {Theme} from '@material-ui/core/styles';
import {makeStyles} from '@material-ui/styles';
import {Grid, Typography} from '@material-ui/core';
import BigFeedBox from './BigFeedBox'
import SmallFeedBox from './SmallFeedBox'
import {refactorTitle} from "../../../api/ApiUtils";
import {RouteComponentProps} from "react-router";
import {History} from "history";
import {Feed} from "../../../interfaces/server/Feed";

const useStyle = makeStyles((theme: Theme) => ({
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
}))

interface Props  {
    history: History
    data: Array<Feed>
}

const FeedsWall: React.FunctionComponent<Props> = props => {

    const classes = useStyle()

    const {data, history} = props;
    return (data.length) ? <Grid container alignItems={'stretch'} className={classes.root}>
        <Grid item md={6} className={classes.left}>
            <BigFeedBox
                history={history}
                link={'/feeds/' + data[0].id}
                backgroundImg={data[0].sections[0].medias[0].url}
                title={refactorTitle(data[0].sections[0].title)}
            />
            {data[1] && <SmallFeedBox
                history={history}

                link={'/feeds/' + data[1].id}

                left={<div style={{
                    height: '300px',
                    backgroundSize: 'cover',
                    backgroundImage: 'url(' + data[1].sections[0].medias[0].url + ')',
                    width: '100%',
                    backgroundPosition: 'center'
                }}/>}
                right={<div style={{textAlign: 'center'}}>
                    <Typography
                        style={{padding: '0 20px'}}
                        variant={'subtitle1'}
                    >
                        {data[1].sections[0].title}      </Typography>
                    <br/>
                    <Typography
                        style={{padding: '0 20px', color: 'rgb(159, 159, 159)'}}
                    >
                        {data[1].sections[0].description}</Typography>

                </div>}

            />}
        </Grid>
        <Grid item md={6} className={classes.right}>
            {data[2] && <SmallFeedBox
                history={history}
                link={'/feeds/' + data[2].id}

                right={<div style={{
                    height: '300px',
                    backgroundSize: 'cover',
                    backgroundImage: 'url(' + data[2].sections[0].medias[0].url + ')',
                    width: '100%',
                    backgroundPosition: 'center'
                }}/>}
                left=
                    {(<div style={{textAlign: 'center'}}>
                        <Typography
                            style={{padding: '0 20px'}}

                            variant={'subtitle1'}
                        >
                            {data[2].sections[0].title}</Typography>
                        <br/>
                        <Typography
                            style={{padding: '0 20px', color: 'rgb(159, 159, 159)'}}
                        >
                            {data[2].sections[0].description}</Typography>
                    </div>)}

            />}
            {data[3] && <BigFeedBox
                history={history}
                link={'/feeds/' + data[3].id}
                title={refactorTitle(data[3].sections[0].title)}
                backgroundImg={data[3].sections[0].medias[0].url}

            />}
        </Grid>
    </Grid> :null


}

export default (FeedsWall)