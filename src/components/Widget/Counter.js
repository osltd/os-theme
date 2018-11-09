import React from 'react';
import {withStyles} from '@material-ui/core/styles';
import PropTypes from "prop-types";
import {Grid, Typography} from '@material-ui/core';

const styles = theme => {
    return ({
        root: {},
        operator: {
            padding:'10px',
            cursor: 'pointer',
            border: '1px solid ' + theme.palette.secondary.light,

        MozUserSelect: '-moz-none',
    KhtmlUserSelect: 'none',
    WebkitUserSelect: 'none',
    OUserSelect: 'none',
    userSelect: 'none',

        }
    });

}

class Counter extends React.Component {
    handleChange = number => {
        this.setState({
            number: number

        });
    };

    constructor(props) {
        super(props)
        this.state = {
            number: 1,

        }
    }

    render() {
        const {classes, data} = this.props;
        const {number} = this.state
        return (
            <Grid container alignItems={'center'} className={classes.root}>
                <Grid item>
                    <Typography variant={'title'}
                                className={classes.operator}

                    onClick={() => this.handleChange(number > 0 ? (number - 1) : 0)}>-
                </Typography>
            </Grid>
        <Grid item>
            <Typography variant={'title'} className={classes.operator}
            >
                {number}
            </Typography>
        </Grid>
        <Grid item>
            <Typography variant={'title'}
                        className={classes.operator}

                        onClick={() => this.handleChange(number + 1)}>+
            </Typography>
        </Grid>
    </Grid>
    )
    }
}

Counter.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Counter);