import React from 'react';
import {RouteComponentProps} from "react-router";
import {Grid, Typography} from "@material-ui/core";
import Button from "@material-ui/core/Button";

interface Props extends RouteComponentProps<{ id: string }> {

}

const SingleProduct: React.FunctionComponent<Props> = props => {


    return <Grid container>
        <Typography variant={"h4"}>
            successfully added items
        </Typography>

        <Button variant={"outlined"}
                onClick={() => props.history.push('/')}
                color={"primary"}>
            返回主頁 </Button>
    </Grid>
};


export default (SingleProduct)