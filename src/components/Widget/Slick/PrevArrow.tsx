import React from "react";
import {Theme, withStyles} from '@material-ui/core/styles';
import createStyles from "@material-ui/core/styles/createStyles";
import {MaterialUIClasses} from "../../../interfaces/client/Common";

const style = (theme: Theme) => createStyles({
    root: {
        '&:hover': {
            '&:before': {
                background: 'rgba(255, 255, 255, 0.8)',
                color: '#484848'
            }
        },
        '&:before': {
            borderRadius: '4px',
            padding: '5px',
            fontSize: '20 px',
            position: 'absolute',
            top: '50%',
            cursor: 'pointer',
            color: '#484848',
            background: 'rgba(255, 255, 255, 0.64)',
            zIndex: 2,
        }

    }
})

interface Props {
    classes: MaterialUIClasses
    style?: any
    onClick: () => void
}

const PrevArrow: React.FunctionComponent<Props> = props => {

    const {classes, style, onClick} = props
    return (
        <span
            className={classes.root + ' ' + 'icon-left-16'}
            style={{...style}}
            onClick={onClick}

        />


    )

}

export default withStyles(style)(PrevArrow)