import React, {useContext, useEffect, useState} from 'react';
import {makeStyles} from '@material-ui/styles';
import {reducer} from "../../../../../context";
import {UserProfile} from "../../../../../interfaces/server/Auth";
import {Grid, Typography} from "@material-ui/core";
import InputBar from '../../../../Widget/InputBar'
import Button from "@material-ui/core/Button";
import agent from "../../../../../agent";

const useStyles = makeStyles(theme => ({
    root: {
        width: '90%',
    },

}));

function ConfirmAddress() {
    const classes = useStyles();
    const {authReducer} = useContext(reducer);
    const user = authReducer.state.user as UserProfile;
    const profile = user.consumers[0];
    const [invoiceAddress, setInvoiceAddress] = useState(profile.invoiceAddress);
    const [iAEdit, setIAEdit] = useState(false);
    const [dAEdit, setDAEdit] = useState(false);

    const [deliveryAddress, setDeliveryAddress] = useState(profile.deliveryAddress);
    useEffect(
        () => {
            agent.Auth.assignProperty(
                {
                    invoiceAddress: invoiceAddress,
                }
            )
        }, [iAEdit]
    );
    useEffect(
        () => {
            agent.Auth.assignProperty(
                {
                    deliveryAddress: deliveryAddress,
                }
            )
        }, [dAEdit]
    );
    return (
        <Grid container spacing={16} direction={"column"}>
            <Grid item md={6} xs={12}>
                <Typography variant={"subtitle1"}>
                    賬單地址 </Typography>
                {
                    iAEdit ? <InputBar
                        value={invoiceAddress}
                        onChange={e => setInvoiceAddress(e)}
                    /> : <Typography variant={"subtitle1"}>
                        {invoiceAddress}

                    </Typography>
                }
                <br/>

                <Button
                    variant={"outlined"}
                    color={iAEdit ? "primary" : "secondary"}
                    onClick={() => setIAEdit(!iAEdit)}
                >
                    {iAEdit ? '確認' : '編輯地址'}

                </Button>
            </Grid>
            <Grid item md={6} xs={12}>
                <Typography variant={"subtitle1"}>
                    送貨地址 </Typography>
                {
                    dAEdit ? <InputBar
                        value={deliveryAddress}
                        onChange={e => setDeliveryAddress(e)}
                    /> : <Typography variant={"subtitle1"}>
                        {deliveryAddress}

                    </Typography>
                }
                <br/>
                <Button
                    variant={"outlined"}
                    color={dAEdit ? "primary" : "secondary"}
                    onClick={() => setDAEdit(!dAEdit)}
                >
                    {dAEdit ? '確認' : '編輯地址'}
                </Button>
            </Grid>
        </Grid>


    );
}

export default ConfirmAddress;