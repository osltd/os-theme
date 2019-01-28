import React, {ReactNode} from 'react';
import PropTypes from 'prop-types';
import {Theme, withStyles} from '@material-ui/core/styles';
import {Grid} from '@material-ui/core';
import {withRouter} from "react-router-dom";
import {redirectUrl} from "../../../api/ApiUtils";
import makeStyles from "@material-ui/styles/es/makeStyles";
import createStyles from "@material-ui/core/styles/createStyles";


const useStyle = makeStyles(
    createStyles((theme:Theme) => ({
            root: {
                backgroundColor: '#F6F6F6',
                cursor: 'pointer',
                marginBottom: 35,

            },
        })
    ))

interface Props {
    left:ReactNode
    right:ReactNode
    link:string

}
const FeedsWall:React.FunctionComponent<Props> = props => {
    const classes = useStyle()
    const {left, right, link} = props;
    return (
        <Grid container alignItems={'center'} className={classes.root}
              onClick={() => redirectUrl(link, this.props.history)}>
            <Grid item container direction={'column'} justify={'flex-start'} alignItems={'center'} sm={5}>
                {left}
            </Grid>
            <Grid item sm={7} container direction={'column'} justify={'flex-end'} alignItems={'center'}>
                {right}
            </Grid>
        </Grid>
    )
}


export default withRouter((FeedsWall))