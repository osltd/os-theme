import React, {Fragment} from 'react';
import {Grid, Typography} from '@material-ui/core';
import {withStyles} from '@material-ui/core/styles';
import {connect} from 'react-redux'
import Header from '../Layout/Body/Header'
import moment from 'moment'
import List from '../Widget/List'
import {getTagsCountsArray, redirectUrl, refactorTextLength} from "../../api/ApiUtils";
import {FEED_EDIT_FILTER} from "../../constants/actionType";
import LoadingPage from '../Layout/LoadingPage'
import Media from '../Widget/Media'
import classNames from 'classnames'
const styles = theme => (
    {
        productCategory: {
            backgroundColor: theme.palette.background.paper
        },
        toolBar: {
            backgroundColor: ''
        },
        content:{
            margin:'20px 0',
        },
        backIcon:{
            fontSize:'30px'
        },
        backArrow:{
            cursor:'pointer',

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

class ResponsiveDialog extends React.Component {
    hasValidFeed = () => (this.props.feeds && !!this.props.feeds.find(n => n.id.toString() === this.props.match.params.id))


    render() {

        const {classes} = this.props

        if (this.hasValidFeed()) {
            const feed = this.props.feeds.find(n => n.id.toString() === this.props.match.params.id)
            return (
                <Grid container justify={'center'} className={classes.root}>
                    <Header
                        title={refactorTextLength(feed.sections[0].title)}

                    />

                    <Grid item container spacing={16} xs={12} lg={10}>
                        <Grid item container alignItems={'center'} xs={12}
                              onClick={()=>redirectUrl('/feed')}
                              className={classes.backArrow} >
                            <span
                                className={classNames('icon-circle-left',classes.backIcon)}/>
                            <Typography variant={'title'}>
                                back to feed
                            </Typography>
                        </Grid>

                        <Grid item xs={12} md={3}>
                            <List
                                data={getTagsCountsArray(this.props.feeds, (tag, number) => {
                                    this.props.editFeedFilter('tag', tag)
                                })}
                                link={'/feed'}
                                title={'FEED CATEGORIES'}/>


                        </Grid>
                        <Grid item container xs={12} md={9}>
                            <Grid item container direction={'row'} alignItems={'center'} spacing={16} xs={12}>
                                <Grid item>
                                    <span className={'icon-quill'}/>
                                </Grid>
                                <Grid item>
                                    <Typography variant={'subheading'}>
                                        {feed.authors[0].name.first + ' ' + feed.authors[0].name.last}
                                    </Typography>
                                </Grid>
                                <Grid item>
                                    <span className={'icon-calendar'}/>
                                </Grid>
                                <Grid item>
                                    <Typography variant={'subheading'}>
                                        {moment(feed.time).format('MMM Do YYYY')}
                                    </Typography>
                                </Grid>
                            </Grid>
                            {
                                feed.sections.map((n, i) =>
                                    <Fragment key={i}>
                                        <Grid item container
                                              alignItems={'center'}  justify={'center'} xs={12} key={i}>
                                            <Grid item xs={11}>
                                                <Media
                                                    data={feed.sections[i].medias}/>
                                            </Grid>

                                        </Grid>
                                        <Grid item >
                                            <Typography className={classes.content} variant={'body1'}>
                                                {n.description}
                                            </Typography>
                                        </Grid>
                                    </Fragment>
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
}


export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(ResponsiveDialog))