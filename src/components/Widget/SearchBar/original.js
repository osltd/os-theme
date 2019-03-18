import React from 'react';
import classNames from 'classnames';
import {Input} from '@material-ui/core';

import PropTypes from 'prop-types';
import {withStyles} from '@material-ui/core/styles';

const styles = theme => ({
    root: {
        border: '1px solid ' + theme.palette.primary.dark,
        borderRadius: '5px',
    },
    input: {
        margin: ' 5px 0 5px 10px ',
    },

    icon: {
        padding: '10px',
        margin: 'auto',
        '&:before': {}
    }
});

class SearchBar extends React.Component {
    state = {
        amount: '',
        password: '',
        weight: '',
        weightRange: '',
        showPassword: false,
    };


    render() {
        const {classes, placeholder, value, onChange, onKeyPress} = this.props;

        return <Input
            fullWidth={true}
            classes={{

                root: classes.root,
                input: classes.input,
            }}
            variant={'filled'}
            placeholder={placeholder}
            defaultValue={value ? value : ''}
            disableUnderline={true}
            endAdornment={<span className={classNames(classes.icon, 'icon-search')}/>}
            onChange={e => onChange(e.target.value)}
            onKeyPress={e => onKeyPress ? onKeyPress(e.key) : null}
        />
    }
}

SearchBar.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(SearchBar);