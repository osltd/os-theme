import React from 'react';
import PropTypes from 'prop-types';
import {withStyles} from '@material-ui/core/styles';
import {Radio} from '@material-ui/core';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';

const styles = theme => ({
    root: {
        display: 'flex',
    },
    formControl: {
        margin: theme.spacing.unit * 3,
    },
    group: {
        margin: `${theme.spacing.unit}px 0`,
    },
});

class RadioButtonsGroup extends React.Component {
    state = {
        value: 'female',
    };

    handleChange = event => this.setState({value: event.target.value});


    render() {
        const {classes, title} = this.props;

        return (
            <FormControl component="fieldset" className={classes.formControl}>
                {
                    title && <FormLabel component="legend">{title}</FormLabel>
                }
                <RadioGroup
                    aria-label="Gender"
                    name="gender1"
                    className={classes.group}
                    value={this.state.value}
                    onChange={this.handleChange}
                >

                    <FormControlLabel value="Cash On Delivery" control={<Radio/>} label="Cash On Delivery"/>

                    <FormControlLabel value="Direct Bank Transfer"
                                      control={<Radio/>}
                                      label="Direct Bank Transfer"/>

                    <FormControlLabel value="Pay with Check" control={<Radio/>} label="Pay with Check"/>

                    <FormControlLabel value="Paypal" control={<Radio/>} label="Paypal"/>
                </RadioGroup>
            </FormControl>

        );
    }
}

RadioButtonsGroup.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(RadioButtonsGroup);