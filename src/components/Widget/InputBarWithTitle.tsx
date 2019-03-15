import React from 'react'
import Input, {Props} from './InputBar'
import {makeStyles} from "@material-ui/styles";
import {Grid, Theme, Typography} from "@material-ui/core";

const useStyles = makeStyles((theme: Theme) => (
    {
        root: {
            width: '100%',
            paddingBottom: '30px',
        }
    }

));
const InputBarWithTitle: React.FunctionComponent<Props> = props => {
    const classes = useStyles();
    return <Grid container alignItems={"center"} justify={"center"} className={classes.root}>
        <Grid item xs={3}>
            <Typography variant={"h5"}>
                {props.title}
            </Typography>
        </Grid>
        <Grid item xs={9}>
            <Input {...props}/>
        </Grid>

    </Grid>
};

export default InputBarWithTitle