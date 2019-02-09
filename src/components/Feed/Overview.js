import React, {useState} from 'react';
import {Grid, Typography} from '@material-ui/core';
import {connect} from 'react-redux'
import FeedOverviewBox from '../Widget/Feed/overviewBox'
import Header from '../Layout/Body/Header'
import List from '../Widget/List'
import SearchBar from '../Widget/SearchBar/original'
import {getTagsCountsArray, refactorTextLength} from "../../api/ApiUtils";


import {FEED_EDIT_FILTER} from "../../constants/actionType";
import _ from 'lodash'
import LoadingPage from '../Layout/LoadingPage'
import {makeStyles} from "@material-ui/styles";

const useStyles = makeStyles(theme => {
    return (
        {
            productCategory: {
                backgroundColor: theme.palette.background.paper
            },
            toolBar: {
                backgroundColor: ''
            },
        })

});


const mapStateToProps = state => ({
    feeds: state.feed.feeds,
    sort: state.feed.sort,
    filter: state.feed.filter,

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
);

const FeedOverview = props => {
    const [timer, setTimer] = useState(() => null)

    let onChange = value => {
        clearTimeout(timer);
        setTimer(
            setTimeout(() => props.editFeedFilter('keyword', value), 500)
        )
    };

    const classes = useStyles();

    const feeds = (props.feeds) ?
        props.feeds.filter(n =>
            (((props.filter.tag) ? !!n.tags.find(k => k === props.filter.tag) : true) && ((props.filter.keyword) ? !!n.sections.find(section => _.includes(section.title.toLowerCase(), props.filter.keyword)) : true))) : null;
    return (<Grid container justify={'center'}>
            <Grid item xs={12}>
                <Header
                    title={'BLOG'} route={'HOME/BLOG'}
                />
            </Grid>
            <Grid item container justify={'center'} xs={12} lg={11} spacing={16}>
                <Grid item lg={3} container direction={'column'} spacing={16} xs={11}>
                    <Grid item>
                        <Typography variant={'h6'}>SEARCH</Typography>
                    </Grid>
                    <Grid item>
                        <SearchBar
                            value={props.filter.keyword}
                            onChange={value => onChange(value)}
                            placeholder={'type keywords'}/>
                    </Grid>
                    <Grid item>
                        <List
                            data={getTagsCountsArray(props.feeds, (tag, number) => {
                                props.editFeedFilter('tag', tag)
                            })}
                            selectedValue={props.filter.tag}
                            title={'FEED CATEGORIES'}/></Grid>

                </Grid>
                <Grid item container lg={9} spacing={32} xs={11}>
                    {feeds ? feeds.length > 0 ? feeds.map((n, i) =>
                            <Grid item md={6} xs={12} key={i}>
                                <FeedOverviewBox
                                    id={n.id}
                                    medias={n.sections[0].medias}
                                    src={n.sections && n.sections.find(section => !!section.medias[0]
                                    ) ? n.sections.find(section => section.medias[0]).medias[0].url :
                                        'https://www.freeiconspng.com/uploads/no-image-icon-15.png'}

                                    subTitle={refactorTextLength(n.sections[0].description, 45)}
                                    title={n.sections[0].title}
                                    author={n.authors.length > 0 ? n.authors[0].name.first + ' ' + n.authors[0].name.last : 'no authors'}
                                    postDate={n.postDate}
                                    comments={0}
                                />
                            </Grid>) :


                        <Typography variant={'subtitle1'}> there are no posts available yet</Typography>


                        : <LoadingPage/>}
                </Grid>
            </Grid>
        </Grid>

    );
}

export default connect(mapStateToProps, mapDispatchToProps)(FeedOverview)