import React, {Fragment} from 'react';
import {Button, Divider, Grid, Typography} from '@material-ui/core';
import {withStyles} from '@material-ui/core/styles';
import {connect} from 'react-redux'
import SocialIcon from '../Widget/SocialIcon'
import ColorPick from '../Widget/ColorPicker'
import Counter from '../Widget/Counter'
import {formatMoney} from "../../api/ApiUtils";
import Tag from '../Widget/Tags/Tag'
import {CART_EDIT_VARIANT, CART_EMPTY_PRODUCT_VARIANT, CART_SAVE_PRODUCT_TO_CART} from "../../constants/actionType";
import SingleItemImgWall from '../Widget/ImgWall/singleItem'
import LoadingPage from '../Layout/LoadingPage'

const styles = theme => {
    return (
        {
            productCategory: {
                backgroundColor: theme.palette.background.paper
            },
            toolBar: {
                backgroundColor: ''
            },
            price: {
                color: '#ffc98b',
            },
            statusLabel: {
                color: 'green',
                fontWeight: '600',
            }
        })

}


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
        this.initVariant()

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

    componentDidMount() {
        this.initVariant()

    }

    render() {

        const {
            classes, name, promotePrice,
            description, variantKeys, variantOptions, product
        } = this.props
        const selectedVariant = this.findSelectedVariant()
        return (
            selectedVariant ?
                <Grid container spacing={16} alignItems={'flex-start'} justify={'center'}>
                    <Grid item xs={7} container direction={'column'} spacing={40}>
                        <Grid item container spacing={16}>
                            <Grid item>
                                <Typography
                                    variant={'display2'}>{name}
                                </Typography>
                            </Grid>
                            <Grid item container direction={'row'}>
                                {promotePrice ? <Fragment>
                                        <Typography variant={'headline'}
                                                    className={classes.price}>$ {formatMoney(promotePrice)}</Typography>
                                        <Typography component={'del'} variant={'subheading'}
                                                    color={'secondary'}>$ {formatMoney(
                                            selectedVariant.price)}</Typography>

                                    </Fragment> :
                                    <Typography variant={'headline'}
                                                className={classes.price}>$ {formatMoney(
                                        selectedVariant.price)}</Typography>
                                }
                            </Grid>
                            <Grid item container direction={'row'} spacing={8} alignItems={'flex-end'}>
                                <Grid item>
                                    <Typography variant={'subheading'} className={classes.statusLabel}>
                                        In Stock</Typography></Grid>
                                <Grid item>

                                    <Typography variant={'title'}>
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
                                            <Typography variant={'title'}>
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
                                        Add To Cart
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
                            <Grid item>

                                <Typography variant={'title'}>
                                    SHARE THIS PRODUCT:
                                </Typography>
                            </Grid>
                            <Grid item>

                                <SocialIcon type={'reddit'}/>
                                <SocialIcon type={'facebook'}/>
                                <SocialIcon type={'twitter'}/>
                                <SocialIcon type={'youtube'}/>
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid item xs={5}>
                        <SingleItemImgWall
                            data={(selectedVariant.photos.length > 0 ? selectedVariant : product).photos.map(n => ({src: n.url,}))}/>
                    </Grid>
                </Grid> : <LoadingPage/>

        );

    }
}


export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(ResponsiveDialog))