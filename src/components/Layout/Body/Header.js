import React, {Fragment} from 'react';
import {createUseStyles} from 'react-jss';

import PropTypes from 'prop-types';
import {withRouter} from 'react-router-dom';

import {getRoutePath, redirectUrl} from '../../../api/ApiUtils';


const styles = createUseStyles({
    root: {
        marginBottom: '50px',
        minHeight: '100px',
        background: '#f7f7f7',
        display: 'flex',
        alignItems: 'center',
        padding: '0 9%'
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
            cursor: 'pointer',
        }
    },

    // for mobile
    '@media (max-width: 600px)': {
        root: {
            padding: '0 5%',
            marginTop: 0
        },
        path: {
            display: 'none'
        }
    }
});


const BodyHeader = (props) => {
    const classes = styles();
    const {title, history, match} = props;
    const routePath = getRoutePath(match.url);
    return <div className={classes.root}>
        <div className={classes.title}>{title}</div>
        <div className={classes.path}>
            {routePath.map((n, i) => <Fragment key={i}>
                <button
                    type="button"
                    className={classes.route}
                    onClick={() => redirectUrl(n.link, history)}
                >
                    <b className={classes.text}>{n.label}</b>
                </button>
            </Fragment>)}
        </div>
    </div>
};


// BodyHeader.propTypes = {
//     classes: PropTypes.object.isRequired,
// };


export default withRouter(BodyHeader)