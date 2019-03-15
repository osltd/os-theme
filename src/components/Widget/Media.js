import ProductOverviewBox from './Product/overviewBox'
import Slick from './Slick/SingleItem'
import React, {useState} from 'react'
import {Grid, Typography} from '@material-ui/core'
import {handleImgValid, refactorTextLength} from "../../api/ApiUtils";
import {connect} from "react-redux";
import {FEED_EDIT_FILTER} from "../../constants/actionType";
import {makeStyles} from "@material-ui/styles";

const useStyles = makeStyles(theme => ({
    video: {
        width: '100%',
    },

    root: {},
    img: {
        width: '100%',
        height: ''
    },
}));

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
);

const Media = props => {
    const [type, setType] = useState('');

    let handleChange = name => event => setType(
        event.target.value,
    );
    let getMedia = data => {
        const classes = useStyles();

        if (data.length === 0) return null;
        if (data.length > 0 && data[0].ext.indexOf('product://') !== -1) {
            const productId = data[0].ext.replace(/^\D+/g, '');
            let validProduct = props.products.find(n => n.id.toString() === productId);
            if (validProduct && type !== 'product') setType('product');

            return (validProduct) ? (

                <ProductOverviewBox
                    id={validProduct.id}
                    name={refactorTextLength(validProduct.name)}
                    src={handleImgValid(validProduct.photos[0])}
                    category={validProduct.tags}
                    regPrice={validProduct.variants[0] ? validProduct.variants[0].price : 'not a reg price'}
                    promotePrice={validProduct.promotePrice}


                />
            ) : <Typography variant={'h6'}>
                there should be product {productId} here, but product {productId} is no longer exist</Typography>
        }
        if (props.box && data[0].ext !== 'mp4') {
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
                </video>;
            default:
                return <Slick
                    data={data.map(n => ({url: n.url,}))}

                />
        }
    };

    const {classes, data, box} = props;


    return <Grid container justify={'center'}
    >
        <Grid item xs={12} lg={type === 'product' && !box ? 6 : 12}>
            {getMedia(data)}
        </Grid>

    </Grid>

};

//todo(unsafe)
export default connect(mapStateToProps, mapDispatchToProps)(Media)