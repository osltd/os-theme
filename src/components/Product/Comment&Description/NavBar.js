import React from 'react';
import PropTypes from 'prop-types';
import {withStyles} from '@material-ui/core/styles';
import {BottomNavigation} from '@material-ui/core';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import classNames from 'classnames'
import {EDIT_PRODUCT_DETAIL} from "../../../constants/actionType";
import {connect} from "react-redux";

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

const mapStateToProps = state => ({
    section: state.product.detail.section
});


const mapDispatchToProps = dispatch => ({
        editActiveSection: (key, value) => dispatch({
            type: EDIT_PRODUCT_DETAIL,
            payload: {
                key: key,
                value: value,

            }
        })

    }
)

class LabelBottomNavigation extends React.Component {
    state = {
        value: 'recents',
    };

    handleChange = (event, value) =>
         this.props.editActiveSection('section', value)





    render() {
        const {classes,section} = this.props;

        return (
            <BottomNavigation value={section} onChange={this.handleChange} className={classes.root}>
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

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(LabelBottomNavigation))