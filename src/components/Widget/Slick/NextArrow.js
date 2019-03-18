import React from "react";
import {withStyles} from '@material-ui/core/styles';

const style = theme => ({
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
});

class NextArrow extends React.Component {
    render() {

        const {classes, className, style, onClick} = this.props;
        return (
            <span
                className={classes.root + ' ' + 'icon-right-16'}
                style={{...style,}}
                onClick={onClick}

            />


        )

    }
}

export default withStyles(style)(NextArrow)