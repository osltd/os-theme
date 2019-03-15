import React, {useContext, useState} from 'react';
import {makeStyles} from '@material-ui/styles';
import {reducer} from "../../../../../context";
import {UserProfile} from "../../../../../interfaces/server/Auth";
import {CircularProgress, Grid, Typography} from "@material-ui/core";
import Button from "@material-ui/core/Button";
import Swal from '../../../../Widget/Swal'
import {formatExpiryDate, redirectUrl} from "../../../../../api/ApiUtils";
import agent from "../../../../../agent";
import * as styleGuide from "../../../../../constants/snackBarGuide";
import InputBar from "../../../../Widget/InputBarWithTitle";
import {RouteComponentProps, withRouter} from "react-router-dom";
import {InjectedNotistackProps, withSnackbar} from "notistack";
import {ShoppingCartItem} from "../../../../../interfaces/client/ShoppingCart";
import moment from "moment";

const useStyles = makeStyles(theme => ({
    root: {
        width: '90%',
    },

}));

interface Prop {
}

interface Order {
    amount: number
    id: string
    items: Array<{
        id: string,
        name: string,
        option: string,
        quantity: number
    }>
}

type Props = RouteComponentProps & InjectedNotistackProps & Prop
const Payment: React.FunctionComponent<Props> = props => {
    const {authReducer} = useContext(reducer);
    const user = authReducer.state.user as UserProfile;
    const profile = user.consumers[0];
    const [visaNumber, setVisaNumber] = useState('');
    const [cvc, setCvc] = useState('');
    const [expiryDate, setExpiryDate] = useState('');
    const [loading, setLoading] = useState(false);
    let placeOrder = async () => {

        const data = {
            "items": JSON.parse(profile.shoppingCart).data.map((n: ShoppingCartItem) => ({
                    id: n.selectedVariantId, qty: n.productCount,
                })
            )
            ,
            "contact": {
                "name": {"first": profile.name, "last": profile.name},
            },
            "payment": {
                "number": visaNumber,
                "cvc": cvc,
                "date": formatExpiryDate(expiryDate)
            },
            "startPurchase": false
        };
        setLoading(true);

        await agent.Checkout.placeOrder(data).then(res => {
                console.log(res);
                if (typeof res.data === 'string') {
                    props.enqueueSnackbar(res.data + ' please log in first'
                        , styleGuide.errorSnackbar);
                    setLoading(false);
                    return null
                }
                if (res.data && res.data.messages && res.data.messages.length > 0) {
                    res.data.messages.map((n: any) =>
                        props.enqueueSnackbar(n, styleGuide.errorSnackbar)
                    );
                    setLoading(false);

                    return null
                }
                let result = res.data.data.orders[0] as Order;

                if (result) {

                    //if (!(selectShippingMethod)) {selectShippingMethod = props.profile.shippingOptions[0]}
                    //             selectShippingMethod.courier.name
                    //         }.</Typography>
                    // <Typography variant={'body1'}>
                    //
                    //         the items will be there in {
                    //         selectShippingMethod.deliveryTime.min
                    //
                    //     } to {
                    //         selectShippingMethod.deliveryTime.max
                    //
                    //     } days</Typography>
                    Swal(<Grid container direction={'column'}>
                        <Typography variant={"h4"}> {`訂單編號：${result.id}`}</Typography>
                        <Typography variant={"h4"}> {`日期：${moment().format(`YYYY-MM-DD`)}`}</Typography>
                        <Typography variant={"h4"}> {`訂單編號：${result.id}`}</Typography>
                        {
                            result.items.map(
                                (item, i) => (
                                    <Typography key={i}
                                                variant={"h4"}> {`產品型號：${item.name}(${item.option}) X${item.quantity} `}</Typography>

                                )
                            )
                        }
                        <Typography variant={"h4"}> {`價格：${result.amount}`}</Typography>
                    </Grid>);


                    agent.Auth.assignProperty({
                        orders: result.id
                    });
                    redirectUrl('/', props.history, false)

                }


            }
        ).catch(err => {
            if (err.response && err.response.data.messages.length > 0) {
                err.response.data.messages.map((n: string) =>
                    props.enqueueSnackbar(n, styleGuide.errorSnackbar)
                );
                props.history.goBack()

            }

        })

    };

    return (

        <Grid container direction={"column"}>
            <Grid item xs={12} md={6}>
                <Grid item xs={12}>
                    <InputBar
                        validation={
                            {
                                format: '#### #### #### ####',
                            }
                        }
                        title={'visa number'}
                        placeholder={'please enter your visa number'}
                        onChange={(e: string) => setVisaNumber(e)}
                        value={visaNumber}

                    />

                </Grid>

                <Grid item xs={12}>
                    <InputBar
                        title={'Expire Date'}
                        placeholder={'MM/YY'}
                        validation={
                            {
                                format: '##/##',
                                mask: ['M', 'M', 'Y', 'Y'],
                            }
                        }

                        onChange={value => setExpiryDate(value)}
                        value={expiryDate}
                    />
                </Grid>
                <Grid item xs={12}>
                    <InputBar
                        title={'CVC'}
                        placeholder={'XXX'}

                        validation={
                            {
                                format: '###',
                            }
                        }
                        onChange={value => setCvc(value)}
                        value={cvc}
                    />
                </Grid>
                <Grid item xs={12}>
                    <Button
                        variant={"outlined"}
                        color={"primary"}

                        onClick={placeOrder}>
                        下單
                    </Button>
                    {
                        loading && <CircularProgress/>

                    }
                </Grid>
            </Grid>
        </Grid>


    );
};

export default withRouter(withSnackbar(Payment))