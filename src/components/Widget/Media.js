import ProductOverviewBox from './Product/overviewBox'
import Slick from './Slick/SingleItem'
import React from 'react'
import {Grid, Typography} from '@material-ui/core'
import {handleImgValid, refactorTextLength} from "../../api/ApiUtils";
import {connect} from "react-redux";
import {FEED_EDIT_FILTER} from "../../constants/actionType";
import {withStyles} from "@material-ui/core/styles/index";

const styles = theme => ({
    video: {
        width: '100%',
    },

    root: {},
    img: {
        width: '100%',
        height: ''
    },
});

const currencies = [
    {
        value: 'USD',
        label: '$',
    },
    {
        value: 'EUR',
        label: '€',
    },
    {
        value: 'BTC',
        label: '฿',
    },
    {
        value: 'JPY',
        label: '¥',
    },
];

const mapStateToProps = state => ({
    products: state.product.products,
});


const mapDispatchToProps = dispatch => ({
        editFeedFilter: (key, value) => dispatch({
            type: FEED_EDIT_FILTER,
            payload: {
                key: key,
                value: value,
            },
        }),


    }
)

class Media extends React.Component {
    state = {
        type: ''
    };

    handleChange = name => event => {
        this.setState({
            [name]: event.target.value,
        });
    };
    getMedia = data => {
        const {classes} = this.props
        if (data.length === 0) return null
        if (data.length > 0 && data[0].ext.indexOf('product://') !== -1) {
            const productId = data[0].ext.replace(/^\D+/g, '')
            let validProduct = this.props.products.find(n => n.id.toString() === productId)
            if (validProduct && this.state.type !== 'product') this.setState({
                type: 'product'
            })
            return (validProduct) ? (

                <ProductOverviewBox
                    id={validProduct.id}
                    name={refactorTextLength(validProduct.name)}
                    src={handleImgValid(validProduct.photos[0])}
                    category={validProduct.tags}
                    regPrice={validProduct.variants[0] ? validProduct.variants[0].price : 'not a reg price'}
                    promotePrice={validProduct.promotePrice}


                />
            ) : <Typography variant={'title'}>
                there should be product {productId} here, but product {productId} is no longer exist</Typography>
        }
        if (this.props.box && data[0].ext !== 'mp4') {
            return <img src={data[0].url}
                        className={classes.img}/>
        }

        switch (data[0].ext) {
            case 'mp4':
                return <video
                    className={classes.video}
                    controls>
                    <source src={data[0].url}
                            type="video/mp4"/>
                </video>
            default:
                return <Slick
                    data={data.map(n => ({url: n.url,}))}

                />
        }
    }

    render() {
        const {classes, data, box} = this.props;


        return <Grid container justify={'center'}
        >
            <Grid item xs={11} lg={this.state.type === 'product' && !box ? 6 : 11}>
                {
                    this.getMedia(data)
                }
            </Grid>

        </Grid>


    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(Media))