import React, {Fragment} from 'react';
import {Button, Divider, Grid, Typography} from '@material-ui/core';
import {withStyles} from '@material-ui/core/styles';
import {connect} from 'react-redux'
import SocialIcon from '../Widget/SocialIcon'
import {CirclePicker} from 'react-color';
import Counter from '../Widget/Counter'
import {formatMoney} from "../../api/ApiUtils";
import NotFound from '../Layout/NotFound'
const styles = theme => {
    console.log(theme)
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
});


const mapDispatchToProps = dispatch => ({}
)

class ResponsiveDialog extends React.Component {

    render() {
        const {classes,name,regPrice, promotePrice,description} = this.props
            return (

            <Grid container direction={'column'} spacing={40}>
                <Grid item container spacing={16}>
                    <Grid item>
                        <Typography
                            variant={'display2'}>{name}
                        </Typography>
                    </Grid>
                    <Grid item container direction={'row'}>
                        {promotePrice?<Fragment>
                            <Typography variant={'headline'} className={classes.price}>$ {formatMoney(promotePrice)}</Typography>
                            <Typography component={'del'} variant={'subheading'} color={'secondary'}>$ {formatMoney(regPrice)}</Typography>

                        </Fragment>:
                            <Typography variant={'headline'} className={classes.price}>$ {formatMoney(regPrice)}</Typography>
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
                        <Typography variant={'title'}>
                            colors:
                        </Typography>
                        <CirclePicker
                            colors={["#f44336", "#e91e63", "#9c27b0", "#673ab7", "#3f51b5"]}
                        />
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