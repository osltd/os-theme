import React from 'react';
import {Button, Fab, Theme} from '@material-ui/core'
import {withStyles} from '@material-ui/core/styles';
import classNames from 'classnames'
import {MaterialUIClasses} from "../../../interfaces/client/Common";
import createStyles from "@material-ui/core/es/styles/createStyles";

const styles = (theme: Theme) => createStyles({
    root: {
        display: 'inline-block',
        borderRadius: 0,
        padding: '10px',
        margin: '5px',
        fontWeight: 500,
        cursor: 'pointer',
        boxShadow:'none',
        color: theme.palette.primary.light,
        background: 'rgb(242,242,242)',
        '&:hover': {
            color:'rgb(242,242,242)',
            background: theme.palette.primary.light,
        }
    }, selected: {
        color: 'rgb(242,242,242)',
        background: theme.palette.primary.light,


    }
});

interface Props {
    selected?: boolean,
    classes: MaterialUIClasses,
    value: string,
    onClick: () => void,
}

const Tag: React.FunctionComponent<Props> = props => {

    const {
        classes,
        value,
        onClick,
        selected
    } = props
    return (
        <Fab variant={"extended"}
             onClick={onClick}
             className={classNames(classes.root, selected ? classes.selected : null)}>
            {value}
        </Fab>

    )
}

export default withStyles(styles)(Tag);