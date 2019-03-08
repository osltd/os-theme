import React from 'react'
import {Grid, Typography} from '@material-ui/core'
import {makeStyles} from "@material-ui/styles";
import {RouteComponentProps} from "react-router";
import Header from "./Body/Header";

const useStyles = makeStyles(theme => ({
    root: {
        width: '100%',
        padding: '40px',
        marginTop: '50px',
        marginBottom: '200px',

    }
}));

interface Props extends RouteComponentProps<{ msg: string }> {
}

const ContactUs: React.FunctionComponent<Props> = props => {
    const classes = useStyles();
    return (
        <>
            <Header title={'聯繫我們'}/>
            <Grid item container direction={"column"} md={6} xs={12} className={classes.root}>
                <Typography variant={"h4"} color={"secondary"}>
                    客戶服務熱線 </Typography>
                <br/>

                <Typography variant={'subtitle1'}>
                    Whatsapp：54900501(HK)
                </Typography>
                <Typography variant={'subtitle1'}>

                    電話： 54900501(HK)
                </Typography>
                <Typography variant={'subtitle1'}>

                    電郵： info@hkprinter.com
                </Typography>
                <br/>

                <Typography variant={"h4"} color={"secondary"}>
                    購物資訊
                </Typography>
                <br/>
                <Typography variant={"subtitle1"}>

                    本網站已盡力確保所刊載的產品資料正确無誤,惟產品資料祗供參考用途。大多數產品可按排 1-2
                    工作日送貨,如對購買產品的現貨存量,詳細送貨資料可直電54900501(HK)。購物滿(每張訂單計算)$500
                    以上可安排免費送貨(不包括特殊地區),$500 以下需收取運費
                </Typography>
            </Grid></>);
};


export default (ContactUs)