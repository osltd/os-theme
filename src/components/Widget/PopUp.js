import React, {useState} from 'react';
import PropTypes from 'prop-types';
import {withStyles} from '@material-ui/core/styles';
import green from '@material-ui/core/colors/green';
import {Grid, Popover} from '@material-ui/core';


const styles = theme => ({
    buttonWrapper: {
        position: 'relative',
        marginBottom: theme.spacing.unit * 4,

    },
    button: {
        cursor: 'pointer'
    },
    anchor: {
        backgroundColor: green[500],
        width: 10,
        height: 10,
        borderRadius: '50%',
        position: 'absolute',
    },

    checked: {},
    typography: {
        margin: theme.spacing.unit * 2,
    },
    icon: {
        height: '45px',
        cursor: 'pointer',
    },
    root: {
        display: 'flex',
        '& >*': {
            display: 'flex'
        }
    }
});


const PopUp = props => {

    const [open, setOpen] = useState(false);
    const [anchorEl, setAnchorEl] = useState(null);

    let handleClickButton = event => {
        setAnchorEl(
            event.currentTarget
        );
        setOpen(true)
    };
    //in parent
    //                                innerRef={e => this.popUp = e}
//this.popUp.handleClose()

    const {classes, popUp, title,} = props;

    return (

        <Grid

            container alignItems={'center'}>

            <Grid item className={classes.button} onClick={handleClickButton}>
                {title}
            </Grid>
            <Popover
                open={open}
                anchorEl={anchorEl}
                anchorReference={'anchorEl'}
                onClose={() => setOpen(false)}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'right',
                }}
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                }}
            >
                {popUp}
            </Popover>
        </Grid>
    );
};

PopUp.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(PopUp)