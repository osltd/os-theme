import React, {Fragment} from 'react';
import PropTypes from 'prop-types';
import {withStyles} from '@material-ui/core/styles';
import {Typography} from '@material-ui/core'
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import classNames from 'classnames'
import {withRouter} from "react-router-dom";
import {redirectUrl} from "../../api/ApiUtils";

const styles = theme => ({
    root: {
        width: '100%',
        maxWidth: 360,
        backgroundColor: theme.palette.background.paper,
    },
    listItem: {
        borderBottom: '1px solid ' + theme.palette.secondary.light,
        textTransform: 'uppercase',
        '& > p': {
            color: theme.palette.secondary.light,
        }, '&:hover': {
            '& > p': {
                color: theme.palette.primary.dark,
            }
        },

    },
    selected: {
        '& > p': {
            color: theme.palette.primary.dark,
        }
    },
    list: {
        maxHeight: '300px',
        overflow: 'auto',
    }
});

class SelectedListItem extends React.Component {

    handleListItemClick = (event, index, cb) => {
        cb()
        if (this.props.link) {
            redirectUrl(this.props.link, this.props.history)
        }
    };

    render() {
        const {classes, data, title, selectedValue} = this.props;
        console.log(data)
        return (data ? <Fragment>
                {
                    title && <Typography variant={'h6'}>{title}</Typography>

                }
                <List component="nav" className={classes.list}>

                    {data.map((n, i) =>
                        <ListItem
                            key={i}
                            button
                            className={classNames(classes.listItem, (selectedValue === n.value ||
                                (selectedValue === null && i === 0)
                            ) ? classes.selected : null)}
                            onClick={event => this.handleListItemClick(event, i, n.onClick)}>
                            <Typography

                            >{n.label}</Typography>
                        </ListItem>
                    )}

                </List>
            </Fragment> : null

        );
    }
}

SelectedListItem.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withRouter(withStyles(styles)(SelectedListItem))