import React from 'react';
import {Grid,Typography} from '@material-ui/core';
import {withStyles} from '@material-ui/core/styles';
import {connect} from 'react-redux'
import FeedOverviewBox from '../Widget/Feed/overviewBox'
import Header from '../Layout/Body/Header'
import List from '../Widget/List'
import SearchBar from '../Widget/SearchBar/original'

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

            <Grid container justify={'center'} >
                <Grid item xs={12}>
                    <Header
                        title={'BLOG'} route={'HOME/BLOG'}
                    />
                </Grid>
                <Grid item container lg={10 } spacing={16}>
                    <Grid item md={3} xs={12}>
                        <List
                            data={this.props.feeds}
                            title={'PRODUCT CATEGORIES'}
                        />
                        <Typography

                            variant={'title'}

                        >
                            SEARCH
                        </Typography>
                        <SearchBar/>
                    </Grid>
                    <Grid item container md={9} xs={12}>
                        {this.props.feeds.map((n, i) =>
                            <Grid item xs={6} key={i}>
                                <FeedOverviewBox
                                    src={n.src}
                                    subTitle={n.subTitle}
                                    title={n.title}
                                    author={n.author}
                                    postDate={n.postDate}

                                    comments={n.comments.length?n.comments.length:0}
                                />
                            </Grid>)}
                    </Grid>
                </Grid>
            </Grid>

        );
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(ResponsiveDialog))