import React, {useState} from 'react';
import classNames from 'classnames';
import {Input} from '@material-ui/core';

import PropTypes from 'prop-types';
import {withStyles} from '@material-ui/core/styles';
import {makeStyles} from "@material-ui/styles";

const useStyles = makeStyles( theme => ({
    root: {
        display: 'flex',
        flexWrap: 'wrap',
    },
    margin: {
        margin: theme.spacing.unit,
    },
    textField: {
        color: 'white',
        /* border: 1px solid white; */
        padding: '10px 20px',
        flexBasis: '200px',
        borderRadius: '5px',
        background: '#000',
        border: '1px solid ' + theme.palette.secondary.light,
    }, icon: {
        margin: 'auto',

        '&:before': {
            fontSize: '18px',
            color: 'white',
        }
    }
}))

const  EmailSearchBar =props => {

const [email,setEmail] = useState('')
        const classes = useStyles()

        return <Input
            className={classNames(classes.margin, classes.textField)}
            variant={'filled'}
            placeholder={'enter email address'}
            value={email}
            onChange={e=>setEmail(e.target.value)}
            disableUnderline={true}
            endAdornment={<span className={classNames(classes.icon, 'icon-envelop')}/>}

        />
    }

export default (EmailSearchBar);