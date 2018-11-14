import React, {Fragment} from 'react';
import PropTypes from 'prop-types';
import Typography from '@material-ui/core/Typography';
import {withStyles} from '@material-ui/core/styles';
import {Grid} from '@material-ui/core'
import {withRouter} from "react-router-dom";
import {getRoutePath} from "../../../api/ApiUtils";

const styles = theme => ({

    root: {
        marginBottom: '50px',
        padding: '60px 200px',
        height: '100px',
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


class Header extends React.Component {


    componentDidMount() {
    }

    render() {
        console.log()
        const {classes, title} = this.props;
        const routePath = getRoutePath(this.props.match.url)
        return <Grid container
                     className={classes.root}
                     direction={'row'}
                     alignItems={'center'}
                     justify={'space-between'}
                   >
            <Grid item >
                <Typography variant={'display1'}
                            className={classes.title} color={'primary'}>{title}</Typography>
            </Grid>
            <Grid item  xs={4} container >
                {routePath.map(
                    (n, i) =>
                        <Fragment>
                            <Grid item>
                                <Typography variant={'title'}
                                            onClick={() => this.props.history.push(n.link)}
                                            className={classes.route} color={'secondary'}>{n.label}</Typography>
                            </Grid>
                            {i !== routePath.length - 1 &&
                            <Grid item>

                                <Typography variant={'title'}
                                            onClick={() => this.props.history.push(n.link)}
                                            color={'secondary'}>/</Typography> </Grid>
                            }
                        </Fragment>
                )}
            </Grid>
        </Grid>
    }
}

Header.propTypes = {

    classes: PropTypes.object.isRequired,
};

export default withRouter(withStyles(styles)(Header))