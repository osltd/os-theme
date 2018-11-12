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
    textField: {
        border: '1px solid ' + theme.palette.primary.dark,
        borderRadius: '5px',
        padding:'5px 0px',
    }, icon: {
        padding: '2px',
        '&:before': {
            fontSize: '30px',
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
            fullWidth={true}
            className={classNames(classes.textField,)}
            variant={'filled'}
            placeholder={'type keyword'}
            value={this.state.weight}
            onChange={this.handleChange('weight')}
            disableUnderline={true}
            endAdornment={<span className={classNames(classes.icon, 'icon-search')}/>}


        />
    }
}

OutlinedInputAdornments.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(OutlinedInputAdornments);