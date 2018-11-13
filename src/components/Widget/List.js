import React, {Fragment} from 'react';
import PropTypes from 'prop-types';
import {withStyles} from '@material-ui/core/styles';
import {Typography} from '@material-ui/core'
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import classNames from 'classnames'

const styles = theme => ({
    root: {
        width: '100%',
        maxWidth: 360,
        backgroundColor: theme.palette.background.paper,
    },
    listItem: {
        borderBottom: '1px solid black',
        '&:hover': {
            backgroundColor: theme.palette.secondary.light,

        }
    },
    selected: {
        backgroundColor: theme.palette.secondary.light,
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
        console.log(index)
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
                            className={classNames(classes.listItem, (this.state.selectedIndex === i) ? classes.selected : null)}
                            onClick={event => this.handleListItemClick(event, i)}>
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