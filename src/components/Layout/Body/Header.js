import React, {Fragment} from 'react';
import PropTypes from 'prop-types';
import {withStyles} from '@material-ui/core/styles';
import {withRouter} from 'react-router-dom';
import withWidth, {isWidthUp} from '@material-ui/core/withWidth/index';

import {getRoutePath, redirectUrl} from '../../../api/ApiUtils';

const styles = theme => ({
    root: {
        marginBottom: '50px',
        minHeight: '100px',
        background: '#f7f7f7',
        display: 'flex',
        alignItems: 'center'
    },
    title: {
        textTransform: 'uppercase',
        fontWeight: '700',
        fontFamily: '-apple-system,BlinkMacSystemFont,sans-serif',
        flex: 1,
        fontSize: 22
    },
    path: {
        display: 'flex'
    },
    route: {
        textTransform: 'uppercase',
        color: '#949494',
        fontFamily: '-apple-system,BlinkMacSystemFont,sans-serif',
        padding: 0,
        borderWidth: 0,
        backgroundColor: 'transparent',
        marginLeft: 5,
        '&:before': {
            content: '"/ "'
        },
        '&:first-child:before': {
            content: '""'
        },
        '&:first-child': {
            marginLeft: 0
        }
    },
    text: {
        fontWeight: 400,
        '&:hover': {
            color: theme.palette.primary.light,
            cursor: 'pointer',
        }
    }
});

const BodyHeader = (props) => {
    const {classes, title, width, history, match} = props;
    const isMobile = !isWidthUp('sm', width);
    const routePath = getRoutePath(match.url);
    return <div
        className={classes.root}
        style={{
            padding: `0 ${isWidthUp('lg', width) ? 9 : 5}%`
        }}
    >
        <div
            className={classes.title}
        >{title}</div>
        {!isMobile && <div
            className={classes.path}
        >
            {routePath.map((n, i) => <Fragment
                key={i}
            >
                <button
                    type="button"
                    className={classes.route}
                    onClick={() => redirectUrl(n.link, history)}
                >
                    <b
                        className={classes.text}
                    >{n.label}</b>
                </button>
            </Fragment>)}
        </div>}
    </div>
};

BodyHeader.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withWidth()(withRouter(withStyles(styles)(BodyHeader)))