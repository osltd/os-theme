import React from 'react';
import { withStyles } from "@material-ui/core/styles/index";
import { Grid, Typography } from '@material-ui/core';
import { formatMoney, handleImgValid, redirectUrl, } from "../../../api/ApiUtils";
import { withRouter } from "react-router-dom";
import withWidth, { isWidthDown, isWidthUp } from "@material-ui/core/withWidth/index";

const styles = theme => ({
    name: {
        textTransform: 'uppercase',
        fontSize: '17px',
        cursor: 'pointer',
        marginBottom: '15px',
        color: theme.palette.primary.dark,

        '&:hover': {
            color: theme.palette.secondary.dark,

        }
    }, category: {
        fontSize: '13px',
        color: theme.palette.secondary.light,
        marginTop: '15px',
    },

    root: {
        minHeight: '340px',
        padding: '10px 20px 20px',
        borderRadius: '2px'
    },
    divImg: {
        height: '300px',
        cursor: 'pointer',
        backgroundSize: 'contain',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        backgroundColor: '#f8f8f8'
    },

    img: {
        cursor: 'pointer',
        width: '100%',
        backgroundSize: 'contain',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        backgroundColor: '#f8f8f8'
    },
    oldPrice: {},
    price: {
        color: '#333333',
        fontFamily: 'arial',
        lineHeight: 1,
    }

});


const ProductOverviewBox = (props) => {

    let styles = theme => ({
        content: {
            "padding": props.padding,
            "min-height": "100vh",
            "background-color": props.backgroundColor
        }
    });


    const { classes, src, name, id, width, category, regPrice, promotePrice, history } = props;


    let getImg = () => {
        return <div
            style={{
                backgroundImage: 'url(' + handleImgValid(src) + ')',
                backgroundColor: 'transparent',
            }}
            onClick={() => id && redirectUrl('/products/' + id, history)}
            className={classes.divImg} />;
        //responsive forbidden
        if (isWidthDown('xs', width)) {
            return <img
                src={handleImgValid(src)}
                onClick={() => id && redirectUrl('/products/' + id, history)}
                className={classes.img}
            />
        }
        return isWidthUp('lg', width) ? <div
            style={{
                backgroundImage: 'url(' + handleImgValid(src) + ')',

            }}
            onClick={() => id && redirectUrl('/products/' + id, history)}
            className={classes.divImg} /> :
            <img
                src={handleImgValid(src)}
                onClick={() => id && redirectUrl('/products/' + id, history)}
                className={classes.img}
            />
    };


    return (
        <Grid container className={classes.root} direction={'column'}>
            {getImg()}
            {
                category && <Typography variant={'h5'}
                    className={classes.category}

                    color={'primary'}>{category && category.join(',')}</Typography>

            }
            <Typography variant={'h6'}
                onClick={() => window.location.href = ('/products/' + id)}
                className={classes.name}

            >{name}</Typography>
            {
                (promotePrice) ?
                    <Grid item container direction={'row'}>
                        <Typography component={'del'} variant={'subtitle1'}
                            className={classes.oldPrice}>$ {formatMoney(regPrice)}</Typography>
                        <Typography variant={'caption'}
                            className={classes.price}>${formatMoney(promotePrice)}</Typography>
                    </Grid>
                    : <Typography variant={'caption'}
                        className={classes.price}>$ {formatMoney(regPrice)}</Typography>

            }

        </Grid>
    );

};

export default withWidth()(withRouter(withStyles(styles)(ProductOverviewBox)))