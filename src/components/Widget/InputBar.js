import React, {Fragment} from 'react';
import PropTypes from 'prop-types';
import {withStyles} from '@material-ui/core/styles';
import {Input,Grid,Typography} from '@material-ui/core';

const styles = theme => ({
    input: {
        border: '1px solid ' + theme.palette.secondary.main,
        padding: '10px',

    },


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
     name:'',
    };

    handleChange = name => event => {
        this.setState({
            [name]: event.target.value,
        });
    };

    render() {
        const {classes,placeholder,multiline,title} = this.props;

        return (<Grid container direction={'column'}>
                <Typography variant={'subheading'}>{title}</Typography>
                <Input
                    value={this.state.name}
                    className={classes.input}
                    rows={multiline?5:1}
                    onChange={this.handleChange('name')}
                    disableUnderline={true}
                    placeholder={placeholder}
                    multiline={!!multiline}
                />
            </Grid>



        );
    }
}

OutlinedTextFields.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(OutlinedTextFields);