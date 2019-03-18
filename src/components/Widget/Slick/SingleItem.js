import React from "react";
import Slider from "react-slick";
import {withStyles} from '@material-ui/core/styles';
import {Grid, Typography} from '@material-ui/core'
import NextArrow from './NextArrow'
import PrevArrow from './PrevArrow'
import {withRouter} from 'react-router-dom'
import {redirectUrl} from "../../../api/ApiUtils";

const style = theme => ({
    root: {
        width: 'calc(100%-80px)',
    },
    img: {
        minHeight: '600px',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        width: '100%',

    },
    imgOnly: {
        width: '100%',

    },
    title: {
        letterSpacing: '2px',
        color: 'white',
        fontSize: '40px',
        fontWeight: '900',
        textAlign: 'center',

    },
    subTitle: {

        color: 'white',
        fontSize: '30px',
        fontWeight: '450',

    },


    item: {
        position: 'relative',

    },
    caption: {
        display: 'none',
        position: 'absolute',
        top: 0,
        right: 0,
        backgroundColor: '#333333b3',
        color: '#fff',
        padding: '10px 20px'
    }


});

class SimpleSlider extends React.Component {
    render() {
        let settings = {
            dots: false,
            infinite: true,
            lazyLoad: true,
            speed: 500,
            slidesToShow: 1,
            slidesToScroll: 1,
            autoplay: true,
            autoplaySpeed: 5000,

            nextArrow: <NextArrow/>,
            prevArrow: <PrevArrow/>,
        };
        let {data, classes, title, style} = this.props;
        if (!(data[0])) return null;
        style = style || {};
        return (
            data.length > 1 ?
                <Slider {...settings} className={classes.root}>

                    {

                        data.map((n, i) => (<div key={i}>

                                    <Grid container
                                          alignItems={'center'}
                                          justify={'center'}
                                          style={Object.assign(n.link ? {cursor: 'pointer'} : {}, {
                                              backgroundImage: 'url("' + n.url + '")',
                                          })}
                                          onClick={() => n.link ? redirectUrl(n.link, this.props.history) : null}
                                          className={classes.img}>
                                        {title && <Grid item lg={4}>
                                            <Typography variant="h1" className={classes.title}
                                                        gutterBottom>{title[i]}</Typography>
                                        </Grid>}
                                    </Grid>
                                </div>
                            )
                        )
                    }

                </Slider> :
                <div className={classes.item} style={{...style}}>
                    <img className={classes.imgOnly} src={data[0].url} width="100%"/>
                    <p className={classes.caption + ' animated fadeIn'}>{title}</p>
                </div>
        );
    }
}

export default withRouter(withStyles(style)(SimpleSlider))