import React from 'react';
import PropTypes from 'prop-types';
import {withStyles} from '@material-ui/core/styles';
import {BottomNavigation} from '@material-ui/core';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import classNames from 'classnames'
const styles = theme => (
    {
        root: {}, icon: {
            '&:before': {
                color: theme.palette.success,
                fontSize: '30px',
            }
        }
    }
)

class LabelBottomNavigation extends React.Component {
    state = {
        value: 'recents',
    };

    handleChange = (event, value) => {
        this.setState({value});
    };

    render() {
        const {classes} = this.props;
        const {value} = this.state;

        return (
            <BottomNavigation value={value} onChange={this.handleChange} className={classes.root}>

                <BottomNavigationAction label="Description" value="Description"
                                        icon={<span className={classNames('icon-file-text', classes.icon)}/>}/>
                <BottomNavigationAction label="Comments" value="Comments"
                                        icon={<span className={classNames(classes.icon, 'icon-pencil')}/>}/>
            </BottomNavigation>

        );
    }
}

LabelBottomNavigation.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(LabelBottomNavigation);