import React from 'react';
import {Grid, Typography} from '@material-ui/core';
import {withStyles} from '@material-ui/core/styles';
import {connect} from 'react-redux'
import FeedOverviewBox from '../Widget/Feed/overviewBox'
import Header from '../Layout/Body/Header'
import List from '../Widget/List'
import SearchBar from '../Widget/SearchBar/original'
import {getTagsCountsArray} from "../../api/ApiUtils";
import {refactorParaLength} from "../../api/test"

import {FEED_EDIT_FILTER} from "../../constants/actionType";
import _ from 'lodash'
import LoadingPage from '../Layout/LoadingPage'

const styles = theme => {
    return (
        {
            productCategory: {
                backgroundColor: theme.palette.background.paper
            },
            toolBar: {
                backgroundColor: ''
            },
        })

}


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
)

class ResponsiveDialog extends React.Component {

    onChange = value => {
        clearTimeout(this.state.timer)
        this.setState(
            {
                timer: setTimeout(() => this.props.editFeedFilter('keyword', value), 500)

            }
        )
    }

    constructor(props) {
        super(props)
        this.state = {
            timer: () => null
        }

    }

    render() {
        const {classes} = this.props
        const feeds = (this.props.feeds) ?
            this.props.feeds.filter(n =>
                (
                    ((this.props.filter.tag) ? !!n.tags.find(k => k === this.props.filter.tag) : true) &&
                    ((this.props.filter.keyword) ? !!n.sections.find(section => _.includes(section.title.toLowerCase(), this.props.filter.keyword)) : true)
                )
            ) : null

        return (

            <Grid container justify={'center'}>
                <Grid item xs={12}>
                    <Header
                        title={'BLOG'} route={'HOME/BLOG'}
                    />
                </Grid>
                <Grid item container justify={'center'} xs={12} lg={11} spacing={16}>
                    <Grid item lg={3} container direction={'column'} spacing={16} xs={11}>
                        <Grid item>
                            <Typography variant={'title'}>SEARCH</Typography>
                        </Grid>
                        <Grid item>
                            <SearchBar
                                value={this.props.filter.keyword}
                                onChange={value => this.onChange(value)}
                                placeholder={'type keywords'}/>
                        </Grid>
                        <Grid item>
                            <List
                                data={getTagsCountsArray(this.props.feeds, (tag, number) => {
                                    this.props.editFeedFilter('tag', tag)
                                })}
                                selectedValue={this.props.filter.tag}
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

                                        subTitle={refactorParaLength(111)}
                                        title={n.sections[0].title}
                                        author={n.authors.length > 0 ? n.authors[0].name.first + ' ' + n.authors[0].name.last : 'no authors'}
                                        postDate={n.postDate}
                                        comments={0}
                                    />
                                </Grid>) :


                            <Typography variant={'subheading'}> there are no posts available yet</Typography>


                            : <LoadingPage/>}
                    </Grid>
                </Grid>
            </Grid>

        );
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(ResponsiveDialog))