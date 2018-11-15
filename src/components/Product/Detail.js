import React, {Fragment} from 'react';
import {Button, Divider, Grid, Typography} from '@material-ui/core';
import {withStyles} from '@material-ui/core/styles';
import {connect} from 'react-redux'
import SocialIcon from '../Widget/SocialIcon'
import ColorPick from '../Widget/ColorPicker'
import Counter from '../Widget/Counter'
import {formatMoney} from "../../api/ApiUtils";
import Tag from '../Widget/Tags/Tag'

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
    products: state.product.products,
    feeds: state.feed.feeds,
    category: state.category.category,
    draft:state.cart.variant,
});


const mapDispatchToProps = dispatch => ({}
)

class ResponsiveDialog extends React.Component {

    render() {
        const {classes, name, regPrice, promotePrice, description, variantKeys, variantOptions} = this.props
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
                                    {
                                        (n === 'color') ?
                                            <ColorPick
                                                colors={variantOptions[i]}
                                                onClick={color => console.log(color)}

                                            /> :
                                            variantOptions[i].map((options, k) => <Tag
                                                    value={options}
                                                />
                                            )
                                    }
                                </Fragment>
                            )
                        }

                    </Grid>

                    <Grid item container direction={'row'} spacing={16}>
                        <Grid item>
                            <Counter/></Grid>
                        <Grid item>

                            <Button variant="extendedFab" color={'secondary'}>
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