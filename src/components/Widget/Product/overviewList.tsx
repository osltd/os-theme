import React from 'react';
import {Grid, Theme, Typography} from '@material-ui/core';
import {formatMoney, redirectUrl, refactorTextLength} from "../../../api/ApiUtils";
import {makeStyles} from "@material-ui/styles";
import {RouteComponentProps, withRouter} from "react-router-dom";

const useStyles = makeStyles((theme: Theme) => ({
    name: {
        textTransform: 'uppercase',
        fontSize: '17px',
        color: theme.palette.primary.dark,

        cursor: 'pointer',
        marginBottom: '15px',

        '&:hover': {
            color: theme.palette.secondary.dark,

        }
    }, category: {
        fontSize: '13px',
        color: theme.palette.secondary.light,
        marginTop: '15px',
    },
    root: {
        padding: '10px',

    },
    img: {
        cursor: 'pointer',
        width: '100%',
        maxHeight: '255px !important',
    },
    oldPrice: {},
    price: {
        fontFamily: 'arial',
        lineHeight: 1,
    },
    description: {
        lineHeight: '25px',
        color: '#333',
        fontSize: '15px',
        marginBottom: '10px',
    }
}));

interface nonStyleProps {
    src: string
    name: string
    id: number
    category: Array<string>
    regPrice: number
    promotePrice?: number
    description?: string
}

type Props = nonStyleProps & RouteComponentProps

const ProductOverviewList: React.FunctionComponent<Props> = props => {
    const classes = useStyles();
    const {src, name, category, id, regPrice, promotePrice, history, description} = props;

    return (
        <Grid container spacing={16} alignItems={'center'} className={classes.root}>
            <Grid item xs={4}>
                <img src={src}

                     onClick={() => redirectUrl('/products/' + id, history)}

                     className={classes.img}/>
            </Grid>
            <Grid item xs={8}>
                {
                    category && <Typography variant={'h5'}
                                            className={classes.category}

                                            color={'primary'}>{category && category.join(',')}</Typography>

                }
                <Typography variant={'h6'}
                            onClick={() => redirectUrl('/products/' + id, history)}
                            className={classes.name}
                >{name}</Typography>

                <Typography className={classes.description}
                            variant={'caption'}>{refactorTextLength(description ? description : 'no description here', 200)}</Typography>
                {
                    promotePrice ?
                        <Grid item container direction={'row'}>

                            <Typography component={'del'} variant={'subtitle1'}
                                        className={classes.oldPrice}>$ {formatMoney(regPrice)}</Typography>
                            <Typography variant={'subtitle1'}
                                        className={classes.price}>${formatMoney(promotePrice)}</Typography>
                        </Grid>
                        : <Typography variant={'subtitle1'}
                                      className={classes.price}>$ {formatMoney(regPrice)}</Typography>

                }
            </Grid>
        </Grid>
    );
};


export default (withRouter(ProductOverviewList))