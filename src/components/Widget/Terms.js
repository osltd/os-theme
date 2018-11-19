import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import green from '@material-ui/core/colors/green';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import CheckBoxOutlineBlankIcon from '@material-ui/icons/CheckBoxOutlineBlank';
import CheckBoxIcon from '@material-ui/icons/CheckBox';
import Favorite from '@material-ui/icons/Favorite';
import FavoriteBorder from '@material-ui/icons/FavoriteBorder';

const styles = {
    root: {
        color: 'gold',
        '&$checked': {
            color: 'gold',
        },
    },
    checked: {},
};

class CheckboxLabels extends React.Component {
    state = {
        checkedG: false,
    };

    handleChange = name => event => {
        this.setState({ [name]: event.target.checked });
    };

    render() {
        const { classes } = this.props;

        return (
                <FormControlLabel
                    control={
                        <Checkbox
                            checked={this.state.checkedG}
                            onChange={this.handleChange('checkedG')}
                            value="checkedG"
                            classes={{
                                root: classes.root,
                                checked: classes.checked,
                            }}
                        />
                    }
                    label="I have read and agree to the website terms and conditions."
                />

        );
    }
}

CheckboxLabels.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(CheckboxLabels);