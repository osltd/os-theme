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

class CheckboxLabels extends React.Component {
    state = {
        checkedG: false,
    };

    handleChange = name => event => {
        this.setState({[name]: event.target.checked});
    };

    render() {
        const {classes} = this.props;

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