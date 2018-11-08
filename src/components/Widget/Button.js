import React from 'react';
import {Grid,Typography} from '@material-ui/core'
import {withStyles} from '@material-ui/core/styles';
import PropTypes from "prop-types";
import {Link} from 'react-router-dom'


const styles = theme => ({
    root: {
        textDecoration: 'none',
        color:theme.palette.primary.main,

    },
    title: {
        fontWeight: 'lighter',

    },
    btnText: {
            
    },
    icon: {
        marginRight: '5px',
        '&:before': {
        }
    }
});

class CustomButton extends React.Component {
    state = {
        anchor: 'left',
    };
    handleChange = name => event => {
        this.setState({
            [name]: event.target.value,

        });
    };

    constructor(props) {
        super(props)
        this.state = {
            placeHolder: '',

        }
    }

    render() {
        const {

            classes, link, onClick, value, icon2, icon



        } = this.props;

        return (

            <Grid
                container

                component={link ? Link : 'span'}
                to={link ? link : '#'}
                alignItems={'center'}
                className={classes.root}
                onClick={onClick}
            >
                {icon && <span className={classes.icon + ' ' + icon}/>}
                {value && <Typography variant={'title'} className={classes.btnText}>{value}</Typography>}
                {icon2 && <span className={classes.icon + ' ' + icon2}/>}
            </Grid>

        )
    }
}

CustomButton.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(CustomButton);