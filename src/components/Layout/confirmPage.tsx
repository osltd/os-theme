import React from 'react'
import {Grid, Typography} from '@material-ui/core'
import {makeStyles} from "@material-ui/styles";
import {RouteComponentProps} from "react-router";
import Button from "@material-ui/core/Button";

const useStyles = makeStyles(theme => ({
    root: {
        width: '100%',
        padding: '40px',
        marginTop: '200px',
        marginBottom: '200px',

    }
}));

interface Props extends RouteComponentProps<{ msg: string }> {
}

const ConfirmPage: React.FunctionComponent<Props> = props => {
    const classes = useStyles();
    const msg = props.location.state.msg as string | undefined;
    return (
        <Grid container justify={'center'} direction={"column"} alignItems={'center'} className={classes.root}>
            <Grid item>
                <Typography variant={'subtitle1'}>{msg ? msg : "已確認"}</Typography>
            </Grid>

            <Grid item>

                <Button variant={"outlined"}
                        onClick={() => props.history.push('/')}
                        color={"primary"}>
                    回到主頁
                </Button>
            </Grid>
        </Grid>);
};


export default (ConfirmPage)