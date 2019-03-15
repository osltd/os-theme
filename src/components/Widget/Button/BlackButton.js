import React from 'react';
import {Button, Typography} from '@material-ui/core'
import {makeStyles} from "@material-ui/styles";

const useStyles = makeStyles(theme => ({
    root: {
        textTransform: 'capitalize',
        padding: '16px',
        width: '100%',
        boxSizing: 'border-box',

        borderRadius: 0,
        background: theme.palette.primary.main,
        border: `2px solid ${theme.palette.primary.main}`,
        color: 'white',
        '&:hover': {
            color: theme.palette.primary.main,
            background: 'white',

        }
    },
}));

const BlackButton = props => {

    const classes = useStyles();
    const {link, onClick, value, icon2, icon, border} = props;

    return <Button
        className={classes.root}
        variant={'outlined'}
        onClick={onClick}>
        <Typography variant={'h6'} color={'inherit'} className={icon}/>
        <Typography variant={'h6'} color={'inherit'}>{value}</Typography>
        <Typography variant={'h6'} color={'inherit'} className={icon2}/>
    </Button>
};


export default (BlackButton);