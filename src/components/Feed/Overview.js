import React from 'react';
import {Grid, Typography} from '@material-ui/core';
import {withStyles} from '@material-ui/core/styles';
import {connect} from 'react-redux'
import FeedOverviewBox from '../Widget/Feed/overviewBox'
import Header from '../Layout/Body/Header'
import List from '../Widget/List'
import SearchBar from '../Widget/SearchBar/original'
import {refactorParaLength} from "../../api/ApiUtils";

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


const mapDispatchToProps = dispatch => ({

    }
)

class ResponsiveDialog extends React.Component {


    render() {
        const {classes} = this.props
        return (

            <Grid container justify={'center'}>
                <Grid item xs={12}>
                    <Header
                        title={'BLOG'} route={'HOME/BLOG'}
                    />
                </Grid>
                <Grid item container lg={10} spacing={16}>
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
                        {this.props.feeds && this.props.feeds.map((n, i) =>
                            <Grid item sm={6} xs={12} key={i}>
                                <FeedOverviewBox
                                    id={n.id}

                                    src={n.sections && n.sections.find(section => !!section.medias[0]) ? n.sections.find(section => section.medias[0]).medias[0].url :
                                        'https://www.freeiconspng.com/uploads/no-image-icon-4.png'}
                                    subTitle={refactorParaLength(n.sections[0].description)}
                                    title={n.sections[0].title}
                                    author={n.authors[0].name.first + ' ' + n.authors[0].name.last}
                                    postDate={n.postDate}
                                    comments={0}
                                />
                            </Grid>)}
                    </Grid>
                </Grid>
            </Grid>

        );
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(ResponsiveDialog))