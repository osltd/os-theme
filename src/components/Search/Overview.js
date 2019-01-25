import React from 'react';
import {Grid, Typography} from '@material-ui/core';
import {connect} from 'react-redux'
import {withStyles} from '@material-ui/core/styles';
import {handleImgValid, refactorParaLength, refactorTextLength} from "../../api/ApiUtils";
import withWidth from "@material-ui/core/withWidth/index";
import FeedOverviewBox from '../Widget/Feed/overviewBox'
import ProductOverviewBox from '../Widget/Product/overviewBox'
import Header from '../Layout/Body/Header'
import LoadingPage from '../Layout/LoadingPage'
import SearchBar from '../Widget/SearchBar/original'
import {COMMON_EDIT_SEARCH_BAR} from "../../constants/actionType";

const styles = theme => ({
    productCategory: {
        backgroundColor: '#F7F7F7',

    },
    toolBar: {
        padding: '10px',
        backgroundColor: theme.palette.background.paper,
    },
    icon: {
        padding: '10px',
        cursor: 'pointer',
        alignItems: 'center',
        border: '1px solid black',

    }, listMode: {
        padding: '20px',
    },
    array: {
        paddingLeft: '5px',
    }
})

const mapStateToProps = state => ({
    products: state.product.products,
    feeds: state.feed.feeds,
    keyword: state.common.searchBar,
});


const mapDispatchToProps = dispatch => ({
        editSearchBar: (keyword = null) => dispatch({
            type: COMMON_EDIT_SEARCH_BAR,
            payload: keyword
        })
    }
)

class SearchPage extends React.Component {
    searchData = (data) =>
        data.filter(n => (this.props.keyword) ? (JSON.stringify(n).toLowerCase().indexOf(this.props.keyword.toLowerCase()) !== -1) : false)
    onChange = value => {
        clearTimeout(this.state.timer)
        this.setState(
            {
                timer: setTimeout(() => this.props.editSearchBar(value), 500)

            }
        )
    }

    constructor(props) {
        super(props)
        this.state = {
            timer: () => null
        }

    }

    componentDidMount() {
        this.props.editSearchBar(this.props.match.params.keyword)
    }

    componentDidUpdate(prevProps, prevState, snapShot) {
        if (this.props.location !== prevProps.location)
            this.props.editSearchBar(this.props.match.params.keyword)


    }

    render() {

        const {classes} = this.props
        if (!this.props.products && !this.props.feeds) return <LoadingPage/>
        const products = this.props.products ? this.searchData(this.props.products) : []
        const feeds = this.props.feeds ? this.searchData(this.props.feeds) : []
        const searchResultCount = products.length + feeds.length

        return (
            <Grid container alignItems={'center'} justify={'center'}>
                <Header
                    title={'Search'}

                />
                <Grid item xs={6} container spacing={16} direction={'column'}>
                    <Grid item>
                        <SearchBar
                            value={this.props.keyword}
                            onChange={value => this.onChange(value)}
                            placeholder={'please type keyword'}
                        />
                    </Grid>
                    <Grid item>
                        <Typography variant={'h6'}>
                            {
                                this.props.keyword && 'found ' + searchResultCount + ' matched results'
                            }   </Typography>
                    </Grid>
                </Grid>
                <Grid item container lg={9} spacing={32} xs={11}>

                    {
                        products &&
                        <Grid item xs={12}>
                            <Typography variant={'h6'}>

                                Products ({products.length})
                            </Typography></Grid>

                    }
                    {products && products.map((n, i) => (
                        <Grid item md={4} sm={6} xs={12} key={i}>


                            <ProductOverviewBox
                                key={i}
                                src={handleImgValid(n.photos[0])}
                                name={refactorTextLength(n.name)}
                                category={n.tags}
                                regPrice={n.variants[0] ? n.variants[0].price : 'not a reg price'}
                                promotePrice={n.promotePrice}
                                description={n.description}
                                id={n.id}
                            />
                        </Grid>))}
                    {
                        feeds &&
                        <Grid item xs={12}>
                            <Typography variant={'h6'}>

                                Feeds ({feeds.length})
                            </Typography>
                        </Grid>
                    }
                    {feeds && feeds.map((n, i) =>
                        <Grid item md={6} xs={12} key={i}>
                            <FeedOverviewBox
                                id={n.id}
                                medias={n.sections[0].medias}
                                src={n.sections && n.sections.find(section => !!section.medias[0]
                                ) ? n.sections.find(section => section.medias[0]).medias[0].url :
                                    'https://www.freeiconspng.com/uploads/no-image-icon-15.png'}

                                subTitle={refactorParaLength(n.sections[0].description)}
                                title={n.sections[0].title}
                                author={n.authors[0] ? n.authors[0].name.first + ' ' + n.authors[0].name.last : 'no authors'}
                                postDate={n.postDate}
                                comments={0}
                            />
                        </Grid>
                    )}
                </Grid>
            </Grid>
        );
    }
}

export default withWidth()(connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(SearchPage)))