import React, {Fragment} from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import MenuItem from '@material-ui/core/MenuItem';
import {TextField,Grid} from '@material-ui/core';
import InputBar from '../../Widget/InputBar'
import Button from '../../Widget/Button'
const styles = theme => ({

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
        name: 'Cat in the Hat',
        age: '',
        multiline: 'Controlled',
        currency: 'EUR',
    };

    handleChange = name => event => {
        this.setState({
            [name]: event.target.value,
        });
    };

    render() {
        const { classes } = this.props;

        return (
            <Grid container spacing={16}>
                <Grid item xs={6}>
                <InputBar
                    placeholder={'Name'}
                title={'Name'}/>
                </Grid>
                <Grid item xs={6}>
                <InputBar
                    placeholder={'Email'}
                    title={'Email'}

                />
                </Grid>
                <Grid item xs={12}>
                <InputBar
                    placeholder={'Description'}
                    title={'Description'}
                    multiline={true}
                />
                </Grid>
                <Grid item >
                    <Button
                    value={'submit'}
border

                    />
                </Grid>

            </Grid>

        );
    }
}

OutlinedTextFields.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(OutlinedTextFields);
