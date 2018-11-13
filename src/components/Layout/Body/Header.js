import React from 'react';
import PropTypes from 'prop-types';
import Typography from '@material-ui/core/Typography';
import {withStyles} from '@material-ui/core/styles';
import {Grid} from '@material-ui/core'

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

    }

});


class Header extends React.Component {


    componentDidMount() {
    }

    render() {
        const {classes, title, route} = this.props;
        return <Grid container className={classes.root} alignItems={'center'} justify={'space-between'}>
            <Grid item>
                <Typography variant={'display1'}
                            className={classes.title} color={'primary'}>{title}</Typography>
            </Grid>
            <Grid>
                <Typography variant={'title'} className={classes.route} color={'secondary'}>{route}</Typography>
            </Grid>
        </Grid>
    }
}

Header.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Header)