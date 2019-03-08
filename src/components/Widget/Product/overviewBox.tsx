import React from 'react';
import {Theme} from "@material-ui/core/styles";
import {Link, RouteComponentProps, withRouter} from "react-router-dom";
import {Grid, Typography} from '@material-ui/core';
import {formatMoney, handleImgValid,} from "../../../api/ApiUtils";
import {makeStyles, useTheme} from '@material-ui/styles'
import {Breakpoint} from "@material-ui/core/styles/createBreakpoints";
import {unstable_useMediaQuery as useMediaQuery} from "@material-ui/core/useMediaQuery";
import Img from '../Img'


const useStyle = makeStyles((theme: Theme) => ({
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

}));

interface Props extends RouteComponentProps {
    src: string
    name: string
    id: number
    category: Array<string>
    regPrice: number
    promotePrice?: number

}

const ProductOverviewBox: React.FunctionComponent<Props> = (props) => {
    const theme: Theme = useTheme();
    const isWidthUp = (breakpoint: Breakpoint): boolean => useMediaQuery(theme.breakpoints.up(breakpoint));
    const isWidthDown = (breakpoint: Breakpoint): boolean => useMediaQuery(theme.breakpoints.down(breakpoint));
    const classes = useStyle();
    const {src, name, id, category, regPrice, promotePrice} = props;
    let getImg = () => {
        return <Link to={`/products/${id}`}>
            <Img
                src={handleImgValid(src)}
                className={classes.img}
            /></Link>
        //responsive forbidden
        // if (isWidthDown('xs')) {
        //     return <Img
        //         src={handleImgValid(src)}
        //         onClick={() => id && redirectUrl('/products/' + id, history)}
        //         className={classes.img}
        //     />
        // }
        // return isWidthUp('lg') ? <div
        //         style={{
        //             backgroundImage: 'url(' + handleImgValid(src) + ')',
        //
        //         }}
        //
        //         onClick={() => id && redirectUrl('/products/' + id, history)}
        //         className={classes.divImg}/> :
        //     <Img
        //         src={handleImgValid(src)}
        //         onClick={() => id && redirectUrl('/products/' + id, history)}
        //         className={classes.img}
        //     />
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
                        className={classes.name}
                        onClick={() => props.history.push(`/products/${id}`)}
            >
                {name}</Typography>
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

export default React.memo(withRouter(ProductOverviewBox))