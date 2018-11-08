import React from 'react';
import PropTypes from 'prop-types';
import {withStyles} from '@material-ui/core/styles';
import green from '@material-ui/core/colors/green';
import {Grid, Popover} from '@material-ui/core';


const styles = theme => ({
    buttonWrapper: {
        position: 'relative',
        marginBottom: theme.spacing.unit * 4,

    },
    button:{
        cursor:'pointer'
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


class AnchorPlayground extends React.Component {

    anchorEl = null;
    handleChange = key => (event, value) => {
        this.setState({
            [key]: value,
        });
    };
    handleClickButton = event => {
        this.setState({
            anchorEl: event.currentTarget,
            open: true,
        });
    };
    handleClose = () => this.setState({open: false,});
    //in parent
    //                                innerRef={e => this.popUp = e}
//this.popUp.handleClose()

    constructor(props) {
        super(props);
        this.myRef = React.createRef();

        this.state = {
            open: false,
            anchorEl: null,
        };

    }

    render() {
        const {classes, dropDown, parent,} = this.props;
        const {open} = this.state;

        return (

            <Grid
                ref={this.myRef}

                container alignItems={'center'}>

                <Grid item className={classes.button} onClick={this.handleClickButton}>
                    {parent}
                </Grid>
                <Popover
                    open={open}
                    anchorEl={this.state.anchorEl}
                    anchorReference={'anchorEl'}
                    onClose={this.handleClose}
                    anchorOrigin={{
                        vertical: 'bottom',
                        horizontal: 'right',
                    }}
                    transformOrigin={{
                        vertical: 'top',
                        horizontal: 'right',
                    }}
                >
                    {dropDown}
                </Popover>
            </Grid>
        );
    }
}

AnchorPlayground.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(AnchorPlayground)