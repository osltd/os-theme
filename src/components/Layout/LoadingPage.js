import PropTypes from "prop-types";
import React from 'react'
import {CircularProgress, Grid} from '@material-ui/core'
import {redirectUrl} from "../../api/ApiUtils";
import {withRouter} from "react-router-dom";
import {makeStyles} from "@material-ui/styles";

const useStyles = makeStyles(theme => ({
    root: {
        width: '100%',
        padding: '40px',
        marginTop: '30px',
    }
}));

class NotFound extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            timer: () => null,
        }
    }

    componentDidMount() {
        this.setState(
            {
                timer: setTimeout(
                    () => redirectUrl('/404', this.props.history), 5000000
                )
            }
        )

    }

    componentWillUnmount() {
        clearTimeout(this.state.timer)
    }

    render() {
        const {msg} = this.props;

        return (

            <Grid container justify={'center'} alignItems={'center'} className={'root'}>
                <CircularProgress size={400}/>
            </Grid>);
    }
}


export default withRouter(NotFound)