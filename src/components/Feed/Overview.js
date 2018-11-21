import React from 'react';
import {Grid, Typography} from '@material-ui/core';
import {withStyles} from '@material-ui/core/styles';
import {connect} from 'react-redux'
import FeedOverviewBox from '../Widget/Feed/overviewBox'
import Header from '../Layout/Body/Header'
import List from '../Widget/List'
import SearchBar from '../Widget/SearchBar/original'
import {getTagsCountsArray, refactorParaLength} from "../../api/ApiUtils";
import {FEED_EDIT_FILTER} from "../../constants/actionType";
import _ from 'lodash'

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

    sortData = () => (this.props.feeds) ?
        Array.from(this.props.feeds).filter(n =>
            (
                ((this.props.filter.tag) ? !!n.tags.find(k => k === this.props.filter.tag) : true) &&
                ((this.props.filter.keyword) ? !!n.sections.find(section => _.includes(section.title.toLowerCase(), this.props.filter.keyword)) : true)
            )
        ) : null


    render() {
        const {classes} = this.props
        const feeds = this.sortData()
        return (

            <Grid container justify={'center'}>
                <Grid item xs={12}>
                    <Header
                        title={'BLOG'} route={'HOME/BLOG'}
                    />
                </Grid>
                <Grid item container justify={'center'} xs={12} lg={10} spacing={16}>
                    <Grid item lg={3} xs={11}>
                        <List
                            data={getTagsCountsArray(this.props.feeds, (tag, number) => {
                                this.props.editFeedFilter('tag', tag)
                            })}
                            selectedValue={this.props.filter.tag}
                            title={'FEED CATEGORIES'}/>
                        <Typography
                            variant={'title'}
                        >
                            SEARCH
                        </Typography>
                        <SearchBar
                            value={this.props.filter.keyword}
                            onChange={value => this.props.editFeedFilter('keyword', value)}
                            placeholder={'type keywords'}
                        />
                    </Grid>
                    <Grid item container lg={9} spacing={32} xs={11}>
                        {feeds && feeds.map((n, i) =>
                            <Grid item md={6} xs={12} key={i}>
                                <FeedOverviewBox
                                    id={n.id}
                                    src={n.sections && n.sections.find(section => !!section.medias[0]) ? n.sections.find(section => section.medias[0]).medias[0].url :
                                        'https://www.freeiconspng.com/uploads/no-image-icon-15.png'}
                                    subTitle={refactorParaLength(n.sections[0].description)}
                                    title={n.sections[0].title}
                                    author={n.authors[0].name.first + ' ' + n.authors[0].name.last}
                                    postDate={n.postDate}
                                    comments={0}
                                />
                            </Grid>)}
                    </Grid>
                </Grid>
            </Grid>

        );
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(ResponsiveDialog))