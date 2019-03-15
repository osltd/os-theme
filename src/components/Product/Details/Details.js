import {Button, Divider, Grid, Typography} from "@material-ui/core";
import {Fragment} from "react";
import {formatMoney} from "../../../api/ApiUtils";
import Counter from "../../Widget/Counter";
import React from "react";
import SocialIcon from '../../Widget/SocialIcon'
import swal from "@sweetalert/with-react";
import Variants from "./Variants";
import {findSelectedVariant} from './api'

let NO_VARIANT_ID = 1
const Detail = (props) => {
    let saveDraftToCart = () => {
        const {draft, product} = props
        let productCount = draft.number ? draft.number : 1
        props.dispatchDraftToCart(product, productCount, NO_VARIANT_ID)
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

    const {
        classes, name, promotePrice,
        description, variantKeys, variantOptions, product, selectedVariant
    } = props
    return <Grid item xs={12} sm={7} container direction={'column'} spacing={40}>
        <Grid item container spacing={16}>
            <Grid item>
                <Typography
                    variant={'h3'}
                    className={classes.name}>{name}
                </Typography>
            </Grid>
            <Grid item container direction={'row'}>
                {promotePrice ? <Fragment>
                        <Typography variant={'h5'}
                                    className={classes.price}>$ {formatMoney(promotePrice)}</Typography>
                        <Typography component={'del'} variant={'subtitle1'}
                                    color={'secondary'}>$ {formatMoney(
                            selectedVariant.price)}</Typography>
                    </Fragment> :
                    <Typography variant={'h5'}
                                className={classes.price}>

                        {
                            (selectedVariant.price==='not a reg price'|| !selectedVariant.price)?null:'$ '
                        }{formatMoney(
                        selectedVariant.price)}</Typography>
                }
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


            <Grid item container direction={'row'} spacing={32}>
                <Grid item>
                    <Counter
                        number={props.draft.number}
                        onChange={number => props.editCartVariant('number', number)}
                    />

                </Grid>
                <Grid item>

                    <Button variant="extendedFab" color={'secondary'}
                            onClick={() => saveDraftToCart()}
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

export default Detail