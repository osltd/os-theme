import React from 'react';
import {InputAdornment, TextField} from '@material-ui/core';
import NumberFormat from 'react-number-format';
import {makeStyles} from "@material-ui/styles";

const NumberFormatCustom: React.FunctionComponent<any> = props => {

    const {inputRef, onChange, placeholder, ...other} = props;
    return (
        <NumberFormat
            {...other}
            getInputRef={inputRef}
            placeholder={placeholder}
            onValueChange={values =>
                onChange({
                    target: {
                        value: values.value,
                    }
                })
            }
        />
    )

};

const useStyles = makeStyles(theme => ({
    input: {
        width: '100%',
    }
}));

export interface Props {
    placeholder?: string
    isMultiline?: boolean

    title?: string
    value: string | number
    onChange: (value: any) => void
    disabled?: boolean
    validation?: {
        prefix?: string
        format?: string,
        mask?: Array<string>,
    }
    type?: string
}

const InputBar: React.FunctionComponent<Props> = props => {

    const classes = useStyles();

    const {placeholder, title, isMultiline, type, value, onChange, disabled, validation} = props;

    return <TextField
        disabled={!!disabled}
        value={value ? value : ''}
        rowsMax={isMultiline ? 5 : 1}
        className={classes.input}
        variant={"outlined"}
        onChange={e => onChange(e.target.value)}
        //  only for hk-copier project disable label={title}
        type={type ? type : 'value'}
        placeholder={placeholder}
        InputProps={validation ? {
            startAdornment: <InputAdornment position="start">{validation.prefix}</InputAdornment>,
            inputComponent: NumberFormatCustom,
            inputProps: {
                format: validation.format,
                mask: validation.mask,
            },
        } : undefined}
        multiline={isMultiline}
    />


};

export default (InputBar);