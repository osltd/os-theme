import PropTypes from "prop-types";
import React from 'react'
import {CircularProgress, Grid} from '@material-ui/core'
import {withStyles} from '@material-ui/core/styles';
import {redirectUrl} from "../../api/ApiUtils";
import {withRouter} from "react-router-dom";

const styles = theme => ({
    root: {
        width: '100%',
        padding: '40px',
        marginTop: '30px',
    }
});


class NotFound extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            timer: () => null,
        }
    }

    componentDidMount() {
        this.setState(
            {
                timer: setTimeout(
                    () => redirectUrl('/404', this.props.history), 5000
                )
            }
        )

    }

    componentWillUnmount() {
        clearTimeout(this.state.timer)
    }

    render() {
        const {classes, msg} = this.props;

        return (

            <Grid container justify={'center'} alignItems={'center'} className={classes.root}>
                <CircularProgress size={400}/>
            </Grid>);
    }
}

NotFound.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withRouter(withStyles(styles)(NotFound))