import React, {Fragment, useContext, useEffect, useState} from 'react';
import {makeStyles} from '@material-ui/styles';
import {reducer} from "../../../../../context";
import {UserProfile} from "../../../../../interfaces/server/Auth";
import {Grid, Typography} from "@material-ui/core";
import InputBar from '../../../../Widget/InputBarWithTitle'
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
    const [company, setCompany] = useState(profile.company);
    const [email, setEmail] = useState(profile.email);
    const [phone, setPhone] = useState(profile.phone);
    const [name, setName] = useState(profile.name);
    const [edit, setEdit] = useState(true);
    const data = [
        {
            value: name,
            title: '聯絡人',

            onClick: (e: string) => setName(e),
        },
        {
            title: '公司',
            value: company,
            onClick: (e: string) => setCompany(e),
        }, {
            value: phone,
            title: '電話',

            onClick: (e: string) => setPhone(e),
        }, {
            value: email,
            title: 'Email',

            onClick: (e: string) => setEmail(e),
        },
    ];
    useEffect(
        () => {
            agent.Auth.assignProperty(
                {
                    company: company,
                    email: email,
                    phone: phone,
                    name: name,
                }
            )
        }, [edit]
    );
    return (

        <Grid container direction={"column"}>
            <Grid item xs={12} md={6}>
                <Typography variant={"h3"}>
                    客戶資料 </Typography>
                {
                    data.map(
                        (n, i) => <Fragment key={i}>
                            {edit ? <Typography variant={"subtitle1"}>
                                    {`${n.title}: ${n.value} `}
                                </Typography> :
                                <InputBar title={n.title} value={n.value} onChange={n.onClick}/>}</Fragment>)
                }
                <Button
                    variant={"outlined"}
                    color={edit ? "secondary" : "primary"}
                    onClick={() => setEdit(!edit)}
                >
                    {edit ? '編輯' : '確認'}
                </Button>
            </Grid>
        </Grid>


    );
}

export default ConfirmAddress;