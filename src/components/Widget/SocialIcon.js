import React from 'react';
import classNames from 'classnames';

import PropTypes from 'prop-types';
import {withStyles} from '@material-ui/core/styles';

const styles = theme => ({
    root: {
        padding:'12px',
        border: '1px solid ' + theme.palette.secondary.main,
        margin: '3px',
        borderRadius: '5px',
        cursor: 'pointer',
        display: 'inline-block',
        fontSize:'24px',
    },
    reddit: {

        '&:before': {
            color: '#ff8c39',
        },
        '&:hover': {
            backgroundColor:
                '#ff8c39',

            '&:before': {

                color: 'white',
            }

        }
    },
    youtube: {

        '&:before': {
            color: '#ff342f',
        },
        '&:hover': {
            backgroundColor:
                '#ff342f',
            '&:before': {

                color: 'white',

            }
        }

    },
    twitter: {
        '&:before': {
            color: '#3c16ff',
        },
        '&:hover': {
            backgroundColor: '#3c16ff'
,
            '&:before': {
                color: 'white',
            }
        }
    }
    , facebook: {
        '&:before': {
            color: '#5567ff',

        },
        '&:hover': {
            backgroundColor: '#5567ff',
            '&:before': {

                color: 'white',
            }
        }


    }
})

class OutlinedInputAdornments extends React.Component {
    state = {
        amount: '',
        password: '',
        weight: '',
        weightRange: '',
        showPassword: false,
    };

    handleChange = prop => event => {
        this.setState({[prop]: event.target.value});
    };
    getIconType = type => {
        switch (type) {
            case 'reddit':
                return 'icon-reddit'
            case 'youtube':
                return 'icon-youtube'
            case 'twitter':
                return 'icon-twitter'
            case 'facebook':
                return 'icon-facebook2'
            default:
                return null
        }
    }

    render() {
        const {classes, type} = this.props;

        return <div className={classNames( classes[type], classes.root,this.getIconType(type),)}/>

    }
}

OutlinedInputAdornments.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(OutlinedInputAdornments);