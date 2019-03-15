import React from "react";
import Slider from "react-slick";
import NextArrow from './NextArrow'
import PrevArrow from './PrevArrow'
import {handleImgValid} from "../../../api/ApiUtils";
import {makeStyles} from "@material-ui/styles/";

const useStyles = makeStyles(theme => ({
    root: {
        margin: 0,
        width: 'calc(100%-80px)',
    },
    img: {
        cursor: 'pointer',
        backgroundSize: 'contain',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        backgroundColor: '#f8f8f8',
        height: '600px',
        width: '100%',

    },
    imgOnly: {
        width: '100%',

    },
    title: {
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


}));


const SimpleSlick = props => {
    const classes = useStyles();
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
    let {data, title, style} = props;
    if (!(data[0])) return null;
    style = style || {};
    return (
        data.length > 1 ?
            <Slider {...settings} className={classes.root}>

                {

                    data.map((n, i) => (<div key={i}>
                                <div
                                    style={{
                                        backgroundImage: 'url(' + handleImgValid(n.url) + ')',
                                        backgroundColor: 'transparent',
                                    }}
                                    className={classes.img}/>

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
};

export default SimpleSlick