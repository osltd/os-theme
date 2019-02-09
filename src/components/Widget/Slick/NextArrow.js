import React from "react";
import {makeStyles} from "@material-ui/styles";

const useStyles = makeStyles(theme => ({
    root: {
        '&:hover': {
            '&:before': {
                background: 'rgba(255, 255, 255, 0.8)',
                color: '#484848',

            }
        },
        '&:before': {
            borderRadius: '4px',
            padding: '5px',
            fontSize: '20 px',
            position: 'absolute',
            top: '50%',
            cursor: 'pointer',
            right: '0px',
            color: '#484848',
            background: 'rgba(255, 255, 255, 0.64)'
        }

    }
}));

const NextArrow = props => {
    const classes = useStyles();
    const {style, onClick} = props;
    return (
        <span
            className={classes.root + ' ' + 'icon-right-16'}
            style={{...style,}}
            onClick={onClick}

        />


    )

};

export default (NextArrow)