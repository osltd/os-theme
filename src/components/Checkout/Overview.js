import React, {useState} from 'react';
import {connect} from 'react-redux';
import {createUseStyles} from 'react-jss';








import {Button, Divider, Grid, Typography} from '@material-ui/core';
import Header from '../Layout/Body/Header'
import {EDIT_PRODUCT_VIEW_MODE, PRODUCT_EDIT_FILTER, PRODUCT_EDIT_SORT} from "../../constants/actionType";
import {withStyles} from '@material-ui/core/styles';
import OrderSummary from './OrderSummary'
import BillingDetails from './BillingDetails'
import withWidth, {isWidthUp} from "@material-ui/core/withWidth/index";
import Collapse from '../Widget/Collapse'
import LoadingPage from '../Layout/LoadingPage'
import {redirectUrl} from "../../api/ApiUtils";
import PromoCode from './PromoCode'
import {withSnackbar} from 'notistack'
import _ from 'lodash'
import * as styleGuide from "../../constants/styleGuide";
import {I18nText} from "../Widget/I18nText";
import {keyOfI18n} from "../../constants/locale/interface";
import {useI18nText} from "../../hooks/useI18nText";

const styles = createUseStyles({
    wrapper: {
        padding: '0 9%',
        display: 'flex',
        margin: '0 -10px'
    },
    formGroup: {
        flex: 1,
        margin: '0 10px'
    },
    formInput: {
        width: '100%',
        height: 40,
        borderRadius: 5,
        border: '1px solid #dadada',
        padding: '0 15px'
    }








    // productCategory: {
    //     backgroundColor: '#F7F7F7',

    // },
    // toolBar: {
    //     padding: '10px',
    //     backgroundColor: theme.palette.background.paper,
    // },
    // icon: {
    //     padding: '10px',
    //     cursor: 'pointer',
    //     alignItems: 'center',
    //     border: '1px solid black',

    // }, listMode: {
    //     padding: '20px',
    // }, title: {
    //     padding: '30px'
    // },
    // form: {
    //     margin: '40px',
    //     padding: '40px',
    //     border: '1px solid ' + theme.palette.secondary.light,

    // }

});

const mapStateToProps = state => ({
    shoppingCart: state.cart.shoppingCart,
    user: state.auth.user,

});
const mapDispatchToProps = dispatch => ({

    changeViewMode: (mode) =>
        dispatch({
                type: EDIT_PRODUCT_VIEW_MODE,
                payload: mode,
            }
        )
    ,
    editProductSort: (key, value) => dispatch({
        type: PRODUCT_EDIT_SORT,
        payload: {
            key: key,
            value: value,
        },
    }),
    editProductFilter: (key, value) => dispatch({
        type: PRODUCT_EDIT_FILTER,
        payload: {
            key: key,
            value: value,
        },
    }),
});

