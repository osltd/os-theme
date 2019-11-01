import React from 'react';
import {Grid, Typography} from '@material-ui/core';
import withWidth, {isWidthUp, isWidthDown} from '@material-ui/core/withWidth/index';
import moment from 'moment';
import h2p from 'html2plaintext';

import {withStyles} from "@material-ui/core/styles/index";
import {withRouter} from "react-router-dom";
import Media from '../../Widget/Media'
import {redirectUrl} from "../../../api/ApiUtils";


const styles = theme => ({
    item: {
        paddingBottom: '20px',
        boxShadow: '0px 1px 2px rgba(0, 0, 0, 0.1)',
        cursor: 'pointer',
        flexBasis: 'auto',
        margin: 15,
        borderWidth: 0,
        backgroundColor: 'transparent',
        padding: 0
    },
    title: {
        cursor: 'pointer',
        '&:hover': {
            color: theme.palette.secondary.light,
        }
    },
    content: {},
    button: {
        margin: '20px 0'
    }

});


const FeedOverviewBox = props => {
    const {
        classes,
        width,

        src,
        subTitle,
        title,
        id, author,
        postDate,
        comments,
        medias
    } = props;
    const isMobile = !isWidthUp('sm', width);
    return <button
        type="button"
        onClick={() => redirectUrl('/articles/' + id, props.history)}
        className={classes.item}
        style={{
            width: isMobile ? '100%' : `calc(${isWidthUp('lg', width) ? 33.3 : 50}% - 30px)`
        }}
    >
        {(medias || []).length > 0 && <Media
            box={true}
            data={medias}
        />}

        <Grid item direction={'column'} container spacing={8} xs={12} md={11} className={classes.content}>
            <Grid item>
                <Typography
                    className={classes.title}
                    variant={'h5'} color={'primary'}>{title}</Typography>
            </Grid>
            <Grid item>
                <Typography
                    variant={'caption'}>{'By ' + author + ' / ' + moment(postDate).format('ll') + ' / ' + comments + ' comments'}</Typography>
            </Grid>
            <Grid item>
                <Typography variant={'body1'} color={'secondary'}>{h2p(subTitle)}</Typography>
            </Grid>

        </Grid>
    </button>;
};


export default withRouter(withStyles(styles)(withWidth()(FeedOverviewBox)))