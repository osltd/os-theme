import React from 'react';
import {Button, Grid} from '@material-ui/core';
import InputBar from '../../Widget/InputBar'
import {makeStyles} from "@material-ui/styles";

const useStyles = makeStyles(theme => ({}));

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
        const classes = useStyles();

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
                <Grid item>
                    <Button
                        variant={'outlined'}>
                        Submit
                    </Button>
                </Grid>
            </Grid>

        );
    }
}


export default (OutlinedTextFields);
