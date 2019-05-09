import React from 'react';
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
import ReactHtmlParser from "react-html-parser";
import {useI18nText} from "../../hooks/useI18nText";
import {keyOfI18n} from "../../constants/locale/interface";
import {I18nText} from "../Widget/I18nText";

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
            fontSize: '30px',
            marginRight:'5px',
        },
        backArrow: {
            cursor: 'pointer',

        },
        basicInfo: {
            paddingBottom: '10px',
        },
        basicInfoText: {
            display: "inline-block",
            paddingLeft: '5px',
        }
    });


const mapStateToProps = state => ({
    feeds: state.feed.feeds,
    products: state.product.products,
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

const FeedDetail = (props) => {

    const {feeds, match, classes, editFeedFilter, history} = props;
    console.log(feeds);
    const hasValidFeed = () => (feeds && !!feeds.find(n => n.id.toString() === match.params.id));
    if (!props.products) return <LoadingPage/>;

    if (hasValidFeed()) {
        const feed = feeds.find(n => n.id.toString() === match.params.id);
        return (
            <Grid container justify={'center'} className={classes.root}>
                <Header title={refactorTextLength(feed.sections[0].title)}/>
                <Grid item container spacing={16} xs={12} lg={10}>
                 <Grid item container alignItems={'center'} xs={12}
                                       onClick={() => redirectUrl('/feeds', history)}
                                       className={classes.backArrow}>
                            <span
                                className={classNames('icon-circle-left', classes.backIcon)}/>
                            <Typography variant={'h6'}>
                              <I18nText keyOfI18n={keyOfI18n.FEED_DETAIL_BACK_TO_FEED_LIST}/>
                            </Typography>
                        </Grid>

                    <Grid item xs={12} md={3}>
                        <List
                            data={getTagsCountsArray(feeds, (tag, number) => {
                                editFeedFilter('tag', tag);
                                redirectUrl('/feeds', history, false)
                            })}
                            title={useI18nText(keyOfI18n.FEED_CATEGORY)}/>


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
                                    {(feed.reactor &&feed.reactor.length > 0) ? feed.reactor[0].name.first + ' ' + feed.reactor[0].name.last : useI18nText(keyOfI18n.NO_AUTHORS)}
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
                                            {ReactHtmlParser(n.description)}
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
};


export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(FeedDetail))

