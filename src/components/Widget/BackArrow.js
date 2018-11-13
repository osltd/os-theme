import React, {Fragment} from 'react';
import PropTypes from 'prop-types';
import {withStyles} from '@material-ui/core/styles';

const styles = theme => ({
    root: {
        margin: 0,
        padding: '5px 0px',
        display: 'inline-block',
    },

    icon: {
        compose: 'icon-left-16',
    }
})

class BackArrow extends React.Component {

    render() {
        const {classes} = this.props;

        return (
            <Fragment>
                <h1>
                    ggg
                </h1>
            </Fragment>

        );
    }
}

BackArrow.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(BackArrow);