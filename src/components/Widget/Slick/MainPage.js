import React from "react";
import Slider from "react-slick";
import {withStyles} from '@material-ui/core/styles';
import {Grid, Typography} from '@material-ui/core'
import NextArrow from './NextArrow'
import PrevArrow from './PrevArrow'
import {withRouter} from 'react-router-dom'

const style = theme => ({
    root: {
        margin: '40px',
        width: 'calc(100%-80px)',
    },
    img: {
        height: '600px',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        width: '100%',

    },
    title: {
        color: 'white',
        fontSize: '40px',
        fontWeight: '900',

    }, subTitle: {

        color: 'white',
        fontSize: '30px',
        fontWeight: '450',

    }

})

class SimpleSlider extends React.Component {
    render() {
        let settings = {
            dots: true,
            infinite: true,
            speed: 500,
            slidesToShow: 1,
            slidesToScroll: 1,
            autoplay: true,
            autoplaySpeed: 5000,

            nextArrow: <NextArrow/>,
            prevArrow: <PrevArrow/>,
        };
        const {data, classes} = this.props
        return (
            data[0] ?
                <Slider {...settings} className={classes.root}>

                    {

                        data.map((n, i) => (<div key={i}>

                                    <Grid container
                                          alignItems={'center'}
                                          style={Object.assign(n.link ? {cursor: 'pointer'} : {}, {
                                              backgroundImage: 'url("' + n.url + '")',

                                          })}
                                          onClick={() => n.link ? redirectUrl(n.link, this.props.history) : null}

                                          className={classes.img}>
                                        {n.title && <Grid item lg={4}>
                                            <Typography variant="display4" className={classes.title}
                                                        gutterBottom> {n.title}</Typography>
                                        </Grid>}
                                    </Grid>
                                </div>
                            )
                        )
                    }

                </Slider> : null
        );
    }
}

export default withRouter(withStyles(style)(SimpleSlider))