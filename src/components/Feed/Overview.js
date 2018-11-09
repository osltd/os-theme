import React from 'react';
import {Grid} from '@material-ui/core';
import {withStyles} from '@material-ui/core/styles';
import {connect} from 'react-redux'
import FeedOverviewBox from '../Widget/Feed/overviewBox'

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

            <Grid container>
                {this.props.feeds.map((n, i) =>
                    <Grid item xs={3} key={i}>
                        <FeedOverviewBox
                            src={n.src}
                            subTitle={n.subTitle}
                            title={n.title}
                        />
                    </Grid>)}

            </Grid>

        );
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(ResponsiveDialog))