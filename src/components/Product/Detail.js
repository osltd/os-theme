import React, {Fragment} from 'react';
import {Button, Divider, Grid, Typography} from '@material-ui/core';
import {withStyles} from '@material-ui/core/styles';
import {connect} from 'react-redux'
import SocialIcon from '../Widget/SocialIcon'
import ColorPick from '../Widget/ColorPicker.tsx'
import Counter from '../Widget/Counter'
import {formatMoney} from "../../api/ApiUtils";
import Tag from '../Widget/Tags/Tag'
import {CART_EDIT_VARIANT, CART_EMPTY_PRODUCT_VARIANT, CART_SAVE_PRODUCT_TO_CART} from "../../constants/actionType";
import LoadingPage from '../Layout/LoadingPage'
import {withRouter} from 'react-router-dom'
import swal from '@sweetalert/with-react'
import Detail from './Details/Details'
import Slick from '../Widget/Slick/Products'
import withWidth, {isWidthUp} from "@material-ui/core/withWidth/index";

const styles = theme =>
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
        })


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
)

class ResponsiveDialog extends React.Component {

    getVariant = (keyName, index, variantOptions, needRender = true) => {
        let needInit = !(this.props.draft[keyName])
        if (needInit || !needRender) this.props.editCartVariant(keyName, variantOptions[index][0])
        return needRender ? (keyName === 'color') ?
            <ColorPick
                colors={variantOptions[index]}
                onClick={color => this.props.editCartVariant(keyName, color)}
                selectedColor={this.props.draft[keyName]}
            /> :
            variantOptions[index].map((options, k) => <Tag
                    key={k}
                    value={options}
                    onClick={() => this.props.editCartVariant(keyName, options)}
                    selected={(this.props.draft[keyName] === options)}
                />
            ) : null

    }
    saveDraftToCart = () => {
        const {draft, product} = this.props
        let productCount = draft.number ? draft.number : 1
        let selectedVariantId = this.findSelectedVariant().id
        this.props.dispatchDraftToCart(product, productCount, selectedVariantId)
        swal(
            {
                content: (<Grid container alignItems={'center'} direction={'column'}>
                    <Grid item>
                        {false && <span className={'icon-like'}

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


    }

    findSelectedVariant = () => {
        const {draft, product} = this.props
        let key = Object.keys(draft)
        let value = Object.values(draft)
        let selectedDescription = []
        key.map((keyName, index) => (keyName !== 'number') ? selectedDescription.push(keyName + ':' + value[index]) : null)
        const isSelectedProduct = variants => (!selectedDescription.map(description => variants.description.split(',').includes(description)).includes(false))
        return product.variants.find(n => isSelectedProduct(n))

    }
    initVariant = () => {
        const {variantKeys, variantOptions} = this.props
        this.props.emptyCartVariant()
        variantKeys.map((n, i) => this.getVariant(n, i, variantOptions, false))
        this.props.editCartVariant('number', 1)
    }
    getDetail = (selectedVariant) => {

        const {
            classes, name, promotePrice,
            description, variantKeys, variantOptions, product
        } = this.props
        return <Grid item xs={12} sm={7} container direction={'column'} spacing={40}>
            <Grid item container spacing={16}>
                <Grid item>
                    <Typography
                        variant={'h3'}
                        className={classes.name}>{name}
                    </Typography>
                </Grid>
                <Grid item container direction={'row'}>

                </Grid>
                <Grid item container spacing={8} direction={'column'} alignItems={'flex-start'}>
                    <Grid item>
                        <Typography variant={'subtitle1'} className={classes.statusLabel}>In Stock</Typography></Grid>
                    <Grid item>

                        <Typography variant={'h6'}>
                            SKU MH03</Typography></Grid>
                </Grid>
                <Grid item xs={12}>
                    <Typography variant={'body1'}>
                        {description}
                    </Typography>
                </Grid>

                <Grid item>


                    {
                        variantKeys.map((n, i) =>
                            <Fragment key={i}>
                                <Typography variant={'h6'}>
                                    {n}
                                </Typography>
                                {this.getVariant(n, i, variantOptions)}
                            </Fragment>
                        )
                    }

                </Grid>

                <Grid item container direction={'row'} spacing={32}>
                    <Grid item>
                        <Counter
                            number={this.props.draft.number}
                            onChange={number => this.props.editCartVariant('number', number)}
                        />

                    </Grid>
                    <Grid item>

                        <Button variant="extendedFab" color={'secondary'}
                                onClick={this.saveDraftToCart}
                        >

                            <span className={'icon-cart'}/>
                            &nbsp;&nbsp;Add To Cart
                        </Button>
                    </Grid>
                </Grid>
            </Grid>

            <Divider/>
            <Grid item container direction={'column'} spacing={16}>
                <Grid item container spacing={16}>
                    <Grid item>
                        <Button variant="extendedFab" color={'secondary'}>
                            <span className={'icon-heart'}/>
                        </Button>
                    </Grid>
                    <Grid item>
                        <Button variant="extendedFab" color={'secondary'}>
                            <span className={'icon-mail2'}/>
                        </Button>
                    </Grid>
                    <Grid item>
                        <Button variant="extendedFab" color={'secondary'}>
                            <span className={'icon-coin-dollar'}/>
                        </Button>
                    </Grid>
                </Grid>


                <Grid item style={{marginTop: 15}}>
                    <Typography variant={'h6'} style={{fontSize: 15}}>
                        SHARE THIS PRODUCT:
                    </Typography>
                </Grid>
                <Grid item>
                    <SocialIcon type={'whatsapp'}
                                onClick={() => window.open('https://web.whatsapp.com/send?text=' + window.location.href)}/>
                    <SocialIcon type={'facebook'}
                                onClick={() => window.open('https://www.facebook.com/sharer/sharer.php?u=' + window.location.href)}/>

                </Grid>
            </Grid>
        </Grid>
    }
    getSlick = (selectedVariant) => {

        const {
            classes, name, promotePrice,
            description, variantKeys, variantOptions, product
        } = this.props
        return <Grid item container xs={10} sm={5}>
            <Grid item xs={12}>
                <Slick
                    data={(selectedVariant.photos.length > 0 ? selectedVariant : product).photos.map(n => ({url: n.url,}))}

                />
            </Grid>
        </Grid>
    }

    componentDidMount() {
        if (this.props.variantKeys) this.initVariant()

    }

    componentDidUpdate(prevProps, prevState, snap) {
        if (this.props.location.pathname !== prevProps.location.pathname) this.initVariant()
    }

    render() {
        const {
            variantOptions, product, variantKeys
        } = this.props
        const position = (isWidthUp('sm', this.props.width) || this.props.width === 'sm')

        if (variantOptions && variantKeys && variantOptions.length < 1 && variantKeys.length < 1) {
            if (product) {

                return <Grid container spacing={16} alignItems={'flex-start'} justify={'center'}>
                    {position ? <Detail {...this.props}
                                        selectedVariant={this.props.product}/> : null}

                    <Grid item container xs={10} sm={5}>
                        <Grid item xs={12}>
                            <Slick
                                data={product.photos ? product.photos.map(n => ({url: n.url,})) : []}
                            />
                        </Grid>
                    </Grid>

                    {!position ? <Detail {...this.props}
                                         selectedVariant={this.props.product}
                    /> : null}

                </Grid>
            } else return null
        } else {
            const selectedVariant = this.findSelectedVariant()
            return (
                selectedVariant ?
                    <Grid container spacing={16} alignItems={'flex-start'} justify={'center'}>
                        {position ? this.getDetail(selectedVariant) : null}
                        {this.getSlick(selectedVariant)}
                        {!position ? this.getDetail(selectedVariant) : null}
                    </Grid> : <LoadingPage/>

            );

        }

    }
}


export default withWidth()(withRouter(connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(ResponsiveDialog))))
// <Dialog
// innerRef={e => this.dialog = e}
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
//                     onClick={this.saveDraftToCart}
//
//             >
//                 yes
//             </Button>
//         </Grid>
//         <Grid item>
//             <Button variant="extendedFab"
//                     onClick={() => this.dialog.handleClose()}>
//                 no
//             </Button>
//         </Grid>
//     </Grid>
// </Grid>
// }
// />