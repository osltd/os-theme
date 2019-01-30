import React, {Fragment} from 'react';
import {Theme, withStyles} from '@material-ui/core/styles';
import {Typography} from '@material-ui/core'
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import classNames from 'classnames'
import {redirectUrl} from "../../api/ApiUtils";
import createStyles from "@material-ui/core/styles/createStyles";
import {Clickable, MaterialUIClasses} from "../../interfaces/client/Common";
import {History} from 'history'

const styles = (theme: Theme) => createStyles({
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

interface Props {
    classes: MaterialUIClasses
    data?: Array<Clickable>
    title?: string
    selectedValue?: string
    history: History
    link?: string
}

const CustomList: React.FunctionComponent<Props> = props => {

    const {classes, data, title, link, history, selectedValue} = props;

    let handleListItemClick = (event: any, index: number, cb: Function): void => {
        cb();
        if (link) {
            redirectUrl(link, history)
        }
    };
    return (data ? <Fragment>
            {
                title && <Typography variant={'h6'}>{title}</Typography>

            }
            <List component="nav" className={classes.list}>

                {data.map((n: any, i: any) =>
                    <ListItem
                        key={i}
                        button
                        className={classNames(classes.listItem, (selectedValue === n.value ||
                            (selectedValue === null && i === 0)
                        ) ? classes.selected : null)}
                        onClick={event => handleListItemClick(event, i, n.onClick)}>
                        <Typography

                        >{n.label}</Typography>
                    </ListItem>
                )}

            </List>
        </Fragment> : null

    );
};
export default (withStyles(styles)(CustomList))