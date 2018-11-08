import React from 'react';
import {Divider, Grid, Toolbar, Typography} from '@material-ui/core';
import {withStyles} from '@material-ui/core/styles';
import {connect} from 'react-redux'
import Header from '../Layout/Body/Header'
import SingleItemImgWall from '../Widget/ImgWall/singleItem'
import Comment from './Comment'
import NavBar from './NavBar'
import CommentForm from './CommentForm'
const styles = theme => ({
    root:{
        border:''
    },
    body:{

            padding:'20px',
    }
})


const mapStateToProps = state => ({
});


const mapDispatchToProps = dispatch => ({}
)

class CommentDescription extends React.Component {

    render() {
        const {classes} = this.props
        return (
            <Grid container className={classes.root}>
<Grid item xs={12}>
                    <NavBar/>
</Grid>
<Grid item md={7} xs={12} className={classes.body}>
                    <Comment/>
                    <Comment/>
                    <Comment/>
                    <Comment/>
                    <Comment/>
    <CommentForm/>

</Grid>
            </Grid>

        );
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(CommentDescription))