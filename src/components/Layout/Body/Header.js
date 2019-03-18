import React, {Fragment} from 'react';
import PropTypes from 'prop-types';
import Typography from '@material-ui/core/Typography';
import {withStyles} from '@material-ui/core/styles';
import {Grid} from '@material-ui/core'
import {withRouter} from "react-router-dom";
import {getRoutePath, redirectUrl} from "../../../api/ApiUtils";


import withWidth, {isWidthUp} from "@material-ui/core/withWidth/index";

const styles = theme => ({

    root: {
        marginBottom: '50px',
        minHeight: '100px',
        width: '100%',
        background: '#f7f7f7',
    },
    title: {
        textTransform: 'uppercase',
        fontWeight: '700',
    }
    ,
    route: {
        textTransform: 'uppercase',
        '&:hover': {
            color: theme.palette.primary.light,
            cursor: 'pointer',
        }
    }

});

const BodyHeader = (props) => {


    const {classes, title, width, history, match} = props;
    const routePath = getRoutePath(match.url);
    return <Grid container
                 className={classes.root}
                 direction={'row'}
                 alignItems={'center'}
                 justify={'center'}
    >
        <Grid item md={2}/>
        <Grid item md={5} xs={12} container justify={isWidthUp('md', width) ? 'flex-start' : 'center'}>
            <Typography variant={'h4'} className={classes.title} color={'primary'}>{title}</Typography>
        </Grid>
        <Grid item md={3} xs={11} container justify={isWidthUp('md', width) ? 'flex-end' : 'center'}>
            {routePath.map((n, i) => <Fragment key={i}>
                <Grid item>
                    <Typography variant={'body1'}
                                onClick={() => redirectUrl(n.link, history)}
                                className={classes.route} color={'secondary'}>{n.label}</Typography>
                </Grid>
                {i !== routePath.length - 1 &&
                <Grid item>
                    <Typography variant={'body1'}
                                onClick={() => redirectUrl(n.link, history)}
                                color={'secondary'}>/</Typography> </Grid>
                }
            </Fragment>)}
        </Grid>
        <Grid item md={2}/>
    </Grid>
};

BodyHeader.propTypes = {

    classes: PropTypes.object.isRequired,
};

export default withWidth()(withRouter(withStyles(styles)(BodyHeader)))