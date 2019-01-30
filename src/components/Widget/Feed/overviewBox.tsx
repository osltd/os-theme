import React from 'react';
import {Grid, Typography} from '@material-ui/core';
import {Theme} from '@material-ui/core/styles'
import moment from 'moment'
import {Media as interfaceMedia} from '../../../interfaces/server/Common'
import Media from '../../Widget/Media'
import {makeStyles} from '@material-ui/styles'
import {redirectUrl} from "../../../api/ApiUtils";
import {History} from "history";

const useStyle = makeStyles((theme: Theme) => ({

            root: {
                minHeight: '450px',
                paddingBottom: '20px',
                boxShadow: '0px 1px 2px rgba(0, 0, 0, 0.1)',
                cursor: 'pointer'
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

        })


)

interface Props {
    history: History
    subTitle: string
    title: string
    id: number
    author: string
    postDate: string
    comments: string
    medias: Array<interfaceMedia>
}

const FeedOverviewBox: React.FunctionComponent<Props> = props => {
    const classes = useStyle()
    const {
        history,
        subTitle,
        title,
        id, author,
        postDate,
        comments,
        medias
    } = props;
    return (
        <Grid container
              onClick={() => redirectUrl('/feeds/' + id, history)}
              className={classes.root} alignItems={'center'}
              justify={'center'}
        >
            <Grid item xs={12}>
                <Media
                    box={true}
                    data={medias}/>
            </Grid>

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
                    <Typography variant={'body1'} color={'secondary'}>{subTitle}</Typography>
                </Grid>

            </Grid>
        </Grid>
    )

};


export default (FeedOverviewBox)