import React from "react";
import {withStyles} from '@material-ui/core/styles';

const style = theme => ({
    root: {
        '&:hover': {
            '&:before': {
                color: '#0f090a',
                background: 'white',

            }
        },
        '&:before': {

            borderRadius: '4px',
            padding: '5px',
            fontSize: '40px',
            position: 'absolute',
            top: '50%',
            cursor: 'pointer',
            background: '#0f090a',
            color: 'white',

            zIndex: 2,

        }

    }
})

class PrevArrow extends React.Component {
    render() {

        const {classes, className, style, onClick} = this.props;
        return (
            <span
                className={classes.root + ' ' + 'icon-circle-left'}
                style={{...style,}}
                onClick={onClick}

            />


        )

    }
}

export default withStyles(style)(PrevArrow)