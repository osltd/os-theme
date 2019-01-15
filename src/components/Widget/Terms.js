import React from 'react';
import PropTypes from 'prop-types';
import {withStyles} from '@material-ui/core/styles';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';

const styles = {
    root: {
        color: 'gold',
        '&$checked': {
            color: 'gold',
        },
    },
    checked: {},
};

const Terms = props => {
    const {classes, checked, onChange,label} = props
    return (
        <FormControlLabel
            control={
                <Checkbox
                    checked={checked}
                    onChange={onChange}
                    value="checkedG"
                    classes={{
                        root: classes.root,
                        checked: classes.checked,
                    }}
                />
            }
            label={label?label:"I have read and agree to the website terms and conditions."}
        />

    )
}

Terms.propTypes = {
    checked: PropTypes.bool.isRequired,
    onChange: PropTypes.func.isRequired,
    label: PropTypes.string,
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Terms);