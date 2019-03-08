import React, {useEffect} from 'react';
import {Grid, Typography} from '@material-ui/core';
import {connect} from 'react-redux'
import ColorPick from '../Widget/ColorPicker.tsx'
import Tag from '../Widget/Tags/Tag'
import {CART_EDIT_VARIANT, CART_EMPTY_PRODUCT_VARIANT, CART_SAVE_PRODUCT_TO_CART} from "../../constants/actionType";
import LoadingPage from '../Layout/LoadingPage'
import swal from '@sweetalert/with-react'
import Detail from './Details/Details'
import Slick from '../Widget/Slick/Products'
import withWidth, {isWidthUp} from "@material-ui/core/withWidth/index";
import {makeStyles} from "@material-ui/styles";

const useStyles = makeStyles(theme =>
    (
        {
            name: {
                color: 'rgba(0, 0, 0)',
                fontSize: 28,
                fontWeight: 600
            },
            productCategory: {
                backgroundColor: theme.palette.background.paper
            },
            toolBar: {
                backgroundColor: ''
            },
            price: {
                color: 'green',
                fontSize: '30px',
            },
            statusLabel: {
                color: 'green',
                fontWeight: '600',
            }
        }));

const mapStateToProps = state => ({
    draft: state.cart.variant,
    shoppingCart: state.cart.shoppingCart,
});


const mapDispatchToProps = dispatch => ({
        editCartVariant: (key, value) => dispatch(
            {
                type: CART_EDIT_VARIANT,
                payload: {
                    key: key,
                    value: value,
                }
            }
        ),
        dispatchDraftToCart: (product, number, variantId) => dispatch({
                type: CART_SAVE_PRODUCT_TO_CART,
                payload: {
                    product: product,
                    number: number,
                    variantId: variantId,
                }
            }
        ),

        emptyCartVariant: () => dispatch({
            type: CART_EMPTY_PRODUCT_VARIANT,
        }),

    }
);

const SingleProductDetail = props => {

    let getVariant = (keyName, index, variantOptions, needRender = true) => {
        let needInit = !(props.draft[keyName]);
        if (needInit || !needRender) props.editCartVariant(keyName, variantOptions[index][0]);
        return needRender ? (keyName === 'color') ?
            <ColorPick
                colors={variantOptions[index]}
                onClick={color => props.editCartVariant(keyName, color)}
                selectedColor={props.draft[keyName]}
            /> :
            variantOptions[index].map((options, k) => <Tag
                    key={k}
                    value={options}
                    onClick={() => props.editCartVariant(keyName, options)}
                    selected={(props.draft[keyName] === options)}
                />
            ) : null

    };
    let saveDraftToCart = () => {
        const {draft, product} = props;
        let productCount = draft.number ? draft.number : 1;
        let selectedVariantId = findSelectedVariant().id;
        props.dispatchDraftToCart(product, productCount, selectedVariantId);
        swal(
            {
                content: (
                    <Grid container alignItems={'center'} direction={'column'}>
                        <Grid item>
                            {false && <span
                                className={'icon-like'}
                                style={{
                                    fontSize: '80px',
                                    color: 'hsla(100,55%,69%,.5)',
                                    padding: '20px',
                                    display: 'block',
                                    width: '80px',
                                    height: '80px',
                                    border: '4px solid hsla(98,55%,69%,.2)',
                                    borderRadius: '50%',
                                    boxSizing: 'content-box',
                                }}
                            />}
                        </Grid>
                        <Grid item>
                            <Typography variant={'h4'}>
                                Congratulation!
                            </Typography>
                        </Grid>
                        <Grid item>
                            <Typography variant={'subtitle1'}>
                                items added! </Typography>
                        </Grid>
                    </Grid>)
            })


    };

    let findSelectedVariant = () => {
        const {draft, product} = props;
        let key = Object.keys(draft);
        let value = Object.values(draft);
        let selectedDescription = [];
        key.map((keyName, index) => (keyName !== 'number') ? selectedDescription.push(keyName + ':' + value[index]) : null);
        const isSelectedProduct = variants => (!selectedDescription.map(description => variants.description.split(',').includes(description)).includes(false));
        return product.variants.find(n => isSelectedProduct(n))

    };
    let initVariant = () => {
        const {variantKeys, variantOptions} = props;
        props.emptyCartVariant();
        variantKeys.map((n, i) => getVariant(n, i, variantOptions, false));
        props.editCartVariant('number', 1)
    };

    let getSlick = (selectedVariant) => {

        const {
            classes, name, promotePrice,
            description, variantKeys, variantOptions, product
        } = props;
        return <Grid item container xs={10} sm={5}>
            <Grid item xs={12}>
                <Slick
                    data={(selectedVariant.photos.length > 0 ? selectedVariant : product).photos.map(n => ({url: n.url,}))}

                />
            </Grid>
        </Grid>
    };


    useEffect(
        () => {
            if (props.variantKeys) initVariant()

        },
        []
    );
    const classes = useStyles();

    const {
        variantOptions, product, variantKeys
    } = props;
    const position = (isWidthUp('sm', props.width) || props.width === 'sm');

    if (variantOptions && variantKeys && variantOptions.length < 1 && variantKeys.length < 1) {
        if (product) {

            return <Grid container spacing={16} alignItems={'flex-start'} justify={'center'}>
                {position ? <Detail {...props}
                                    selectedVariant={props.product}/> : null}

                <Grid item container xs={10} sm={5}>
                    <Grid item xs={12}>
                        <Slick
                            data={product.photos ? product.photos.map(n => ({url: n.url,})) : []}
                        />
                    </Grid>
                </Grid>

                {!position ? <Detail {...props}
                                     selectedVariant={props.product}
                /> : null}

            </Grid>
        } else return null
    } else {
        const selectedVariant = findSelectedVariant();
        return (
            selectedVariant ?
                <Grid container spacing={16} alignItems={'flex-start'} justify={'center'}>
                    {position ? <Detail
                        {...props}
                        saveDraftToCart={saveDraftToCart}
                        getVariant={getVariant}
                        classes={classes}
                        selectedVariant={selectedVariant}
                    /> : null}
                    {getSlick(selectedVariant)}
                    {!position ? <Detail
                        {...props}
                        saveDraftToCart={saveDraftToCart}
                        getVariant={getVariant}
                        classes={classes}
                        selectedVariant={selectedVariant}
                    /> : null}
                </Grid> : <LoadingPage/>

        );

    }

};


export default withWidth()(connect(mapStateToProps, mapDispatchToProps)(SingleProductDetail))
// <Dialog
// innerRef={e => dialog = e}
// title={}
// dialog={
// <Grid
//     style={
//         {
//             padding: '20px',
//         }
//     }
//     container direction={'column'} spacing={32} alignItems={'center'}>
//     <Grid item>
//         <Typography variant={'h6'}>
//             do u want to add to cart?
//         </Typography>
//     </Grid>
//     <Grid item container spacing={32} justify={'center'}>
//         <Grid item>
//             <Button variant="extendedFab"
//                     onClick={saveDraftToCart}
//
//             >
//                 yes
//             </Button>
//         </Grid>
//         <Grid item>
//             <Button variant="extendedFab"
//                     onClick={() => dialog.handleClose()}>
//                 no
//             </Button>
//         </Grid>
//     </Grid>
// </Grid>
// }
// />

//
// componentDidUpdate(prevProps, prevState, snap) {
//     if (props.location.pathname !== prevProps.location.pathname) initVariant()
// }
