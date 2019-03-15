import React from 'react';
import {Grid, Typography} from '@material-ui/core'
import {Link} from 'react-router-dom'
import classesNames from 'classnames'
import {makeStyles} from "@material-ui/styles";

const useStyles = makeStyles(theme => ({
    root: {
        textDecoration: 'none',
        padding: '3px',
        color: theme.palette.primary.main,
        cursor: 'pointer',
        margin: '0 10px',
    },
    btnText: {
        fontWeight: '600',
        fontSize: '14px',
        textTransform: 'uppercase',
    },
    border: {
        border: '1px solid ' + theme.palette.primary.main,
        borderRadius: '5px',

    },
    icon: {
        marginRight: '5px',
        '&:before': {}
    }
}));

const CustomButton = props => {


    const classes = useStyles();
    const {
        link, onClick, value, icon2, icon, border
    } = props;

    return (

        <Grid
            container
            component={link ? Link : 'span'}
            to={link ? link : '#'}
            alignItems={'center'}
            className={classesNames(classes.root, border ? classes.border : null)}
            onClick={onClick}
        >
            {icon && <span className={classes.icon + ' ' + icon}/>}
            {value && <Typography variant={'h6'} className={classes.btnText}>{value}</Typography>}
            {icon2 && <span className={classes.icon + ' ' + icon2}/>}
        </Grid>

    )
};

export default CustomButton