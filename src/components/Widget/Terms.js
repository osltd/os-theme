import React from 'react';
import PropTypes from 'prop-types';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import {makeStyles} from "@material-ui/styles";

const useStyles = makeStyles({
    root: {
        color: 'gold',
        '&$checked': {
            color: 'gold',
        },
    },
    checked: {},
});

const Terms = props => {
    const classes = useStyles();

    const {checked, onChange, label} = props;
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
            label={label ? label : "I have read and agree to the website terms and conditions."}
        />

    )
};


export default (Terms);