import React from 'react';
import PropTypes from 'prop-types';
import {withStyles} from '@material-ui/core/styles';
import {Grid} from '@material-ui/core';
import Collapse from '@material-ui/core/Collapse';

const styles = theme => ({
    root: {
        width: '100%'
    },
    container: {
        display: 'flex',
    },
    title: {
        cursor: 'pointer',
    },
    arrow: {
        '&:before': {
            fontSize: '30px',
            color: theme.palette.secondary.dark,
        }

    }

});

class SimpleCollapse extends React.Component {
    state = {
        checked: false,
    };

    handleChange = () => {
        this.setState(state => ({checked: !state.checked}));
    };

    render() {
        const {classes, title, collapse, arrow} = this.props;
        const {checked} = this.state;

        return (
            <Grid container className={classes.root}>
                <Grid item container alignItems={'center'} className={classes.title} onClick={this.handleChange}>
                    <Grid item>

                        {title}
                    </Grid>
                    {
                        arrow &&
                        <Grid item>
                            <span className={classes.arrow + ' ' + (checked ? 'icon-circle-down' : 'icon-circle-up')}/>
                        </Grid>
                    }
                </Grid>
                <Grid item xs={11} container justify={'center'} className={classes.collapse}>
                    <Collapse in={checked}>
                        {collapse}
                    </Collapse>
                </Grid>

            </Grid>
        );
    }
}

SimpleCollapse.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(SimpleCollapse);