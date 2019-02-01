import React from 'react';
import {Input} from '@material-ui/core';

import PropTypes from 'prop-types';
import {withStyles} from '@material-ui/core/styles';
import {makeStyles} from "@material-ui/styles";

const useStyles = makeStyles( theme => ({
    root: {
        boxSizing: 'border-box',
        padding: '10px',
        backgroundColor: theme.palette.background.paper,
        border: `1px solid ${theme.palette.secondary.main}`,
    },
    input: {},

    icon: {
        padding: '10px',
        margin: 'auto',
        '&:before': {}
    }
}))

class SearchBar extends React.Component {
    state = {
        amount: '',
        password: '',
        weight: '',
        weightRange: '',
        showPassword: false,
    };


    render() {
        const classes =useStyles()
        const { placeholder, type, value, onChange, onKeyPress} = this.props;

        return <Input
            fullWidth={true}
            classes={{
                root: classes.root,
                input: classes.input,
            }}
            type={type ? type : 'text'}
            variant={'filled'}
            placeholder={placeholder}
            value={value ? value : ''}
            disableUnderline={true}
            onChange={e => onChange(e.target.value)}
            onKeyPress={e => onKeyPress ? onKeyPress(e.key) : null}
        />


    }
}

SearchBar.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default (SearchBar);