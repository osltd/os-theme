import React from 'react';
import {Divider, Grid, Toolbar, Typography} from '@material-ui/core';
import {withStyles} from '@material-ui/core/styles';
import {connect} from 'react-redux'
import Header from '../Layout/Body/Header'
import SingleItemImgWall from '../Widget/ImgWall/singleItem'
import Comment from '../Widget/Comment'

const styles = theme => {
    console.log(theme)
    return (
        {
            productCategory: {
                backgroundColor: theme.palette.background.paper
            },
            toolBar:{
                backgroundColor:''
            }
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
            <Grid container alignItems={'center'} justify={'center'}>
                <Grid item xs={12}>
                    <Header
                        title={'SINGLE PRODUCT'}
                        route={'HOME/SHOP/SINGLE PRODUCT'}
                    />
                </Grid>
                <Grid item xs={10} container alignItems={'flex-start'} justify={'center'}>

                    <Grid item xs={7}>
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
                    <Grid item xs={5}>
                        <SingleItemImgWall
                        />
                    </Grid>

                </Grid>
                <Divider/>
                <Grid item xs={10} spacing={16} className={classes.toolBar}>
                    <Toolbar>
                        <Grid container>
                            <Grid item >
<Typography variant={'title'}> description</Typography>
                            </Grid>
                            <Grid item >
                                <Typography  variant={'title'}> comment</Typography>

                            </Grid>
                        </Grid>
                    </Toolbar>
                    <Grid item xs={5}>
                        <Comment/>
                        <Comment/>
                        <Comment/>
                        <Comment/>
                        <Comment/>
                    </Grid>
                </Grid>

            </Grid>

        );
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(ResponsiveDialog))