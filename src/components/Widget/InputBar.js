import React from 'react';
import PropTypes from 'prop-types';
import {withStyles} from '@material-ui/core/styles';
import {Grid, Input, Typography} from '@material-ui/core';
import Cleave from 'cleave.js/react'

const styles = theme => ({
    input: {
        border: '1px solid ' + theme.palette.secondary.main,
        padding: '10px',

    }, cleave: {
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
        const {classes, placeholder, multiline, title, value, onChange,disabled, validation,} = this.props;

        return (<Grid container direction={'column'}>
                <Typography variant={'subheading'}>{title}</Typography>

                {
                    validation ?
                        <Cleave
                            value={value && value}
                            className={classes.cleave}
                            placeholder={placeholder}
                            options={validation}
                            onChange={e => onChange(e.target.value)}
                        /> :
                        <Input
                            disabled={(disabled)}
                            value={value ? value : ''}
                            className={classes.input}
                            rows={multiline ? 5 : 1}
                            onChange={e => onChange(e.target.value)}
                            disableUnderline={true}
                            placeholder={placeholder}
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