import React from 'react';
import {Grid, Input} from '@material-ui/core';
import Button from '../Button/Button.js'

import PropTypes from 'prop-types';
import {withStyles} from '@material-ui/core/styles';
import {redirectUrl} from "../../../api/ApiUtils";

const styles = theme => ({
    root: {
        padding: '10px',
        backgroundColor: theme.palette.background.paper,
        border: '1px solid ' + theme.palette.primary.dark,
    },
    input: {},

    icon: {
        padding: '10px',
        margin: 'auto',
        '&:before': {}
    }
})

class SearchBar extends React.Component {
    state = {
        amount: '',
        password: '',
        weight: '',
        weightRange: '',
        showPassword: false,
    }


    render() {
        const {classes, placeholder, value, onChange, onKeyPress} = this.props

        return <Grid container alignItems={'center'}>
            <Grid item xs={8}>
                <Input
                    fullWidth={true}
                    classes={{
                        root: classes.root,
                        input: classes.input,
                    }}

                    variant={'filled'}
                    placeholder={placeholder}
                    defaultValue={value ? value : ''}
                    disableUnderline={true}
                    onChange={e => onChange(e.target.value)}
                    onKeyPress={e => onKeyPress ? onKeyPress(e.key) : null}
                />
            </Grid>
            <Grid item xs={4}>
                <Button
                    onClick={() => value ? redirectUrl(`/search/${value}`, this.props.history) : null}
                    value={'Search'}
                    icon2={'icon-arrow-right2'}
                /></Grid>


        </Grid>

    }
}

SearchBar.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(SearchBar);