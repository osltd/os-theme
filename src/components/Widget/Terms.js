import React from 'react';
import PropTypes from 'prop-types';
import {withStyles} from '@material-ui/core/styles';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import {useI18nText} from "../../hooks/useI18nText";
import {keyOfI18n} from "../../constants/locale/interface";

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
    const {classes, checked, onChange, label} = props;
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
            label={label ? label : useI18nText(keyOfI18n.TERM_AND_CONDITIONS)}
        />

    )
};

Terms.propTypes = {
    checked: PropTypes.bool.isRequired,
    onChange: PropTypes.func.isRequired,
    label: PropTypes.string,
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Terms);