import React from 'react';
import {Grid, Typography} from '@material-ui/core';
import moment from 'moment';
import h2p from 'html2plaintext';
import {withStyles} from "@material-ui/core/styles/index";
import {withRouter} from "react-router-dom";
import Media from '../../Widget/Media'
import {redirectUrl} from "../../../api/ApiUtils";

const styles = theme => ({

    root: {
        paddingBottom: '20px',
        width: 'calc(25% - 30px)',
        boxShadow: '0px 1px 2px rgba(0, 0, 0, 0.1)',
        cursor: 'pointer',
        flexBasis: 'auto',
        margin: 15
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
        src,
        subTitle,
        title,
        id, author,
        postDate,
        comments,
        medias
    } = props;
    return (
        <Grid container
              onClick={() => redirectUrl('/articles/' + id, props.history)}
              className={classes.root} alignItems={'center'}
              justify={'center'}
        >
            {(medias || []).length > 0 && <Grid item xs={12}>
                <Media
                    box={true}
                    data={medias}/>
            </Grid>}

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
        </Grid>
    )

};


export default withRouter(withStyles(styles)(FeedOverviewBox))