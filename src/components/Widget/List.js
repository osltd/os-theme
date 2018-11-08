import React, {Fragment} from 'react';
import PropTypes from 'prop-types';
import {withStyles} from '@material-ui/core/styles';
import {Typography} from '@material-ui/core'
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import InboxIcon from '@material-ui/icons/Inbox';

const styles = theme => ({
    root: {
        width: '100%',
        maxWidth: 360,
        backgroundColor: theme.palette.background.paper,
    },
    listItem: {
        borderBottom: '1px solid black',
    }
});
const dummyData = ['DECOR & FURNITURE (19)',
    'ELECTRONICS & COMPUTER (4)',
    'FASHION & CLOTHINGS (3)',
    'HOME, GARDEN & TOOLS (5)',
    'SPORT & OUTDOORS (7)',
    'TOY, KIDS & BABY']

class SelectedListItem extends React.Component {
    state = {
        selectedIndex: 1,
    };

    handleListItemClick = (event, index) => {
        this.setState({selectedIndex: index});
    };

    render() {
        const {classes, data, title} = this.props;

        return (
            <Fragment>
                <Typography

                    variant={'title'}

                >
                    {title}
                </Typography>

                <List component="nav">
                    {dummyData.map((n, i) =>
                        <ListItem
                            button
                            className={classes.listItem}
                            selected={this.state.selectedIndex === 0}
                            onClick={event => this.handleListItemClick(event, 0)}
                        >
                            <ListItemText primary={n}/>
                        </ListItem>
                    )}

                </List>
            </Fragment>

        );
    }
}

SelectedListItem.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(SelectedListItem);