const CheckoutOverview = props => {
    const classes = styles();
    const {form, setForm} = useState({});

    return <div>
        <Header title={useI18nText(keyOfI18n.CHECKOUT)}/>
        <div className={classes.wrapper}>
            <div className={classes.formGroup}>
                <div>
                    <h3>Order Summary</h3>
                    <table
                        style={{
                            width: '100%',
                            boxShadow: '0px 1px 5px 0px rgba(0,0,0,0.2), 0px 2px 2px 0px rgba(0,0,0,0.14), 0px 3px 1px -2px rgba(0,0,0,0.12)',
                            borderRadius: 4,
                            backgroundColor: '#f7f7f7'
                        }}
                    >
                        <thead>
                            <tr>
                                <td>Product</td>
                                <td>Price</td>
                            </tr>
                        </thead>
                        <tbody>

                        </tbody>
                        <tfoot>
                            <tr>
                                <td>Total Amount</td>
                                <td>HK$0</td>
                            </tr>
                            <tr>
                                <td colSpan="2">I have</td>
                            </tr>
                            <tr>
                                <td colSpan="2">
                                    <button
                                        type="button"
                                    >Place Order</button>
                                </td>
                            </tr>
                        </tfoot>
                    </table>
                </div>
                <div>
                    <h3>Promo Code</h3>
                    <table
                        style={{
                            width: '100%',
                            boxShadow: '0px 1px 5px 0px rgba(0,0,0,0.2), 0px 2px 2px 0px rgba(0,0,0,0.14), 0px 3px 1px -2px rgba(0,0,0,0.12)',
                            borderRadius: 4,
                            backgroundColor: '#f7f7f7'
                        }}
                    >
                        <tbody>
                            <tr>
                                <td>
                                    <input type="text" placeholder="Enter your promo code here"/>
                                </td>
                                <td>
                                    <button
                                        type="button"
                                    >Check</button>
                                </td>
                            </tr>
                        </tbody>
                        <tfoot>
                            <tr>
                                <td colSpan="2">promo code status</td>
                            </tr>
                        </tfoot>
                    </table>
                </div>
            </div>
            <div className={classes.formGroup}>
                <div>
                    <h3>Billing Details</h3>
                    <div>
                        <div
                            style={{
                                display: 'flex'
                            }}
                        >
                            <div
                                style={{
                                    flex: 1
                                }}
                            >
                                <input type="text" className={classes.formInput} placeholder="First Name"/>
                            </div>
                            <div
                                style={{
                                    flex: 1
                                }}
                            >
                                <input type="text" className={classes.formInput} placeholder="Last Name"/>
                            </div>
                        </div>
                        <div
                            style={{
                                display: 'flex'
                            }}
                        >
                            <div
                                style={{
                                    flex: 1
                                }}
                            >
                                <input type="text" className={classes.formInput} placeholder="Email Address"/>
                            </div>
                            <div
                                style={{
                                    flex: 1
                                }}
                            >
                                <input type="text" className={classes.formInput} placeholder="Phone"/>
                            </div>
                        </div>
                        <div>
                            <input type="text" className={classes.formInput} placeholder="Shipping Address"/>
                        </div>
                    </div>
                    <div>
                        <div>
                            <input type="text" className={classes.formInput} placeholder="Card Number"/>
                        </div>
                        <div
                            style={{
                                display: 'flex'
                            }}
                        >
                            <div
                                style={{
                                    flex: 1
                                }}
                            >
                                <input type="text" className={classes.formInput} placeholder="Expiry Date"/>
                            </div>
                            <div
                                style={{
                                    flex: 1
                                }}
                            >
                                <input type="text" className={classes.formInput} placeholder="CVC"/>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>;

    // const rendering = (!(props.shoppingCart) || props.user === null);
    // const needLogin = (_.isEmpty(props.user));
    // const NoProductsInCart = (props.shoppingCart.length < 1);

    // switch (true) {
    //     case rendering:
    //         return <LoadingPage/>;
    //     // case needLogin: {
    //     //
    //     //     redirectUrl('/login', props.history, false);
    //     //     props.enqueueSnackbar('please log in first in order to checkout your products', styleGuide.warningSnackbar);
    //     //     return null
    //     // }
    //     case NoProductsInCart:
    //         return (<Grid container alignItems={'center'} justify={'center'}>

    //             <Header
    //                 title={'confirmPage'}/>
    //             <Grid item container xs={6} spacing={16} className={classes.form}>
    //                 <Grid item>

    //                     <Typography variant={'h6'} color={'primary'}>
    //                        <I18nText keyOfI18n={keyOfI18n.CART_NO_ITEMS_TO_SHOW}/> 
    //                     </Typography>
    //                 </Grid>

    //                 <Grid item container alignItems={'center'} spacing={16}>
    //                     <Grid item>
    //                         <Typography variant={'subtitle1'} color={'primary'}>
    //                             <I18nText keyOfI18n={keyOfI18n.GOTO}/>
    //                         </Typography>
    //                     </Grid>
    //                     <Grid item>
    //                         <Button
    //                             variant='outlined'
    //                             onClick={() => redirectUrl('/products', props.history)}

    //                         >
    //                             <I18nText keyOfI18n={keyOfI18n.PRODUCTS}/>
    //                         </Button>
    //                     </Grid>
    //                     <Grid item>
    //                         <Typography variant={'subtitle1'} color={'primary'}>
    //                          <I18nText keyOfI18n={keyOfI18n.CHECKOUT_TO_BUY_SOME}/>
    //                         </Typography>
    //                     </Grid>
    //                 </Grid>
    //             </Grid>
    //         </Grid>);
    //     default:
    //         return (
    //             <Grid container justify={'center'}>
    //                 <Grid item sm={12}>
    //                     <Header title={useI18nText(keyOfI18n.CHECKOUT)}/>
    //                 </Grid>
    //                 <Grid item container justify={'center'} spacing={32} md={10}>

    //                     {(isWidthUp('md', props.width)) ?
    //                         (<Fragment>
    
    //                         </Fragment>)
    //                         : (<Fragment>
    //                             <Grid item xs={11}>
    //                                 <Collapse
    //                                     arrow={true}
    //                                     title={<Fragment>
    //                                         <Typography
    //                                             className={classes.title}
    //                                             variant={'h4'}>
    //                                             <I18nText keyOfI18n={keyOfI18n.CHECKOUT_YOUR_ORDER_SUMMARY}/>
    //                                         </Typography>

    //                                         <Divider/>
    //                                     </Fragment>}
    //                                     collapse={
    //                                         <OrderSummary/>
    //                                     }
    //                                 />
    //                             </Grid>
    //                             <Grid item xs={11}>
    //                                 <Typography
    //                                     className={classes.title}
    //                                     variant={'h4'}>
    //                                     <I18nText keyOfI18n={keyOfI18n.CHECKOUT_BILLING_DETAIL}/>
    //                                 </Typography>
    //                                 <Divider/>
    //                                 <BillingDetails/>

    //                             </Grid>
    //                         </Fragment>)

    //                     }
    //                 </Grid>


    //             </Grid>
    //         )
    // }
};

export default connect(mapStateToProps, mapDispatchToProps)(CheckoutOverview)