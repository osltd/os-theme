import React from 'react';
import {Grid, Typography} from '@material-ui/core';
import {withStyles} from '@material-ui/core/styles';
import {connect} from 'react-redux';
import withWidth, {isWidthUp} from '@material-ui/core/withWidth/index';


import FeedOverviewBox from '../Widget/Feed/overviewBox'
import Header from '../Layout/Body/Header'
import List from '../Widget/List'
import SearchBar from '../Widget/SearchBar/original'
import {getTagsCountsArray, refactorTextLength} from "../../api/ApiUtils";

import Gallery from './Gallery'
import {FEED_EDIT_FILTER} from "../../constants/actionType";
import _ from 'lodash'
import LoadingPage from '../Layout/LoadingPage'
import {I18nText} from "../Widget/I18nText";
import {keyOfI18n} from "../../constants/locale/interface";
import {useI18nText} from "../../hooks/useI18nText";


const styles = theme => {
    return {
        menu: {
            width: '25%'
        },
        searchBar: {
            marginBottom: 35
        },
        searchTitle: {
            fontFamily: '-apple-system,BlinkMacSystemFont,sans-serif',
            fontSize: 20,
            fontWeight: 400,
            padding: 0,
            marginTop: 0
        },

        list: {
            width: 'calc(75% - 35px)',
            marginLeft: 35
        },
        placeholder: {
            fontFamily: '-apple-system,BlinkMacSystemFont,sans-serif'
        },



        productCategory: {
            backgroundColor: theme.palette.background.paper
        },
        toolBar: {
            backgroundColor: ''
        },
    }

};


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

class ResponsiveDialog extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            timer: () => null
        }

    }
    onChange = value => {
        clearTimeout(this.state.timer);
        this.setState(
            {
                timer: setTimeout(() => this.props.editFeedFilter('keyword', value), 500)

            }
        )
    };


    renderMenu() {
        const {classes} = this.props;
        return <div
            className={classes.menu}
        >
            <div
                className={classes.searchBar}
            >
                <h3
                    className={classes.searchTitle}
                ><I18nText keyOfI18n={keyOfI18n.SEARCH}/></h3>
                <div>
                    <SearchBar
                        value={this.props.filter.keyword}
                        onChange={value => this.onChange(value)}
                        placeholder={useI18nText(keyOfI18n.TYPE_KEYWORDS)}/>
                </div>
            </div>
            <div>
                <List
                    data={getTagsCountsArray(this.props.feeds, (tag, number) => {
                        this.props.editFeedFilter('tag', tag)
                    })}
                    selectedValue={this.props.filter.tag}
                    title={useI18nText(keyOfI18n.FEED_CATEGORY)}/>
            </div>
        </div>;
    }
    renderList() {
        const {classes, feeds} = this.props;
        return <div
            className={classes.list}
        >
            <Gallery
                elements={feeds == undefined ? <LoadingPage/> : (
                    feeds.length > 0 ? feeds.map((n, i) => <FeedOverviewBox
                        id={n.id}
                        medias={n.sections[0].medias}
                        src={n.sections && n.sections.find(section => !!section.medias[0]
                        ) ? n.sections.find(section => section.medias[0]).medias[0].url :
                            'https://www.freeiconspng.com/uploads/no-image-icon-15.png'}

                        subTitle={refactorTextLength(n.sections[0].description)}
                        title={n.sections[0].title}
                        author={(n.reactor && n.reactor.length > 0 )? n.authors[0].name.first + ' ' + n.authors[0].name.last : useI18nText(keyOfI18n.NO_AUTHORS)}
                        postDate={n.time}
                        comments={0}
                    />) : <p
                        className={classes.placeholder}
                    >
                        <I18nText keyOfI18n={keyOfI18n.NO_POST_AVAILABLE}/>
                    </p>
                )}
            />
        </div>;
    }


    render() {
        const {width} = this.props;
        return <div>
                <Header/>
                <div
                    style={{
                        display: 'flex',
                        padding: `0 ${isWidthUp('lg', width) ? 9 : 5}%`
                    }}
                >
                    {this.renderMenu()}
                    {this.renderList()}
                </div>
        </div>;
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(withWidth()(ResponsiveDialog)))