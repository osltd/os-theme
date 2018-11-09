import React from 'react';
import {Divider, Grid, Typography} from '@material-ui/core';
import {withStyles} from '@material-ui/core/styles';
import {connect} from 'react-redux'
import Header from '../Layout/Body/Header'
import SingleItemImgWall from '../Widget/ImgWall/singleItem'
import CommentDescription from './Comment&Description/Overview'
import SocialIcon from '../Widget/SocialIcon'
const styles = theme => {
    console.log(theme)
    return (
        {
            productCategory: {
                backgroundColor: theme.palette.background.paper
            },
            toolBar: {
                backgroundColor: ''
            },
        })

}


const mapStateToProps = state => ({
    products: state.product.products,
    feeds: state.feed.feeds,
    category: state.category.category,
});


const mapDispatchToProps = dispatch => ({}
)

class ResponsiveDialog extends React.Component {

    render() {
        const {classes} = this.props
        return (
            <Grid container direction={'column'}>
                <Grid item >
                        <Typography

                            variant={'title'}>
                            Kaoreet lobortis sagittis

                        </Typography>
                        <Typography>
                            $122.00
                        </Typography>
                        <Typography variant={'subheading'}>
                            In Stock SKU MH03</Typography>
                        <Typography variant={'body1'}>
                            Lorem ipsum dolore sieded amet, consectetured adipisicing elite. Accusantium animi,
                            aspernature assumenda commodi cumque dicta distinctio doloremque dolores eius esse eveniet
                            ex exercitationem fugiat harum ipsa iste libero neque nulla omnis praesentium, quae, quia
                            sapiente sequi sint sit unde vitae?
                        </Typography>
                </Grid>
                <Grid item >
                            <SocialIcon type={'reddit'}/>
                            <SocialIcon type={'facebook'}/>
                            <SocialIcon type={'twitter'}/>
                    <SocialIcon type={'youtube'}/></Grid>
                    </Grid>


        );
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(ResponsiveDialog))