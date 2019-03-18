import React, {ReactNode} from 'react';
import {Grid} from '@material-ui/core';
import {redirectUrl} from "../../../api/ApiUtils";
import makeStyles from "@material-ui/styles/makeStyles";
import {History} from 'history'

const useStyle = makeStyles(
    {
        root: {
            backgroundColor: '#F6F6F6',
            cursor: 'pointer',
            marginBottom: 35,

        },
    });

interface Props {
    left: ReactNode
    right: ReactNode
    link: string
    history: History

}

const FeedsWall: React.FunctionComponent<Props> = props => {
    const classes = useStyle();
    const {left, right, link, history} = props;
    return (
        <Grid container alignItems={'center'} className={classes.root}
              onClick={() => redirectUrl(link, history)}>
            <Grid item container direction={'column'} justify={'flex-start'} alignItems={'center'} sm={5}>
                {left}
            </Grid>
            <Grid item sm={7} container direction={'column'} justify={'flex-end'} alignItems={'center'}>
                {right}
            </Grid>
        </Grid>
    )
};


export default FeedsWall