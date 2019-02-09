import React from 'react';
import PropTypes from 'prop-types';
import {InputAdornment, TextField} from '@material-ui/core';
import NumberFormat from 'react-number-format';
import {makeStyles} from "@material-ui/styles";

const NumberFormatCustom = props => {

    const {inputRef, onChange, placeholder, ...other} = props;
    return (
        <NumberFormat
            {...other}
            getInputRef={inputRef}
            placeholder={placeholder}
            onValueChange={values => {
                onChange({
                    target: {
                        value: values.value,
                    }
                })
            }}
        />
    )

};

const useStyles = makeStyles(theme => ({
    input: {
        width: '100%',
    }
}));

const InputBar = props => {

    const classes = useStyles();

    const {placeholder, multiline, title, value, onChange, disabled, validation, format} = props;

    return <TextField
        disabled={(disabled)}
        value={value ? value : ''}
        rows={multiline ? 5 : 1}
        className={classes.input}
        variant={"outlined"}
        onChange={e => onChange(e.target.value)}
        disableUnderline={true}
        label={title}
        placeholder={placeholder}
        InputProps={
            validation ? {
                startAdornment: <InputAdornment position="start">{validation.prefix}</InputAdornment>,
                inputComponent: NumberFormatCustom,
                inputProps: {
                    format: validation.format,
                    mask: validation.mask,
                },
            } : null
        }
        multiline={!!multiline}
    />


};

export default (InputBar);