import React, {Fragment} from 'react';
import {Button, Divider, Grid, Typography} from '@material-ui/core';
import {withStyles} from '@material-ui/core/styles';
import {connect} from 'react-redux'
import SocialIcon from '../Widget/SocialIcon'
import ColorPick from '../Widget/ColorPicker'
import Counter from '../Widget/Counter'
import {formatMoney} from "../../api/ApiUtils";
import Tag from '../Widget/Tags/Tag'
import {CART_EDIT_VARIANT,CART_INIT_SHOPPING_CART, CART_EMPTY_PRODUCT_VARIANT, CART_SAVE_PRODUCT_TO_CART} from "../../constants/actionType";

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

        emptyCartVariant:()=>dispatch({
            type:CART_EMPTY_PRODUCT_VARIANT,
        }),

    }
)

class ResponsiveDialog extends React.Component {

    componentDidMount(){
        this.initVariant()

    }
    getVariant = (keyName, index, variantOptions, needRender = true) => {
        let needInit = !(this.props.draft[keyName])
        if (needInit||!needRender) this.props.editCartVariant(keyName, variantOptions[index][0])
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
        let key = Object.keys(draft)
        let value = Object.values(draft)
        let productCount = 1
        let selectedDescription = []
        key.map(
            (keyName, index) => {
                (keyName === 'number') ? productCount = parseInt(value[index]) : selectedDescription.push(
                    keyName + ':' + value[index]
                )

            }
        )
        const isSelectedProduct = variants =>
            (!selectedDescription.map(description => variants.description.split(',').includes(description)).includes(false))

        let selectedVariantId = product.variants.find(n => isSelectedProduct(n)).id
        this.props.dispatchDraftToCart(product, productCount, selectedVariantId)
        this.initVariant()

    }
    initVariant = () => {

        const {variantKeys, variantOptions} = this.props
        this.props.emptyCartVariant()
        variantKeys.map((n, i) => this.getVariant(n, i, variantOptions, false))
        this.props.editCartVariant('number', 1)
    }

    render() {

        const {classes, name, regPrice, promotePrice,
            description, variantKeys, variantOptions, product} = this.props

        return (

            <Grid container direction={'column'} spacing={40}>
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
                                            color={'secondary'}>$ {formatMoney(regPrice)}</Typography>

                            </Fragment> :
                            <Typography variant={'headline'}
                                        className={classes.price}>$ {formatMoney(regPrice)}</Typography>
                        }
                    </Grid>
                    <Grid item container direction={'row'} alignItems={'flex-end'}>
                        <Typography variant={'subheading'} className={classes.statusLabel}>
                            In Stock</Typography>

                        <Typography variant={'title'}>
                            SKU MH03</Typography>
                    </Grid>
                    <Grid item>
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

                    <Grid item container direction={'row'} spacing={16}>
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


        );

    }
}


export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(ResponsiveDialog))