import React, {Fragment, useState} from 'react';
import {Theme} from '@material-ui/core/styles';
import {ListItem, Typography} from '@material-ui/core';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import createStyles from "@material-ui/core/styles/createStyles";
import {Clickable} from "../../interfaces/client/Common";
import {makeStyles} from "@material-ui/styles";
import ImageWrapper from './Img';

const useStyles = makeStyles((theme: Theme) => createStyles({
    root: {},
    title: {
        fontWeight: 'lighter',
    },
    btnText: {},
    icon: {
        marginRight: '5px',
    }

}));

interface Props {
    icon?: string,
    icon2?: string,
    label?: string,
    labelExtra?: string,
    options: Array<Clickable>,
    selectedValue?: string,
}

const DropDown: React.FunctionComponent<Props> = props => {

    const [anchorEl, setAnchorEl]: [any, any] = useState(null);
    const [selectedIndex, setSelectedIndex] = useState(0);
    const classes = useStyles();
    const handleMenuItemClick = (index: number, cb: Function): void => {
        setSelectedIndex(index);
        setAnchorEl(null);
        cb()
    };


    const {
        icon,
        icon2, label,
        labelExtra, options,
        selectedValue
    } = props;


    return (
        <Fragment>
            <ListItem button
                      className={classes.root}
                      onClick={e => setAnchorEl(e.currentTarget)}
            >
                {icon && <span className={classes.icon + ' ' + icon}/>}
                <Typography variant={'body1'}>
                    {label}{labelExtra}
                </Typography>
                <Typography variant={'body1'}>
                    {selectedValue ? selectedValue : options[selectedIndex].label}
                </Typography>
                {icon2 && <span className={classes.icon + ' ' + icon2}/>}
            </ListItem>

            <Menu
                id="lock-menu"
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={() => setAnchorEl(null)}

            >
                {options.map((n, i) => (
                    <MenuItem
                        key={i}
                        selected={i === selectedIndex}
                        onClick={() => handleMenuItemClick(i, n.onClick)}
                    >
                        <Typography variant={'body1'}>
                            {n.label}</Typography>
                    </MenuItem>
                ))}
            </Menu>
        </Fragment>
    )
};

//todo(need to improve)
export default (DropDown);