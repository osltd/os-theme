import {Button, Divider, Grid, Typography} from "@material-ui/core";
import React, {Fragment} from "react";
import {formatMoney} from "../../../api/ApiUtils";
import Counter from "../../Widget/Counter";
import SocialIcon from '../../Widget/SocialIcon'

let NO_VARIANT_ID = 1;
let Detail = (props) => {

    const {
        classes,
        selectedVariant,
        getVariant,
        saveDraftToCart,
        name, promotePrice,
        description, variantKeys, variantOptions, product
    } = props;
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
                                className={classes.price}>$ {formatMoney(
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

            <Grid item>


                {
                    variantKeys.map((n, i) =>
                        <Fragment key={i}>
                            <Typography variant={'h6'}>
                                {n}
                            </Typography>
                            {getVariant(n, i, variantOptions)}
                        </Fragment>
                    )
                }

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
                            onClick={saveDraftToCart}
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
};

export default Detail