import React, {Fragment} from 'react';
import {Grid} from '@material-ui/core';
import {withStyles} from '@material-ui/core/styles';
import {connect} from 'react-redux'
import Comment from './Comment'
import NavBar from './NavBar'
import CommentForm from './CommentForm'
import Description from './Description'
const styles = theme => ({
    root: {
        border: ''
    },
    body: {

        padding: '20px',
    }
})


const mapStateToProps = state => ({

    section: state.product.detail.section


});


const mapDispatchToProps = dispatch => ({}
)

class Overview extends React.Component {

    render() {
        const {classes} = this.props
        return (
            <Grid container className={classes.root}>
                <Grid item xs={12}>
                    <NavBar/>
                </Grid>
                <Grid item md={7} xs={12} className={classes.body}>
                    {this.props.section==='Comments'?
                    <Fragment>

                        <Comment/>
                        <Comment/>
                        <Comment/>
                        <Comment/>
                        <Comment/>
                        <CommentForm/>
                    </Fragment>:<Description/>



                    }

                </Grid>
            </Grid>

        );
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(Overview))