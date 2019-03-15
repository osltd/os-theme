import React from 'react';
import {Grid, Theme, Typography} from '@material-ui/core';
import {redirectUrl} from "../../../api/ApiUtils";
import {makeStyles} from '@material-ui/styles'

import {History} from "history";

const useStyle = makeStyles((theme: Theme) => ({
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
        fontWeight: 900,
        textAlign: 'center',
    },
    iAmDiv: {}
}));

interface Props {
    history: History
    title: string
    backgroundImg: string
    link: string
}

const BigFeedBox: React.FunctionComponent<Props> = props => {
    const classes = useStyle();
    const {title, backgroundImg, history, link} = props;

    return (
        <div className={classes.iAmDiv}>
            <Grid container alignItems={'center'} justify={'center'} className={classes.root} style={{
                backgroundImage: 'url(' + backgroundImg + ')'
            }} onClick={() => redirectUrl(link, history)}>
                <Typography variant={'h4'} className={classes.title}>
                    {title}
                </Typography>
            </Grid>
        </div>
    )
};


export default (BigFeedBox)