import React from 'react';
import {Button} from '@material-ui/core'
import {withStyles} from '@material-ui/core/styles';
import PropTypes from "prop-types";
import classNames from 'classnames'

const styles = theme => ({
    root: {
        display: 'inline-block',
        borderRadius: 0,
        padding: '10px',
        margin: '5px',
        fontWeight: 500,
        cursor: 'pointer',
        color: theme.palette.primary.light,
        background: theme.palette.secondary.light,
        '&:hover': {
            color: theme.palette.secondary.light,
            background: theme.palette.primary.light,
        }
    }, selected: {
        color: theme.palette.secondary.light,
        background: theme.palette.primary.light,


    }
});

class CustomButton extends React.Component {
    state = {
        anchor: 'left',
    };
    handleChange = name => event => {
        this.setState({
            [name]: event.target.value,

        });
    };

    constructor(props) {
        super(props)
        this.state = {
            placeHolder: '',

        }
    }

    render() {
        const {
            selected,
            classes,
            value,
            onClick

        } = this.props;

        return (
            <Button variant="extendedFab"
                    onClick={onClick}
                    className={classNames(classes.root,
                        selected ? classes.selected : null)}>
                {value}
            </Button>

        )
    }
}

CustomButton.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(CustomButton);