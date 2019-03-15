import React from 'react';
import PropTypes from 'prop-types';
import {withStyles} from '@material-ui/core/styles';
import {Grid, TextField,InputAdornment} from '@material-ui/core';
import NumberFormat from 'react-number-format';


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

}

NumberFormatCustom.propTypes = {
    inputRef: PropTypes.func.isRequired,
    onChange: PropTypes.func.isRequired,
};

const styles = theme => ({
    input: {
        width:'100%',
    }
})

const InputBar=props=> {


        const {classes, placeholder, multiline, title, value, onChange, disabled, validation, format} = props;

        return <TextField
                    disabled={(disabled)}
                    value={value ? value : ''}
                    rows={multiline ? 5 : 1}
                    className={classes.input}
                    variant={"outlined"}
                    type={props.type?props.type:"text"}
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


}

InputBar.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(InputBar);