import {isImgOnlySections, redirectUrl} from "../../../api/ApiUtils";
import React, {Fragment} from 'react';
import {Grid} from '@material-ui/core';
import Carousel from '../../Widget/Slick/SingleItem'
import FeedsWall from '../../Widget/FeedsWall/Wrapper'

const Banner = props => {

    const {
        hasFeedsToShow, latestArticle, feeds, history
    } = props;
    return hasFeedsToShow && <>
        <Grid item xs={12}>
            <Carousel
                data={latestArticle.map(n => n.sections[0].medias[0])}
                title={latestArticle.map(n => n.sections[0].title) || ''}
                onClick={() => redirectUrl(`/articles/${latestArticle.id}`, history)}/>
        </Grid>
        <Grid item xs={12} style={{marginTop: 80}}>
            <FeedsWall data={feeds.filter((n, i) => isImgOnlySections(n.sections))} />
        </Grid>
    </>

};


export default Banner
