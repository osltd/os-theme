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
        color: 'white',
        /* border: 1px solid white; */
        padding: '10px 20px',
        width: '370px',
        flexBasis: '200px',
        borderRadius: '5px',
        background: '#000',
        border: '1px solid ' + theme.palette.secondary.light,
    }, icon: {
        margin: 'auto',

        '&:before': {
            fontSize: '18px',
            color: 'white',
        }
    }
})

class EmailSearchBar extends React.Component {
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
            endAdornment={<span className={classNames(classes.icon, 'icon-envelop')}/>}

        />
    }
}

EmailSearchBar.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(EmailSearchBar);