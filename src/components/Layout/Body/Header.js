import React, {Fragment} from 'react';
import PropTypes from 'prop-types';
import Typography from '@material-ui/core/Typography';
import {withStyles} from '@material-ui/core/styles';
import {Grid} from '@material-ui/core'
import {withRouter} from "react-router-dom";
import {getRoutePath} from "../../../api/ApiUtils";
import withWidth, {isWidthUp} from "@material-ui/core/withWidth/index";

const styles = theme => ({

    root: {
        marginBottom: '50px',
        minHeight   : '100px',
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

class BodyHeader extends React.Component {


    componentDidMount() {
    }

    render() {
        const {classes, title} = this.props;
        const routePath = getRoutePath(this.props.match.url)
        return <Grid container
                     className={classes.root}
                     direction={'row'}
                     alignItems={'center'}
                     justify={'center'}
        >
            <Grid item md={2}/>
            <Grid item md={5} xs={12} container justify={isWidthUp('md',this.props.width)?'flex-start':'center'}>
                <Typography variant={'display1'} className={classes.title} color={'primary'}>{title}</Typography>
            </Grid>
            <Grid item md={3} xs={11} container justify={isWidthUp('md',this.props.width)?'flex-end':'center'}>
                {routePath.map(
                    (n, i) =>
                        <Fragment key={i}>
                            <Grid item>
                                <Typography variant={'body2'}
                                            onClick={() => this.props.history.push(n.link)}
                                            className={classes.route} color={'secondary'}>{n.label}</Typography>
                            </Grid>
                            {i !== routePath.length - 1 &&
                            <Grid item>
                                <Typography variant={'body2'}
                                            onClick={() => this.props.history.push(n.link)}
                                            color={'secondary'}>/</Typography> </Grid>
                            }
                        </Fragment>
                )}
            </Grid>
            <Grid item  md={2}/>


        </Grid>
    }
}

BodyHeader.propTypes = {

    classes: PropTypes.object.isRequired,
};

export default withWidth()(withRouter(withStyles(styles)(BodyHeader)))