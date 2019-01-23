import React from 'react';
import PropTypes from 'prop-types';
import {withStyles} from '@material-ui/core/styles';
import {Grid, TextField} from '@material-ui/core';
import NumberFormat from 'react-number-format';


const NumberFormatCustom = props => {

    const {inputRef, onChange,format, placeholder, ...other} = props;
    console.log(props)
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
            format={format}
        />
    )

}

NumberFormatCustom.propTypes = {
    inputRef: PropTypes.func.isRequired,
    onChange: PropTypes.func.isRequired,
};

const styles = theme => ({
    input: {}, cleave: {
        fontSize: '18px',
        color: 'currentColor',
        margin: 0,
        padding: '16px 10px 17px 10px',
        border: '1px solid ' + theme.palette.secondary.main,

        display: 'block',
        minWidth: 0,
        flexGrow: 1,
        '&:focus': {
            outline: 'none',
        },
        '&::placeholder': {
            color: theme.palette.secondary.light,
        }

    }


});

const currencies = [
    {
        value: 'USD',
        label: '$',
    },
    {
        value: 'EUR',
        label: '€',
    },
    {
        value: 'BTC',
        label: '฿',
    },
    {
        value: 'JPY',
        label: '¥',
    },
];

class OutlinedTextFields extends React.Component {
    state = {
        name: '',
    };

    handleChange = name => event => {
        this.setState({
            [name]: event.target.value,
        });
    };

    render() {
        const {classes, placeholder, multiline, title, value, onChange, disabled, validation,format} = this.props;

        return (<Grid container direction={'column'}>
                {<TextField
                    disabled={(disabled)}
                    value={value ? value : ''}
                    rows={multiline ? 5 : 1}
                    className={classes.input}
                    variant={'outlined'}
                    onChange={e => onChange(e.target.value)}
                    disableUnderline={true}
                    label={title}
                    placeholder={placeholder}
                    format="#### #### #### ####"

                    InputProps={
                        validation ? {
                            inputComponent: NumberFormatCustom,
                            inputProps: {
                                format: '#### #### #### ####'
                            },
                        } : null
                    }
                    multiline={!!multiline}
                />

                }

            </Grid>


        );
    }
}

OutlinedTextFields.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(OutlinedTextFields);