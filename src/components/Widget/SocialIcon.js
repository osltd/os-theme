import React from 'react';
import classNames from 'classnames';

import PropTypes from 'prop-types';
import {withStyles} from '@material-ui/core/styles';

const styles = theme => ({
    root: {
        padding:'9px',
        border: '1px solid ' + theme.palette.secondary.main,
        margin: '3px',
        borderRadius: '5px',
        cursor: 'pointer',
        display: 'inline-block',
    },
    reddit: {

        '&:before': {
            color: '#ff8c39',
        },
        '&:hover': {
            '&:before': {

                color: 'white',
                backgroundColor:
                    '#ff8c39',
            }

        }
    },
    youtube: {

        '&:before': {
            color: '#ff342f',
        },
        '&:hover': {
            '&:before': {

                color: 'white',
                backgroundColor:
                    '#ff342f'
            }
        }

    },
    twitter: {
        '&:before': {
            color: '#3c16ff',
        },
        '&:hover': {
            '&:before': {
                color: 'white',
                backgroundColor: '#3c16ff'
            }
        }
    }
    , facebook: {
        '&:before': {
            color: '#5567ff',

        },
        '&:hover': {
            '&:before': {

                color: 'white',
                backgroundColor: '#5567ff'
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