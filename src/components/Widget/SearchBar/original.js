import React from 'react';
import classNames from 'classnames';
import {Input} from '@material-ui/core';
import {makeStyles} from "@material-ui/styles";

const useStyles = makeStyles(theme => ({
    root: {
        border: '1px solid ' + theme.palette.primary.dark,
        borderRadius: '5px',
    },
    input: {
        margin: ' 5px 0 5px 10px ',
    },

    icon: {
        padding: '10px',
        margin: 'auto',
        '&:before': {}
    }
}));

const SearchBar = props => {


    const {placeholder, value, onChange, onKeyPress} = props;
    const classes = useStyles();

    return <Input
        fullWidth={true}
        classes={{

            root: classes.root,
            input: classes.input,
        }}
        variant={'filled'}
        placeholder={placeholder}
        defaultValue={value ? value : ''}
        disableUnderline={true}
        endAdornment={<span className={classNames(classes.icon, 'icon-search')}/>}
        onChange={e => onChange(e.target.value)}
        onKeyPress={e => onKeyPress ? onKeyPress(e.key) : null}
    />
};


export default (SearchBar);