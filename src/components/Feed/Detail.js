import React from 'react';
import {Grid, Typography} from '@material-ui/core';
import {withStyles} from '@material-ui/core/styles';
import {connect} from 'react-redux'
import Header from '../Layout/Body/Header'
import moment from 'moment'
import List from '../Widget/List'
import {getTagsCountsArray,redirectUrl, refactorTextLength} from "../../api/ApiUtils";
import {FEED_EDIT_FILTER} from "../../constants/actionType";
import LoadingPage from '../Layout/LoadingPage'
import Media from '../Widget/Media'
import classNames from 'classnames'
import * as styleGuide from "../../constants/styleGuide";

const styles = theme => (
    {
        productCategory: {
            backgroundColor: theme.palette.background.paper
        },
        toolBar: {},
        content: {
            margin: '20px 0',
        },
        backIcon: {
            fontSize: '30px'
        },
        backArrow: {
            cursor: 'pointer',

        },
        basicInfo:{
            paddingBottom:'10px',
        },
        basicInfoText:{
            display:"inline-block",
            paddingLeft:'5px',
        }
    })


const mapStateToProps = state => ({
    feeds: state.feed.feeds,
});


const mapDispatchToProps = dispatch => ({
        editFeedFilter: (key, value) => dispatch({
            type: FEED_EDIT_FILTER,
            payload: {
                key: key,
                value: value,
            },
        }),


    }
)

const FeedDetail = (props) => {

    const {feeds, match, classes, editFeedFilter, history} = props
    const hasValidFeed = () => (feeds && !!feeds.find(n => n.id.toString() === match.params.id))
    if (hasValidFeed()) {
        const feed = feeds.find(n => n.id.toString() === match.params.id)
        return (
            <Grid container justify={'center'} className={classes.root}>
                <Header title={refactorTextLength(feed.sections[0].title)}/>
                <Grid item container spacing={16} xs={12} lg={10}>
                    {
                        false && <Grid item container alignItems={'center'} xs={12}
                                       onClick={() => redirectUrl('/feed',history)}
                                       className={classes.backArrow}>
                            <span
                                className={classNames('icon-circle-left', classes.backIcon)}/>
                            <Typography variant={'h6'}>
                                back to feed
                            </Typography>
                        </Grid>
                    }
                    <Grid item xs={12} md={3}>
                        <List
                            data={getTagsCountsArray(feeds, (tag, number) => {
                                editFeedFilter('tag', tag)
                                redirectUrl('/feeds', history, false)
                            })}
                            title={'FEED CATEGORIES'}/>


                    </Grid>
                    <Grid item container xs={12} md={9}>
                        <Grid item container direction={'row'}
                              justify={'space-between'}
                              alignItems={'center'}
                              className={classes.basicInfo}

                              spacing={16} xs={12}>
                            <Grid item>
                                <span className={'icon-icons8-edit'}/>
                                 <Typography variant={'subtitle1'} className={classes.basicInfoText}>
                                    {feed.authors.length > 0 ? feed.authors[0].name.first + ' ' + feed.authors[0].name.last : 'no authors'}
                                </Typography>
                            </Grid>
                            <Grid item>
                                <span className={'icon-icons8-calendar'}/>
                                <Typography variant={'subtitle1'} className={classes.basicInfoText}>
                                    {moment(feed.time).format('MMM Do YYYY')}
                                </Typography>
                            </Grid>
                        </Grid>
                        {
                            feed.sections.map((n, i) =>
                                <Grid item container
                                      alignItems={'center'} xs={12} key={i}>
                                    <Grid item xs={12}>
                                        <Media
                                            data={feed.sections[i].medias}/>
                                    </Grid>
                                    <Grid item xs={1}/>
                                    <Grid item xs={10}>
                                        <Typography className={classes.content} variant={'body1'}>
                                            {n.description}
                                        </Typography>
                                    </Grid>
                                    <Grid item xs={1}/>

                                </Grid>
                            )
                        }
                    </Grid>
                </Grid>
            </Grid>
        )
    } else {
        return <LoadingPage/>
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(FeedDetail))

