import React from 'react';
import classNames from 'classnames';
import {Input} from '@material-ui/core';

import PropTypes from 'prop-types';
import {withStyles} from '@material-ui/core/styles';

const styles = theme => ({
    root: {
        display: 'flex',
        flexWrap: 'wrap',
    },
    margin: {
        margin: theme.spacing.unit,
    },
    textField: {
        border: '1px solid white',
        color: 'white',
        borderRadius: '5px',
        padding: '5px',
        flexBasis: 200,
    }, icon: {

        '&:before': {
            fontSize:'30px',
            color: 'white',
        }
    }
})

class OutlinedInputAdornments extends React.Component {
    state = {
        amount: '',
        password: '',
        weight: '',
        weightRange: '',
        showPassword: false,
    };

    handleChange = prop => event => {
        this.setState({[prop]: event.target.value});
    };


    render() {
        const {classes} = this.props;

        return <Input
            className={classNames(classes.margin, classes.textField)}
            variant={'filled'}
            placeholder={'enter email address'}
            value={this.state.weight}
            onChange={this.handleChange('weight')}
            disableUnderline={true}
            endAdornment={<span className={classNames(classes.icon, 'icon-envelop')}/>
            }

        />
    }
}

OutlinedInputAdornments.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(OutlinedInputAdornments);